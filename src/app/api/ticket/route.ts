import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";

export async function POST(
    request: NextRequest
) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        const { content } = body;

        if (!content) {
            return NextResponse.json(
                { error: 'Fields should not be empty' },
                { status: 400 }
            )
        }
        
        const { data, error } = await supabase
            .from('tickets')
            .insert([{ content }])
            .select('id')
            .single();
        
        if (error || !data ) {
            console.error(error);
            return NextResponse.json(
                { error: 'Error occurred' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                id: data.id
            },
            { status: 201 }
        );
    } catch (err) {
        console.error('Error occurred: ', err);

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    };
};