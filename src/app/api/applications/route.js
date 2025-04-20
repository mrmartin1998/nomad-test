import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/lib/models/Application';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse the request body
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      'nombre',
      'apellidos',
      'email',
      'nacionalidad',
      'numeroPasaporte',
      'tipoEmpleo',
      'ingresosMensuales'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Create new application
    const application = new Application(data);
    await application.save();

    return NextResponse.json(
      { 
        message: 'Application submitted successfully',
        data: application 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

// GET method to retrieve applications (if needed)
export async function GET() {
  try {
    await connectDB();
    const applications = await Application.find({}).sort({ fechaCreacion: -1 });
    
    return NextResponse.json(
      { data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
} 