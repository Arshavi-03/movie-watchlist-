// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/user.model';

export async function POST(request: Request) {
    try {
        // Connect to database first
        await dbConnect();

        // Parse request body
        const body = await request.json();
        const { name, email, password } = body;

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await User.findOne({ email }).select('_id');
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
        });

        return NextResponse.json(
            {
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Registration error:', error);

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Error creating user. Please try again later.' },
            { status: 500 }
        );
    }
}

// Explicitly handle OPTIONS request for CORS
export async function OPTIONS(request: Request) {
    return NextResponse.json({}, { status: 200 });
}