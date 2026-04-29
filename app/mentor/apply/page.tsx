"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { codeOfConduct, MentorApplication } from "@/lib/platform";

const initialForm: MentorApplication = {
  fullName: "",
  email: "",
  linkedinUrl: "",
  company: "",
  role: "",
  offers: [],
  timeCommitment: "1 hour every 2 weeks",
  motivation: "",
  referenceName: "",
  referenceEmail: "",
  signedConduct: false,
  status: "pending",
};

export default function MentorApplyPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#c3c6d7] bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10">
          <p className="text-2xl font-extrabold tracking-tight text-[#2563eb]">Camden Connect</p>
          <div className="hidden items-center gap-8 md:flex">
            <Link className="text-sm font-semibold text-[#434655] hover:text-[#2563eb]" href="/mentors">Find Mentors</Link>
            <Link className="text-sm font-semibold text-[#434655] hover:text-[#2563eb]" href="/">Impact</Link>
            <Link className="text-sm font-semibold text-[#434655] hover:text-[#2563eb]" href="/">Resources</Link>
          </div>
          <button className="rounded-lg bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white">Get Started</button>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-28 md:px-10">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#2563eb]">Become a Mentor</h1>
          <p className="mt-3 text-lg text-[#434655]">Shaping Camden&apos;s future through guidance and consistency.</p>
        </div>

        <section className="rounded-[1.5rem] border border-[#c3c6d7] bg-white shadow-[0_12px_40px_-20px_rgba(37,99,235,0.35)]">
          <div className="h-1.5 w-full bg-[#dee8ff]">
            <div className="h-full w-1/3 bg-gradient-to-r from-[#4edea3] to-[#2563eb]" />
          </div>
          <div className="space-y-8 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold md:gap-6">
              <div className="flex items-center gap-2 text-[#003ea8]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbe1ff]">1</span>
                <span>Personal Info</span>
              </div>
              <div className="h-px w-8 bg-[#c3c6d7] md:w-16" />
              <div className="flex items-center gap-2 text-[#737686]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7eeff]">2</span>
                <span>Expertise</span>
              </div>
              <div className="h-px w-8 bg-[#c3c6d7] md:w-16" />
              <div className="flex items-center gap-2 text-[#737686]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7eeff]">3</span>
                <span>Interest</span>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">Full Name</span>
                  <input className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="Alex Rivera" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">Email Address</span>
                  <input className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="alex@visionary.ai" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </label>
              </div>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-[#434655]">LinkedIn Profile</span>
                <input className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="linkedin.com/in/alex-rivera" type="url" required value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} />
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">Current Role</span>
                  <input className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="Product Designer" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#434655]">Company</span>
                  <input className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="Camden Labs" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </label>
              </div>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-[#434655]">Areas of Expertise</span>
                <select className="w-full rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]">
                  <option>Software Engineering &amp; AI</option>
                  <option>Product Design &amp; UX</option>
                  <option>Entrepreneurship &amp; Strategy</option>
                  <option>Digital Marketing</option>
                  <option>Data Science</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-[#434655]">Why Camden?</span>
                <textarea className="w-full resize-none rounded-lg border border-[#c3c6d7] bg-white px-4 py-3 text-[#111c2d] outline-none focus:border-[#2563eb]" placeholder="Tell us about your motivation to mentor youth in our community..." rows={4} required value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} />
              </label>

              <div className="rounded-xl border border-[#c3c6d7] bg-[#f0f3ff] p-4">
                <p className="mb-2 text-sm font-semibold text-[#003ea8]">Code of conduct</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-[#434655]">
                  {codeOfConduct.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <label className="mt-3 flex items-center gap-2 text-sm text-[#111c2d]">
                  <input type="checkbox" checked={form.signedConduct} onChange={(e) => setForm({ ...form, signedConduct: e.target.checked })} required />
                  I agree to the code of conduct
                </label>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button type="button" className="text-sm font-semibold text-[#737686] hover:text-[#2563eb]">Save Progress</button>
                <button className="rounded-xl bg-[#2563eb] px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(37,99,235,0.7)] hover:bg-[#004ac6]" type="submit">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </section>

        {submitted && (
          <p className="mt-6 rounded-xl border border-[#4edea3] bg-[#ecfff5] p-4 text-sm text-[#005236]">
            Application received. Status: pending review.
          </p>
        )}

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#c3c6d7] bg-white p-5 text-center">
            <h3 className="font-semibold text-[#111c2d]">Community</h3>
            <p className="mt-1 text-sm text-[#434655]">Join 500+ active mentors in the Camden area.</p>
          </div>
          <div className="rounded-2xl border border-[#c3c6d7] bg-white p-5 text-center">
            <h3 className="font-semibold text-[#111c2d]">Smart Matching</h3>
            <p className="mt-1 text-sm text-[#434655]">Find mentees based on goals, interests, and mentoring style.</p>
          </div>
          <div className="rounded-2xl border border-[#c3c6d7] bg-white p-5 text-center">
            <h3 className="font-semibold text-[#111c2d]">Impact Tracking</h3>
            <p className="mt-1 text-sm text-[#434655]">See real progress milestones as your mentees grow.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
