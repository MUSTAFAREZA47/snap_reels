import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


export async function POST(request: NextRequest) {
    try {
        
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 },
            )
        }

        await dbConnect()
        const user = await User.findOne({ email })

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 400 },
            )
        }

        return NextResponse.json({ user }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}