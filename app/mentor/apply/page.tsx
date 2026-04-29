"use client";

import { FormEvent, useState } from "react";
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
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-semibold">Mentor application</h1>
      <p className="text-neutral-700">
        Applications are reviewed by the club operator before becoming active.
      </p>
      <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <input className="w-full rounded-lg border p-2" placeholder="Full name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="w-full rounded-lg border p-2" type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded-lg border p-2" placeholder="LinkedIn URL" required value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} />
        <input className="w-full rounded-lg border p-2" placeholder="Current role" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        <input className="w-full rounded-lg border p-2" placeholder="Company" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <textarea className="w-full rounded-lg border p-2" placeholder="Why do you want to mentor?" required value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} />
        <div className="rounded-lg border p-3">
          <p className="mb-2 text-sm font-medium">Code of conduct</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
            {codeOfConduct.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.signedConduct} onChange={(e) => setForm({ ...form, signedConduct: e.target.checked })} required />
            I agree to the code of conduct
          </label>
        </div>
        <button className="rounded-lg bg-accent px-4 py-2 font-medium text-white" type="submit">
          Submit application
        </button>
      </form>
      {submitted && (
        <p className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">
          Application received. Status: pending review.
        </p>
      )}
    </main>
  );
}
