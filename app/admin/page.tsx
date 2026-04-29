"use client";

import { useMemo, useState } from "react";
import { MentorApplication } from "@/lib/platform";

const seedApplications: MentorApplication[] = [
  {
    fullName: "Emma Osei",
    email: "emma@example.com",
    linkedinUrl: "https://linkedin.com/in/emmaosei",
    company: "Google",
    role: "Program Manager",
    offers: ["career"],
    timeCommitment: "1 hour every 2 weeks",
    motivation: "I grew up in Camden and want to support young players.",
    referenceName: "Chris Ade",
    referenceEmail: "chris@example.com",
    signedConduct: true,
    status: "pending",
  },
];

export default function AdminPage() {
  const [applications, setApplications] = useState(seedApplications);
  const [matches] = useState(6);
  const [sessions] = useState(19);

  const pending = useMemo(
    () => applications.filter((application) => application.status === "pending"),
    [applications]
  );

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-semibold">Operator dashboard</h1>
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Pending applications</p>
          <p className="text-3xl font-semibold">{pending.length}</p>
        </article>
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Active matches</p>
          <p className="text-3xl font-semibold">{matches}</p>
        </article>
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-neutral-500">Sessions delivered</p>
          <p className="text-3xl font-semibold">{sessions}</p>
        </article>
      </section>

      <section className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Mentor approval queue</h2>
        {applications.map((application) => (
          <article key={application.email} className="rounded-lg border p-4">
            <p className="font-semibold">{application.fullName}</p>
            <p className="text-sm text-neutral-600">
              {application.role} at {application.company}
            </p>
            <p className="mt-2 text-sm text-neutral-700">{application.motivation}</p>
            <p className="mt-2 text-sm">Status: {application.status}</p>
            <div className="mt-3 flex gap-2">
              <button
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white"
                onClick={() =>
                  setApplications((prev) =>
                    prev.map((entry) =>
                      entry.email === application.email
                        ? { ...entry, status: "approved" }
                        : entry
                    )
                  )
                }
              >
                Approve
              </button>
              <button
                className="rounded-md border px-3 py-2 text-sm font-medium"
                onClick={() =>
                  setApplications((prev) =>
                    prev.filter((entry) => entry.email !== application.email)
                  )
                }
              >
                Reject
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
