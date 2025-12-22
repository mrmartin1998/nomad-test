import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import ESTAApplication from "@/lib/models/ESTAApplication";

// Handler for POST requests - create a new ESTA application
export async function POST(request) {
  console.log("📥 ESTA API: Received POST request");

  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session) {
      console.log("❌ Authentication failed: No session");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("✅ Authentication successful for user:", session.user.id);

    // Connect to MongoDB
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Parse request body
    const data = await request.json();
    console.log("📋 Received ESTA application data for:", data.fullName);

    // Check for recent duplicate submission (within the last 5 seconds)
    const recentSubmission = await ESTAApplication.findOne({
      userId: session.user.id,
      fechaCreacion: { $gte: new Date(Date.now() - 5000) }, // Last 5 seconds
    });

    if (recentSubmission) {
      console.log(
        "⚠️ Potential duplicate submission detected, returning existing application"
      );
      return NextResponse.json({
        success: true,
        message: "ESTA application submitted successfully",
        applicationId: recentSubmission._id.toString(),
        data: recentSubmission,
        isDuplicate: true,
      });
    }

    // Ensure required fields are present
    if (!data.fullName || !data.email || !data.passportNumber) {
      console.error("❌ Missing required fields in submission");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create application data with proper fields
    const applicationData = {
      // User information
      userId: session.user.id,
      fullName: data.fullName,
      nombreCompleto: data.fullName, // Spanish field name
      dateOfBirth: data.dateOfBirth,
      birthCity: data.birthCity,
      birthCountry: data.birthCountry,
      nationality: data.nationality,

      // Contact information
      email: data.email,
      phone: data.phone,
      telefono: data.phone, // Spanish field name

      // Address information
      address: data.address,
      usAddress: data.usAddress,

      // Family information
      fatherName: data.fatherName,
      motherName: data.motherName,

      // Professional information
      occupation: data.occupation,
      companyName: data.companyName,
      position: data.position,
      annualIncome: data.annualIncome,
      companyAddress: data.companyAddress,

      // Passport information
      passportNumber: data.passportNumber,
      numeroPasaporte: data.passportNumber, // Spanish field name
      passportIssueDate: data.passportIssueDate,
      passportExpiryDate: data.passportExpiryDate,
      passportIssuingCountry: data.passportIssuingCountry,

      // Additional information
      previousUsTravel: data.previousUsTravel || false,
      hasCriminalRecord: data.hasCriminalRecord || false,
      criminalRecordDetails: data.criminalRecordDetails || "",

      // Document references - ensure it's a string
      passportDocument:
        typeof data.passportDocument === "string"
          ? data.passportDocument
          : data.passportDocument
          ? JSON.stringify(data.passportDocument)
          : "",

      // Application status and timestamps
      estado: "pendiente", // Default status is 'pending'
      fechaCreacion: new Date(),
    };

    // Save to database
    console.log("💾 Creating new ESTA application document");
    const newApplication = await ESTAApplication.create(applicationData);

    console.log("✅ ESTA Application saved successfully with ID:", newApplication._id);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "ESTA application submitted successfully",
      applicationId: newApplication._id.toString(),
      data: newApplication,
    });
  } catch (error) {
    console.error("❌ Error saving ESTA application:", error);

    // Check for validation errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: Object.keys(error.errors).reduce((acc, key) => {
            acc[key] = error.errors[key].message;
            return acc;
          }, {}),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}

// Handler for GET requests - retrieve ESTA applications
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

    const applications = await ESTAApplication.find(query).sort({
      fechaCreacion: -1,
    });

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching ESTA applications:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}