import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import ThailandApplication from "@/lib/models/ThailandApplication";

// Make sure we use dynamic rendering for authentication
export const dynamic = 'force-dynamic';

export async function POST(request) {
  console.log("📥 Thailand API: Received POST request");

  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    console.log("🔐 Auth attempt result:", session ? "Session found" : "No session");

    if (!session) {
      console.log("❌ Authentication failed: No session");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("✅ Authentication successful for user:", session.user.id);

    // Connect to MongoDB
    console.log("🔄 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connection successful");
    console.log("✅ Connected to MongoDB");

    // Parse request body
    const data = await request.json();
    console.log("📋 Received Thailand application data for:", data.nombreCompleto);
    console.log("📄 Full application data:", JSON.stringify(data, null, 2));

    // Check for recent duplicate submission (within the last 5 seconds)
    const recentSubmission = await ThailandApplication.findOne({
      userId: session.user.id,
      fechaCreacion: { $gte: new Date(Date.now() - 5000) }, // Last 5 seconds
    });

    if (recentSubmission) {
      console.log("⚠️ Potential duplicate submission detected, returning existing application");
      return NextResponse.json({
        success: true,
        message: "Thailand visa application submitted successfully",
        applicationId: recentSubmission._id.toString(),
        data: recentSubmission,
        isDuplicate: true,
      });
    }

    // Ensure required fields are present
    if (!data.nombreCompleto || !data.email || !data.numeroPasaporte) {
      console.error("❌ Missing required fields in submission");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add default values for required fields not collected by the form
    const dataWithDefaults = {
      ...data,
      // Professional information defaults
      ocupacionActual: data.ocupacionActual || "No proporcionado",
      empresa: data.empresa || "No proporcionado",
      direccionEmpresa: data.direccionEmpresa || "No proporcionado",
      telefonoEmpresa: data.telefonoEmpresa || "No proporcionado",
      
      // Consent defaults
      consentimientoTerminos: data.consentimientoTerminos !== undefined ? data.consentimientoTerminos : true
    };

    // Prepare document data for MongoDB - ensure documents are strings
    const processedData = {
      ...dataWithDefaults,
      documentos: {
        fotoCarnet: typeof data.documentos?.fotoCarnet === 'string' 
          ? data.documentos.fotoCarnet 
          : JSON.stringify(data.documentos?.fotoCarnet || ''),
        pasaporteEscaneado: typeof data.documentos?.pasaporteEscaneado === 'string'
          ? data.documentos.pasaporteEscaneado
          : JSON.stringify(data.documentos?.pasaporteEscaneado || ''),
        billeteSalida: typeof data.documentos?.billeteSalida === 'string'
          ? data.documentos.billeteSalida
          : JSON.stringify(data.documentos?.billeteSalida || ''),
        reservaHotel: typeof data.documentos?.reservaHotel === 'string'
          ? data.documentos.reservaHotel
          : JSON.stringify(data.documentos?.reservaHotel || '')
      }
    };

    // Create new application with the processed data
    console.log('💾 Creating new Thailand application document');
    const application = new ThailandApplication(processedData);
    await application.save();
    console.log('✅ Thailand application saved successfully with ID:', application._id);

    return NextResponse.json(
      { 
        success: true,
        message: 'Thailand visa application submitted successfully',
        applicationId: application._id.toString(),
        data: application 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Thailand visa application submission error:', error);
    
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
      { error: 'Failed to submit Thailand visa application' },
      { status: 500 }
    );
  }
}

// Handler for GET requests - retrieve Thailand applications
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Get applications - admins see all, users see only their own
    const isAdmin = session.user.role === "admin";
    const query = isAdmin ? {} : { userId: session.user.id };

    const applications = await ThailandApplication.find(query).sort({
      fechaCreacion: -1,
    });

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching Thailand applications:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}