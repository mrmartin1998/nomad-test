import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ThailandApplication from '@/lib/models/ThailandApplication';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-static';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse the request body
    const data = await request.json();

    // Get session for optional auth verification
    const session = await getServerSession();
    
    // Validate userId if provided
    if (session && data.userId && data.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Usuario no autorizado' },
        { status: 403 }
      );
    }

    // Validate required fields
    const requiredFields = [
      'nombreCompleto',
      'fechaNacimiento',
      'nacionalidad',
      'email',
      'telefono',
      'direccionResidencia',
      'ocupacionActual',
      'empresa',
      'direccionEmpresa',
      'telefonoEmpresa',
      'numeroPasaporte',
      'fechaEmisionPasaporte',
      'fechaExpiracionPasaporte',
      'consentimientoTerminos'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate passport expiration date
    const passportExpiration = new Date(data.fechaExpiracionPasaporte);
    const today = new Date();
    if (passportExpiration <= today) {
      return NextResponse.json(
        { error: 'Passport must be valid (not expired)' },
        { status: 400 }
      );
    }

    // Validate passport issuance date
    const passportIssuance = new Date(data.fechaEmisionPasaporte);
    if (passportIssuance >= today) {
      return NextResponse.json(
        { error: 'Passport issuance date must be in the past' },
        { status: 400 }
      );
    }

    // Validate document uploads
    if (!data.documentos) {
      return NextResponse.json(
        { error: 'Document uploads are required' },
        { status: 400 }
      );
    }

    const requiredDocuments = ['fotoCarnet', 'pasaporteEscaneado', 'billeteSalida', 'reservaHotel'];
    const missingDocuments = requiredDocuments.filter(doc => !data.documentos[doc]);
    if (missingDocuments.length > 0) {
      return NextResponse.json(
        { error: `Missing required documents: ${missingDocuments.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate document URLs
    const documentUrls = Object.values(data.documentos);
    const invalidUrls = documentUrls.filter(url => !url || typeof url !== 'string');
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { error: 'Invalid document URLs provided' },
        { status: 400 }
      );
    }

    // Handle userId for authenticated users
    const applicationData = {
      ...data,
      ...(data.userId && { userId: data.userId })
    };

    // Create new Thailand application
    const application = new ThailandApplication(applicationData);
    await application.save();

    return NextResponse.json(
      { 
        message: 'Thailand eVisa application submitted successfully',
        data: application 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Thailand eVisa application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit Thailand eVisa application' },
      { status: 500 }
    );
  }
}

// GET method to retrieve Thailand applications
export async function GET() {
  try {
    await connectDB();
    const applications = await ThailandApplication.find({}).sort({ fechaCreacion: -1 });
    
    return NextResponse.json(
      { data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching Thailand eVisa applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Thailand eVisa applications' },
      { status: 500 }
    );
  }
}