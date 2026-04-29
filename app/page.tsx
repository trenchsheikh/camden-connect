"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Image from "next/image";
import logo from "../logo.png";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupStep, setPopupStep] = useState<"qualify" | "thanks">("qualify");
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    role: "",
    reason: "",
    name: "",
    email: "",
  });

  const openPopup = (role?: "mentor" | "mentee") => {
    setIsPopupOpen(true);
    setPopupStep("qualify");
    setShareState("idle");
    setSubmitError("");
    setIsSubmitting(false);
    setForm((prev) => ({ ...prev, role: role ?? prev.role }));
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const submitDetails = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: form.role,
          reason: form.reason,
          name: form.name,
          email: form.email,
          source: "landing-popup",
        }),
      });
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      setPopupStep("thanks");
    } catch {
      setSubmitError("Could not submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Camden Connect",
      text: "Join Camden Connect to mentor or find a mentor in our community.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareState("shared");
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setShareState("copied");
      }
    } catch {
      // no-op on cancelled share
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6fb] text-[#1f2937]">
      <header className="fixed left-0 right-0 top-2 z-50 px-3 md:top-3 md:px-8">
          <div className="mx-auto flex h-12 w-full max-w-[1200px] items-center justify-between rounded-full border border-[#111827]/10 bg-gradient-to-r from-white via-[#eef4ff] to-[#dbeafe]/90 px-3.5 shadow-[0_12px_28px_-18px_rgba(17,24,39,0.45)] backdrop-blur-xl sm:h-13 sm:px-4 md:h-16 md:px-8">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Camden Connect logo" className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8 md:h-9 md:w-9" />
            <p className="hidden text-base font-extrabold tracking-tight text-[#2563eb] sm:text-lg md:block md:text-xl">Camden Connect</p>
          </div>
          <Link
            className="rounded-full bg-[#2563eb] px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_24px_-10px_rgba(37,99,235,0.8)] active:scale-95 sm:px-4 sm:py-2 sm:text-sm md:px-5"
            href="/mentee/invite"
            onClick={(event) => {
              event.preventDefault();
              openPopup();
            }}
          >
            Get started
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 pb-24 pt-24 sm:pt-28 md:pt-36">
        <section className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
          <div className="rounded-[18px] bg-gradient-to-r from-white via-[#eef4ff] to-[#dbeafe]/90 p-4 shadow-[0_20px_40px_-30px_rgba(17,24,39,0.65)] sm:p-5 md:rounded-[22px] md:p-10">
            <div className="animate-fade-up-soft">
              <h1 className="text-pretty text-[clamp(1.55rem,8.2vw,3.8rem)] font-extrabold leading-[1.1] text-[#111827]">
                The right mentor and mentee match, <em className="font-semibold not-italic text-[#2563eb]">found</em>.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4b5563] sm:text-base md:mt-4 md:text-lg">
                Atlas supports mentees to find the right mentor. Nova supports mentors to choose who to guide.
              </p>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#6b7280] sm:mt-3 sm:text-sm md:text-base">
                We vet mentors and mentees for expertise and ambition—so you connect with strong talent from leading
                companies.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3 md:mt-8">
                <Link
                  className="rounded-full bg-[#2563eb] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_24px_-10px_rgba(37,99,235,0.8)] active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm md:px-6 md:py-3"
                  href="/mentors"
                  onClick={(event) => {
                    event.preventDefault();
                    openPopup("mentee");
                  }}
                >
                  Start with Atlas
                </Link>
                <Link
                  className="rounded-full border border-[#111827]/15 bg-white px-4 py-2 text-xs font-bold text-[#1f2937] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f8fafc] hover:shadow-[0_10px_18px_-14px_rgba(17,24,39,0.5)] active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm md:px-6 md:py-3"
                  href="/mentor/apply"
                  onClick={(event) => {
                    event.preventDefault();
                    openPopup("mentor");
                  }}
                >
                  Start with Nova
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="px-4 py-12 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="text-2xl font-bold leading-[1.15] text-[#111827]/90 sm:text-3xl md:text-4xl">Land the right match in 3 simple steps.</h2>
            <div className="relative mt-6 sm:mt-8 md:mt-10">
              <div className="pointer-events-none absolute left-[12%] right-[12%] top-[52px] hidden h-px overflow-hidden rounded-full bg-[#2563eb]/15 lg:block">
                <div className="animate-beam-flow h-full w-1/4 bg-gradient-to-r from-[#4edea3] via-[#2563eb] to-[#4edea3] shadow-[0_0_18px_2px_rgba(37,99,235,0.45)]" />
              </div>
              <div className="pointer-events-none absolute left-[16.6%] top-[43px] hidden h-4 w-4 -translate-x-1/2 rounded-full border border-[#2563eb]/25 bg-white lg:block" />
              <div className="pointer-events-none absolute left-1/2 top-[43px] hidden h-4 w-4 -translate-x-1/2 rounded-full border border-[#2563eb]/25 bg-white lg:block" />
              <div className="pointer-events-none absolute left-[83.3%] top-[43px] hidden h-4 w-4 -translate-x-1/2 rounded-full border border-[#2563eb]/25 bg-white lg:block" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#2563eb]" aria-hidden="true">
                      <path d="M12 3L19 7V17L12 21L5 17V7L12 3Z" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M12 8V12L15 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  ),
                  text: "Tell Atlas or Nova what you need",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#2563eb]" aria-hidden="true">
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M12 4V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  ),
                  text: "Get tailored profile recommendations",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#2563eb]" aria-hidden="true">
                      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="4" y="4" width="16" height="16" rx="8" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  ),
                  text: "Start conversations and schedule sessions",
                },
              ].map((step) => (
                <article key={step.text} className="relative overflow-hidden rounded-[16px] bg-gradient-to-r from-white via-[#eef4ff] to-[#dbeafe]/90 p-5 shadow-[0_12px_24px_-20px_rgba(17,24,39,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-18px_rgba(17,24,39,0.55)] sm:rounded-[20px] sm:p-6 md:p-7">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-base shadow-[0_8px_16px_-12px_rgba(17,24,39,0.5)]">
                    {step.icon}
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-[#374151] sm:mt-3 sm:text-sm">{step.text}</p>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-[#111827]/10 bg-gradient-to-r from-white via-[#eef4ff] to-[#dbeafe]/90 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm md:px-8">
          <p className="text-center font-['Times_New_Roman'] italic text-[#6b7280]">When one person is seen, a whole future changes.</p>
        </div>
      </footer>

      {isPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111827]/45 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-[0_24px_48px_-24px_rgba(17,24,39,0.65)] sm:p-6 md:p-7">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2563eb]">Early Access</p>
                <div className="mt-1 flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#111827] sm:text-xl">Hi, I&apos;m Sami.</h3>
                  <a
                    href="https://www.linkedin.com/in/samitahir1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sami LinkedIn profile"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#0a66c2] text-white transition hover:brightness-110 sm:h-7 sm:w-7"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 10.33H5.67V18.5H8.34V10.33ZM7 5.8A1.55 1.55 0 1 0 7 8.9A1.55 1.55 0 0 0 7 5.8ZM18.34 13.58C18.34 11.15 17.04 10.02 15.31 10.02C13.91 10.02 13.29 10.79 12.94 11.33V10.33H10.27V18.5H12.94V13.96C12.94 12.76 13.17 11.6 14.66 11.6C16.13 11.6 16.15 12.98 16.15 14.03V18.5H18.82V13.58H18.34Z" />
                    </svg>
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={closePopup}
                className="rounded-full border border-[#111827]/15 px-2.5 py-1 text-sm text-[#6b7280] hover:bg-[#f8fafc]"
              >
                ×
              </button>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-[#4b5563] sm:mb-5 sm:text-sm">
              I&apos;m the developer building Camden Connect. Tell me who you are and why you want to use the platform.
            </p>

            {popupStep === "qualify" && (
              <form className="space-y-4" onSubmit={submitDetails}>
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#1f2937]">Who are you?</p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, role: "mentor" }))}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${form.role === "mentor" ? "bg-[#2563eb] text-white" : "border border-[#111827]/15 text-[#374151]"}`}
                    >
                      Mentor
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, role: "mentee" }))}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${form.role === "mentee" ? "bg-[#2563eb] text-white" : "border border-[#111827]/15 text-[#374151]"}`}
                    >
                      Mentee looking for mentor
                    </button>
                  </div>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#1f2937]">Why do you want to use the platform?</span>
                  <textarea
                    rows={3}
                    value={form.reason}
                    onChange={(event) => setForm((prev) => ({ ...prev, reason: event.target.value }))}
                    className="w-full rounded-xl border border-[#111827]/15 px-3 py-2.5 text-sm outline-none focus:border-[#2563eb]"
                    placeholder="Share your reason in one or two lines..."
                  />
                </label>
                <p className="rounded-xl bg-[#eef4ff] px-3 py-2 text-xs text-[#1e3a8a]">
                  How we&apos;ll contact you if we launch:
                </p>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#1f2937]">Your name</span>
                  <input
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-xl border border-[#111827]/15 px-3 py-2.5 text-sm outline-none focus:border-[#2563eb]"
                    placeholder="Full name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#1f2937]">Your email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full rounded-xl border border-[#111827]/15 px-3 py-2.5 text-sm outline-none focus:border-[#2563eb]"
                    placeholder="you@email.com"
                    required
                  />
                </label>
                <button
                  type="submit"
                  disabled={!form.role || !form.reason.trim() || !form.name.trim() || !form.email.trim() || isSubmitting}
                  className="w-full rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Enter"}
                </button>
                {submitError && (
                  <p className="text-center text-xs text-[#b91c1c]">{submitError}</p>
                )}
              </form>
            )}

            {popupStep === "thanks" && (
              <div className="space-y-4">
                <p className="rounded-xl bg-[#eef4ff] px-4 py-3 text-sm font-semibold text-[#1e3a8a]">
                  Thank you for submitting. Once we reach enough submissions, I&apos;ll launch Camden Connect.
                </p>
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full rounded-full border border-[#111827]/15 px-5 py-2.5 text-sm font-semibold text-[#1f2937] hover:bg-[#f8fafc]"
                >
                  Share to invite others
                </button>
                {shareState !== "idle" && (
                  <p className="text-center text-xs text-[#6b7280]">
                    {shareState === "shared" ? "Thanks for sharing." : "Share message copied. Paste it to invite people."}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
