import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
    const checkToken = request.cookies.get('auth_token')?.value;

    if (!checkToken) {
        const payload = {
            isAdmin: false,
            iat: Math.floor(Date.now() / 1000)
        }

        const secret = "SECRET";
        const token = jwt.sign(payload, secret);

        const response = NextResponse.json({ 
            success: true,
            message: 'Token set successfully' 
        });
        
        // Set the cookie
        response.cookies.set({
            name: 'auth_token',
            value: token,
            httpOnly: false,  // Set to false so kids can access it in DevTools
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/'
        });
        
        return response
    } else {
        return NextResponse.json({
            success: true,
            message: "Token is already set"
        })
    }
}