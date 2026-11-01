import {NextResponse} from "next/server";import {createClient} from "@/lib/supabase/server";
export async function GET(req:Request){await (await createClient()).auth.signOut();return NextResponse.redirect(new URL("/",req.url))}
