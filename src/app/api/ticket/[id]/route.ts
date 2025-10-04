import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { error: 'Ticket ID is required! '},
            { status: 400 }
        )
    }

    const supabase = await createClient();
    const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', parseInt(id))
        .single();

    if (error || !data) {
        console.error('Supabase error: ', error);
        return NextResponse.json(
            { error: "Ticket not found." },
            { status: 404 }
        )
    }

    return NextResponse.json(
        { data: data, },
        { status: 200 }
    );
};