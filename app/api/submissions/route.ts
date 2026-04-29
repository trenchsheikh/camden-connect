import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

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

    const supabaseUrl = (
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      ""
    ).trim();
    const supabaseKey = (
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      ""
    ).trim();
    const table = process.env.SUPABASE_SUBMISSIONS_TABLE || "waitlist_submissions";

    if (!supabaseUrl || !supabaseKey) {
      const missing = [
        !supabaseUrl && "SUPABASE_URL",
        !supabaseKey &&
          "SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY)",
      ]
        .filter(Boolean)
        .join(" and ");
      console.error(
        `[submissions] Supabase env missing: ${missing}. Set them in Vercel → Project → Settings → Environment Variables, then redeploy.`
      );
      return NextResponse.json(
        {
          error: `Server is missing ${missing}. Add it in Vercel env vars and redeploy.`,
        },
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
      console.error(
        `[submissions] Supabase insert failed (${response.status}): ${errorText}`
      );
      const userMessage =
        response.status === 401 || response.status === 403
          ? "Supabase rejected the request. Check the service-role/anon key and RLS policy."
          : response.status === 404
            ? `Supabase table '${table}' was not found. Run pnpm db:push or set SUPABASE_SUBMISSIONS_TABLE.`
            : "Could not save submission. Please try again.";
      return NextResponse.json(
        { error: userMessage, details: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[submissions] handler error", err);
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
