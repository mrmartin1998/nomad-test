import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EgyptApplication from '@/lib/models/EgyptApplication';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-static';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse the request body
    const data = await request.json();
    console.log('Received Egypt application data:', data);

    // Get session to verify authentication (optional - for extra security)
    const session = await getServerSession();

    // If userId is provided in body, use it (from client)
    // If session exists, ensure userId matches session user
    if (session && data.userId && data.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Usuario no autorizado' },
        { status: 403 }
      );
    }

    // Create new application with userId if provided
    const applicationData = {
      ...data,
      // Use userId from body if provided (for authenticated users)
      // or leave undefined for anonymous applications
      ...(data.userId && { userId: data.userId })
    };

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

    const missingFields = requiredFields.filter(field => !applicationData[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate itinerarioViaje structure
    if (!applicationData.itinerarioViaje.fechaEntrada || !applicationData.itinerarioViaje.fechaSalida) {
      return NextResponse.json(
        { error: 'Travel itinerary must include both entry and exit dates' },
        { status: 400 }
      );
    }

    // Create new Egypt application
    const application = new EgyptApplication(applicationData);
    const savedApplication = await application.save();

    console.log('Egypt application saved successfully:', savedApplication._id);

    return NextResponse.json({
      success: true,
      message: 'Solicitud de visa para Egipto recibida exitosamente',
      applicationId: savedApplication._id
    });
  } catch (error) {
    console.error('Error saving Egypt application:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
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