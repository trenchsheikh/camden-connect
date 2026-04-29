import pg from "pg";

const sql = `
CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  reason text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  source text NOT NULL DEFAULT 'landing',
  submitted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS waitlist_submissions_submitted_at_idx
  ON waitlist_submissions (submitted_at DESC);
`;

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local and run: pnpm db:push");
  process.exit(1);
}

const client = new pg.Client({
  connectionString: url,
  ssl: url.includes("supabase.com") ? { rejectUnauthorized: false } : undefined,
});

try {
  await client.connect();
  await client.query(sql);
  console.log("waitlist_submissions table is ready.");
} catch (err) {
  console.error(err);
  process.exit(1);
} finally {
  await client.end();
}
