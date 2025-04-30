import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CubaApplication from '@/lib/models/CubaApplication';

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
      'nacionalidad',
      'fechaNacimiento',
      'numeroPasaporte',
      'fechaEntradaEstimada',
      'direccionAlojamientoCuba',
      'direccionResidencia',
      'email',
      'telefono',
      'metodoEntrega',
      'consentimientoProcesamiento'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate metodoEntrega
    if (!['correo', 'recogida'].includes(data.metodoEntrega)) {
      return NextResponse.json(
        { error: 'Invalid delivery method. Must be either "correo" or "recogida"' },
        { status: 400 }
      );
    }

    // Validate direccionEnvio is required if metodoEntrega is 'correo'
    if (data.metodoEntrega === 'correo' && !data.direccionEnvio) {
      return NextResponse.json(
        { error: 'Shipping address is required when delivery method is "correo"' },
        { status: 400 }
      );
    }

    // Create new Cuba application
    const application = new CubaApplication(data);
    await application.save();

    return NextResponse.json(
      { 
        message: 'Cuba visa application submitted successfully',
        data: application 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Cuba visa application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit Cuba visa application' },
      { status: 500 }
    );
  }
}

// GET method to retrieve Cuba applications
export async function GET() {
  try {
    await connectDB();
    const applications = await CubaApplication.find({}).sort({ fechaCreacion: -1 });
    
    return NextResponse.json(
      { data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching Cuba visa applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Cuba visa applications' },
      { status: 500 }
    );
  }
} 