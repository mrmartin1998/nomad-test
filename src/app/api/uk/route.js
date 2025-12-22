import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UKApplication from '@/lib/models/UKApplication';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Fix: Change from static to dynamic to allow auth to work
export const dynamic = 'force-dynamic';

export async function POST(request) {
  console.log('📥 UK API: Received POST request');

  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    console.log('🔐 Auth attempt result:', session ? 'Session found' : 'No session');

    if (!session) {
      console.log('❌ Authentication failed: No session');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.log('✅ Authentication successful for user:', session.user.id);

    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ MongoDB connection successful');
    console.log('✅ Connected to MongoDB');

    // Parse request body
    const data = await request.json();
    console.log('📋 Received UK application data for:', data.nombreCompleto);
    console.log('📄 Full application data:', JSON.stringify(data, null, 2));

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

    // Validate required fields with detailed error reporting
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

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      console.log('❌ Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Prepare document data for MongoDB - ensure documents are strings
    const processedData = {
      ...data,
      documentos: {
        fotoCarnet: typeof data.documentos?.fotoCarnet === 'string' 
          ? data.documentos.fotoCarnet 
          : JSON.stringify(data.documentos?.fotoCarnet || ''),
        pasaporteEscaneado: typeof data.documentos?.pasaporteEscaneado === 'string'
          ? data.documentos.pasaporteEscaneado
          : JSON.stringify(data.documentos?.pasaporteEscaneado || '')
      }
    };

    // Create new application with the processed data
    console.log('💾 Creating new UK application document');
    const application = new UKApplication(processedData);
    await application.save();
    console.log('✅ UK application saved successfully with ID:', application._id);

    return NextResponse.json(
      { 
        success: true,
        message: 'UK ETA application submitted successfully',
        applicationId: application._id.toString(),
        data: application 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ UK ETA application submission error:', error);
    
    // Detailed error handling for validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationErrors 
        },
        { status: 400 }
      );
    }
    
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