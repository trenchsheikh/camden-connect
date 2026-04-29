"use client";

import { useMemo, useState } from "react";
import { MentorType, sampleMentors } from "@/lib/platform";

export default function MentorsPage() {
  const [selectedType, setSelectedType] = useState<MentorType | "all">("all");
  const [requested, setRequested] = useState<string[]>([]);

  const mentors = useMemo(
    () =>
      sampleMentors.filter((mentor) =>
        selectedType === "all" ? true : mentor.mentorType === selectedType
      ),
    [selectedType]
  );

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-semibold">Browse mentors</h1>
      <div className="flex gap-2">
        {(["all", "career", "life", "sport"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setSelectedType(value)}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${selectedType === value ? "bg-accent text-white" : "bg-white border"}`}
          >
            {value}
          </button>
        ))}
      </div>
      <section className="grid gap-4 sm:grid-cols-2">
        {mentors.map((mentor) => {
          const isRequested = requested.includes(mentor.id);
          return (
            <article key={mentor.id} className="space-y-2 rounded-xl bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase text-neutral-500">
                {mentor.mentorType}
              </p>
              <h2 className="text-xl font-semibold">{mentor.name}</h2>
              <p className="text-sm text-neutral-700">
                {mentor.role} at {mentor.company}
              </p>
              <p className="text-sm text-neutral-700">{mentor.bio}</p>
              <button
                className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                disabled={isRequested}
                onClick={() => setRequested((prev) => [...prev, mentor.id])}
              >
                {isRequested ? "Request sent" : "Request match"}
              </button>
            </article>
          );
        })}
      </section>
    </main>
  );
}
