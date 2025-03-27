import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {

        // Get the email and password from the request body
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 },
            )
        }

        // Connect to the database
        await dbConnect()

        // Check if the user already exists
        const existingUser = await User.findOne({
            email,
        })

        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 },
            )
        }

        // Create the user
        await User.create({
            email,
            password,
        })
        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 },
        )
        
    } catch {
        return NextResponse.json(
            { message: 'User registration failed' },
            { status: 500 },
        )
    }
}
