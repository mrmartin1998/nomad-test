import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ESTAApplication from '@/lib/models/ESTAApplication';

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
      'ciudadNacimiento',
      'paisNacimiento',
      'nacionalidad',
      'nombrePadre',
      'nombreMadre',
      'email',
      'telefono',
      'direccionResidencia',
      'numeroPasaporte',
      'fechaEmisionPasaporte',
      'fechaExpiracionPasaporte',
      'paisEmisionPasaporte',
      'viajeAnteriorUSA',
      'direccionUSA',
      'empresa',
      'cargo',
      'direccionLaboral',
      'antecedentesPenales',
      'aceptaTerminos'
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

    // Validate date of birth
    const dateOfBirth = new Date(data.fechaNacimiento);
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    if (age < 0 || age > 120) {
      return NextResponse.json(
        { error: 'Invalid date of birth' },
        { status: 400 }
      );
    }

    // Create new ESTA application
    const application = new ESTAApplication(data);
    await application.save();

    return NextResponse.json(
      { 
        message: 'ESTA application submitted successfully',
        data: application 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('ESTA application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit ESTA application' },
      { status: 500 }
    );
  }
}

// GET method to retrieve ESTA applications
export async function GET() {
  try {
    await connectDB();
    const applications = await ESTAApplication.find({}).sort({ fechaCreacion: -1 });
    
    return NextResponse.json(
      { data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching ESTA applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ESTA applications' },
      { status: 500 }
    );
  }
} 