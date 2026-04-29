"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { MentorType, sampleMentors } from "@/lib/platform";

export default function MentorsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    age: "",
    currentSituation: "",
    mentorType: "career" as MentorType,
    goal: "",
    supportNeed: "",
    meetingStyle: "In person",
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const mentors = useMemo(
    () => sampleMentors.filter((mentor) => mentor.mentorType === form.mentorType),
    [form.mentorType]
  );

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#c3c6d7] bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10">
          <p className="text-2xl font-extrabold tracking-tight text-[#2563eb]">Camden Connect</p>
          <div className="hidden items-center gap-8 md:flex">
            <Link className="text-sm font-semibold text-[#434655] hover:text-[#2563eb]" href="/mentor/apply">Become a Mentor</Link>
            <Link className="text-sm font-semibold text-[#434655] hover:text-[#2563eb]" href="/">Impact</Link>
            <Link className="text-sm font-semibold text-[#434655] hover:text-[#2563eb]" href="/">Resources</Link>
          </div>
          <button className="rounded-lg bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white">Get Started</button>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-28 md:px-10">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#2563eb]">Find a Mentor</h1>
          <p className="mt-3 text-lg text-[#434655]">Tell us what you need and we will match you with the right mentor.</p>
        </div>

        <section className="rounded-[1.5rem] border border-[#c3c6d7] bg-white shadow-[0_12px_40px_-20px_rgba(37,99,235,0.35)]">
          <div className="h-1.5 w-full bg-[#dee8ff]">
            <div className="h-full w-1/3 bg-gradient-to-r from-[#4edea3] to-[#2563eb]" />
          </div>
          <div className="space-y-8 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold md:gap-6">
              <div className="flex items-center gap-2 text-[#003ea8]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbe1ff]">1</span>
                <span>Your Profile</span>
              </div>
              <div className="h-px w-8 bg-[#c3c6d7] md:w-16" />
              <div className="flex items-center gap-2 text-[#737686]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7eeff]">2</span>
                <span>Your Goals</span>
              </div>
              <div className="h-px w-8 bg-[#c3c6d7] md:w-16" />
              <div className="flex items-center gap-2 text-[#737686]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7eeff]">3</span>
                <span>Preferences</span>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">Full Name</span>
                  <input className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="Jordan Thomas" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">Email Address</span>
                  <input className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="jordan@email.com" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">Age</span>
                  <input className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="18" type="number" min={17} max={24} required value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">Current Situation</span>
                  <select className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" required value={form.currentSituation} onChange={(e) => setForm({ ...form, currentSituation: e.target.value })}>
                    <option value="">Select one</option>
                    <option>Working</option>
                    <option>Studying</option>
                    <option>Looking for work</option>
                  </select>
                </label>
              </div>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-[#434655]">What type of mentor are you looking for?</span>
                <select className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" value={form.mentorType} onChange={(e) => setForm({ ...form, mentorType: e.target.value as MentorType })}>
                  <option value="career">Career mentor</option>
                  <option value="life">Life mentor</option>
                  <option value="sport">Sport mentor</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-[#434655]">What is your 3-year goal?</span>
                <textarea className="w-full resize-none rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="Example: Get into a tech apprenticeship and build confidence in interviews." rows={3} required value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">What support do you need right now?</span>
                  <textarea className="w-full resize-none rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="Share the main challenge you want support with." rows={3} required value={form.supportNeed} onChange={(e) => setForm({ ...form, supportNeed: e.target.value })} />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">Preferred meeting style</span>
                  <select className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" value={form.meetingStyle} onChange={(e) => setForm({ ...form, meetingStyle: e.target.value })}>
                    <option>In person</option>
                    <option>Online</option>
                    <option>Either is fine</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-between-buttons pt-2">
                <button type="button" className="text-sm font-semibold text-[#737686] hover:text-[#2563eb]">Save Progress</button>
                <button className="rounded-xl bg-[#2563eb] px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(37,99,235,0.7)] hover:bg-[#004ac6]" type="submit">
                  Find My Mentor
                </button>
              </div>
            </form>
          </div>
        </section>

        {submitted && (
          <p className="mt-6 rounded-xl border border-[#4edea3] bg-[#ecfff5] p-4 text-sm text-[#005236]">
            Matching request received. We will suggest mentors based on your goals.
          </p>
        )}

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-[#111c2d]">Suggested mentors for your selected path</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {mentors.map((mentor) => (
              <article key={mentor.id} className="rounded-2xl border border-[#c3c6d7] bg-white p-5">
                <p className="inline-flex rounded-full bg-[#dbeafe] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2563eb]">
                  {mentor.mentorType}
                </p>
                <h3 className="mt-3 font-semibold text-[#111c2d]">{mentor.name}</h3>
                <p className="mt-1 text-sm text-[#434655]">{mentor.role} at {mentor.company}</p>
                <p className="mt-2 text-sm text-[#434655]">{mentor.bio}</p>
                <button className="mt-4 w-full rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#004ac6]">
                  Request Intro
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
