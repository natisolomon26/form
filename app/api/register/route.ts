import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phoneNumber, campus, role } = body;

    // Validate required fields
    if (!fullName || !phoneNumber || !campus || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create new student
    const student = await Student.create({
      fullName,
      phoneNumber,
      campus,
      role,
    });

    return NextResponse.json(
      { 
        message: 'Registration successful', 
        student: {
          id: student._id,
          fullName: student.fullName,
          phoneNumber: student.phoneNumber,
          campus: student.campus,
          role: student.role,
          registeredAt: student.registeredAt,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const campus = searchParams.get('campus');
    const search = searchParams.get('search');

    await connectDB();

    // Build query
    let query: any = {};
    
    if (role) {
      query.role = role;
    }
    
    if (campus) {
      query.campus = { $regex: campus, $options: 'i' };
    }
    
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { campus: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const students = await Student.find(query).sort({ registeredAt: -1 });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}