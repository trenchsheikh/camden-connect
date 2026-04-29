"use client";

import { FormEvent, useState } from "react";
import { clubCode } from "@/lib/platform";

export default function MenteeInvitePage() {
  const [enteredCode, setEnteredCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [completed, setCompleted] = useState(false);

  const verifyCode = (e: FormEvent) => {
    e.preventDefault();
    setVerified(enteredCode.trim().toUpperCase() === clubCode);
  };

  const completeProfile = (e: FormEvent) => {
    e.preventDefault();
    setCompleted(true);
  };

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-semibold">Mentee invite onboarding</h1>
      <form onSubmit={verifyCode} className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium">Club invite code</label>
        <input className="w-full rounded-lg border p-2" value={enteredCode} onChange={(e) => setEnteredCode(e.target.value)} placeholder="CAMDEN-UNITED-2026" />
        <button type="submit" className="rounded-lg bg-accent px-4 py-2 font-medium text-white">
          Verify code
        </button>
        <p className="text-sm text-neutral-600">Demo valid code: {clubCode}</p>
      </form>

      {verified && (
        <form onSubmit={completeProfile} className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Complete your profile</h2>
          <input className="w-full rounded-lg border p-2" placeholder="Full name" required />
          <input className="w-full rounded-lg border p-2" placeholder="Age (17-24)" min={17} max={24} required type="number" />
          <select className="w-full rounded-lg border p-2" required>
            <option value="">Current situation</option>
            <option>Working</option>
            <option>Studying</option>
            <option>Looking for work</option>
          </select>
          <textarea className="w-full rounded-lg border p-2" placeholder="Your 3-year goal" required />
          <button type="submit" className="rounded-lg bg-neutral-900 px-4 py-2 font-medium text-white">
            Save profile
          </button>
        </form>
      )}

      {completed && (
        <p className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">
          Profile completed. You can now browse mentors and request a match.
        </p>
      )}
    </main>
  );
}
