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

        if (error && error.code !== "PGRST116") { // Ignore no rows error temporarily
            console.error("Error fetching site settings:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        console.log("SENDING TO CLIENT:", data?.content);

        return NextResponse.json({ success: true, data: data?.content || {} });
    } catch (error: any) {
        console.error("Exception fetching site settings:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
