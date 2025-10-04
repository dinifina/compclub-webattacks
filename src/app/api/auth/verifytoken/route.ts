import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
        return NextResponse.json({ 
            error: 'No token found' 
        }, { status: 401 });
    }
    
    try {
        const decoded = jwt.decode(token) as { isAdmin: boolean } | null;
        
        if (decoded && decoded.isAdmin) {
            return NextResponse.json({ 
                success: true,
                flag: process.env.NEXT_PUBLIC_FLAG_JWT,
                message: 'Congratulations! You are now an admin!'
            });
        }
        
        return NextResponse.json({ 
            success: false,
            message: 'You need to be an admin to get the flag',
            hint: 'Try modifying the JWT token in your browser cookies'
        });
        
    } catch (error) {
        return NextResponse.json({ 
            error: 'Invalid token' 
        }, { status: 401 });
    }
}