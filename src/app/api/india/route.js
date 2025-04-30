import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import IndiaApplication from '@/lib/models/IndiaApplication';

export const dynamic = 'force-static';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse the request body
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      'nombreCompleto',
      'fechaNacimiento',
      'lugarNacimiento',
      'nacionalidad',
      'email',
      'telefono',
      'direccionResidencia',
      'ocupacionActual',
      'nombreEmpresa',
      'direccionEmpleador',
      'telefonoEmpleador',
      'numeroPasaporte',
      'fechaEmisionPasaporte',
      'fechaExpiracionPasaporte',
      'aeropuertoEntrada',
      'fechaLlegadaPrevista',
      'alojamientoIndia',
      'referenciaIndia',
      'referenciaEspana',
      'aceptaTerminos'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate reference fields
    const requiredReferenceFields = ['nombre', 'direccion', 'telefono'];
    const missingIndiaRefFields = requiredReferenceFields.filter(field => !data.referenciaIndia[field]);
    if (missingIndiaRefFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required India reference fields: ${missingIndiaRefFields.join(', ')}` },
        { status: 400 }
      );
    }

    const requiredSpainRefFields = ['nombre', 'relacion', 'telefono'];
    const missingSpainRefFields = requiredSpainRefFields.filter(field => !data.referenciaEspana[field]);
    if (missingSpainRefFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required Spain reference fields: ${missingSpainRefFields.join(', ')}` },
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

    // Validate travel date
    const travelDate = new Date(data.fechaLlegadaPrevista);
    if (travelDate <= today) {
      return NextResponse.json(
        { error: 'Travel date must be in the future' },
        { status: 400 }
      );
    }

    // Validate document uploads
    if (!data.documentos || !data.documentos.fotoCarnet || !data.documentos.pasaporteEscaneado) {
      return NextResponse.json(
        { error: 'Both passport photo and scanned passport are required' },
        { status: 400 }
      );
    }

    // Create new India application
    const application = new IndiaApplication(data);
    await application.save();

    return NextResponse.json(
      { 
        message: 'India eVisa application submitted successfully',
        data: application 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('India eVisa application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit India eVisa application' },
      { status: 500 }
    );
  }
}

// GET method to retrieve India applications
export async function GET() {
  try {
    await connectDB();
    const applications = await IndiaApplication.find({}).sort({ fechaCreacion: -1 });
    
    return NextResponse.json(
      { data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching India eVisa applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch India eVisa applications' },
      { status: 500 }
    );
  }
} 