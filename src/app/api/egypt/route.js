import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EgyptApplication from '@/lib/models/EgyptApplication';

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
      'nacionalidad',
      'email',
      'telefono',
      'direccionResidencia',
      'numeroPasaporte',
      'fechaEmisionPasaporte',
      'fechaExpiracionPasaporte',
      'itinerarioViaje',
      'alojamientoEgipto',
      'consentimientoLegal'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate itinerarioViaje structure
    if (!data.itinerarioViaje.fechaEntrada || !data.itinerarioViaje.fechaSalida) {
      return NextResponse.json(
        { error: 'Travel itinerary must include both entry and exit dates' },
        { status: 400 }
      );
    }

    // Create new Egypt application
    const application = new EgyptApplication(data);
    await application.save();

    return NextResponse.json(
      { 
        message: 'Egypt visa application submitted successfully',
        data: application 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Egypt visa application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit Egypt visa application' },
      { status: 500 }
    );
  }
}

// GET method to retrieve Egypt applications
export async function GET() {
  try {
    await connectDB();
    const applications = await EgyptApplication.find({}).sort({ fechaCreacion: -1 });
    
    return NextResponse.json(
      { data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching Egypt visa applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Egypt visa applications' },
      { status: 500 }
    );
  }
} 