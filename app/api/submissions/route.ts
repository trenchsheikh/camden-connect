import { NextResponse } from "next/server";

type SubmissionPayload = {
  role?: string;
  reason?: string;
  name?: string;
  email?: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmissionPayload;
    const role = body.role?.trim();
    const reason = body.reason?.trim();
    const name = body.name?.trim();
    const email = body.email?.trim();
    const source = body.source?.trim() || "landing";

    if (!role || !reason || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabaseUrl =
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    const table = process.env.SUPABASE_SUBMISSIONS_TABLE || "waitlist_submissions";

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify([
          {
            role,
            reason,
            name,
            email,
            source,
            submitted_at: new Date().toISOString(),
          },
        ]),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Supabase insert failed", details: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
