import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("site_settings")
            .select("content")
            .eq("id", 1)
            .single();

        if (error && error.code !== "PGRST116") {
            console.error("Error getting site settings1:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: data?.content || {} });
    } catch (error: any) {
        console.error("Exception getting site settings2:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Upsert the content settings
        const { data, error } = await supabase
            .from("site_settings")
            .upsert(
                { id: 1, content: body },
                { onConflict: 'id' }
            )
            .select()
            .single();

        if (error) {
            console.error("Error saving site settings:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: data.content });
    } catch (error: any) {
        console.error("Exception saving site settings:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
