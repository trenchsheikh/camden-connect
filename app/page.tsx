import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
      <main className="space-y-8 rounded-2xl bg-white p-8 shadow-sm">
        <p className="inline-flex rounded-full bg-[#141414] px-3 py-1 text-xs font-semibold tracking-wide text-white">
          Camden United Mentors
        </p>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Camden Connect
          </h1>
          <p className="max-w-2xl text-base text-neutral-700 sm:text-lg">
            Match Camden United players aged 17-24 with trusted mentors across
            career, life, and sport. This v1 prototype covers application,
            invite onboarding, match requests, and operator review.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link className="rounded-xl bg-accent px-4 py-3 font-medium text-white" href="/mentor/apply">
            Become a mentor
          </Link>
          <Link className="rounded-xl border border-neutral-300 px-4 py-3 font-medium" href="/mentee/invite">
            Join as mentee (invite only)
          </Link>
          <Link className="rounded-xl border border-neutral-300 px-4 py-3 font-medium" href="/mentors">
            Browse mentors
          </Link>
          <Link className="rounded-xl border border-neutral-300 px-4 py-3 font-medium" href="/admin">
            Operator dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
