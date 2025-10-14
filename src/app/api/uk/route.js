import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UKApplication from '@/lib/models/UKApplication';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-static';

export async function POST(request) {
  console.log('📥 UK API: Received POST request');

  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session) {
      console.log('❌ Authentication failed: No session');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.log('✅ Authentication successful for user:', session.user.id);

    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Parse request body
    const data = await request.json();
    console.log('📋 Received UK application data for:', data.fullName);

    // Check for recent duplicate submission (within the last 5 seconds)
    const recentSubmission = await UKApplication.findOne({
      userId: session.user.id,
      fechaCreacion: { $gte: new Date(Date.now() - 5000) }, // Last 5 seconds
    });

    if (recentSubmission) {
      console.log(
        '⚠️ Potential duplicate submission detected, returning existing application'
      );
      return NextResponse.json({
        success: true,
        message: 'UK ETA application submitted successfully',
        applicationId: recentSubmission._id.toString(),
        data: recentSubmission,
        isDuplicate: true,
      });
    }

    // Handle userId for authenticated users
    const applicationData = {
      ...data,
      ...(data.userId && { userId: data.userId })
    };

    // Validate required fields
    const requiredFields = [
      'nombreCompleto',
      'fechaNacimiento',
      'lugarNacimiento',
      'nacionalidad',
      'email',
      'telefono',
      'direccionResidencia',
      'numeroPasaporte',
      'fechaEmisionPasaporte',
      'fechaExpiracionPasaporte',
      'antecedentesPenales',
      'rechazosMigratorios',
      'consentimientoDatos'
    ];

    const missingFields = requiredFields.filter(field => !applicationData[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate passport expiration date
    const passportExpiration = new Date(applicationData.fechaExpiracionPasaporte);
    const today = new Date();
    if (passportExpiration <= today) {
      return NextResponse.json(
        { error: 'Passport must be valid (not expired)' },
        { status: 400 }
      );
    }

    // Validate passport issuance date
    const passportIssuance = new Date(applicationData.fechaEmisionPasaporte);
    if (passportIssuance >= today) {
      return NextResponse.json(
        { error: 'Passport issuance date must be in the past' },
        { status: 400 }
      );
    }

    // Validate document uploads
    if (!applicationData.documentos) {
      return NextResponse.json(
        { error: 'Document uploads are required' },
        { status: 400 }
      );
    }

    const requiredDocuments = ['fotoCarnet', 'pasaporteEscaneado'];
    const missingDocuments = requiredDocuments.filter(doc => !applicationData.documentos[doc]);
    if (missingDocuments.length > 0) {
      return NextResponse.json(
        { error: `Missing required documents: ${missingDocuments.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate document URLs
    const documentUrls = Object.values(applicationData.documentos);
    const invalidUrls = documentUrls.filter(url => !url || typeof url !== 'string');
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { error: 'Invalid document URLs provided' },
        { status: 400 }
      );
    }

    // Validate security questions
    if (typeof applicationData.antecedentesPenales !== 'boolean' || 
        typeof applicationData.rechazosMigratorios !== 'boolean' || 
        typeof applicationData.consentimientoDatos !== 'boolean') {
      return NextResponse.json(
        { error: 'Security questions must be answered with true or false' },
        { status: 400 }
      );
    }

    // Create new UK application
    const application = new UKApplication(applicationData);
    await application.save();

    return NextResponse.json(
      { 
        message: 'UK ETA application submitted successfully',
        data: application 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('UK ETA application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit UK ETA application' },
      { status: 500 }
    );
  }
}

// GET method to retrieve UK applications
export async function GET() {
  try {
    await connectDB();
    const applications = await UKApplication.find({}).sort({ fechaCreacion: -1 });
    
    return NextResponse.json(
      { data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching UK ETA applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch UK ETA applications' },
      { status: 500 }
    );
  }
}