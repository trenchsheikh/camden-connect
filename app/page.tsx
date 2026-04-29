"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import logo from "../logo.png";

function scrollFieldIntoView(el: HTMLElement) {
  requestAnimationFrame(() => {
    setTimeout(() => {
      el.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
    }, 120);
  });
}

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupStep, setPopupStep] = useState<"qualify" | "thanks">("qualify");
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [sheetMaxPx, setSheetMaxPx] = useState<number | null>(null);
  const [form, setForm] = useState({
    role: "",
    reason: "",
    name: "",
    email: "",
  });
  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const openPopup = (role?: "mentor" | "mentee") => {
    setIsPopupOpen(true);
    setPopupStep("qualify");
    setShareState("idle");
    setSubmitError("");
    setIsSubmitting(false);
    setForm({
      role: role ?? "",
      reason: "",
      name: "",
      email: "",
    });
  };

  useLayoutEffect(() => {
    if (!isPopupOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isPopupOpen]);

  useLayoutEffect(() => {
    if (!isPopupOpen) {
      setSheetMaxPx(null);
      return;
    }

    const vv = window.visualViewport;
    const pad = 28;

    const update = () => {
      if (vv) {
        setSheetMaxPx(Math.max(260, Math.round(vv.height - pad)));
      } else {
        setSheetMaxPx(null);
      }
    };

    update();
    if (!vv) return undefined;

    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [isPopupOpen]);

  useEffect(() => {
    if (!isPopupOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPopupOpen, closePopup]);

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
        let message = "Could not submit right now. Please try again.";
        try {
          const data = (await response.json()) as { error?: string };
          if (data.error) message = data.error;
        } catch {
          /* use default */
        }
        throw new Error(message);
      }
      setPopupStep("thanks");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not submit right now. Please try again.");
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
    <div className="flex min-h-[100dvh] flex-col bg-[#f4f6fb] text-[#1f2937]">
      <div className="fixed left-0 right-0 top-0 z-50">
        <div className="bg-white" style={{ height: "env(safe-area-inset-top, 0px)" }} aria-hidden />
        <header className="px-3 pt-2 md:px-8 md:pt-3">
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
      </div>

      <main
        id="main-content"
        className="flex-1 pb-8 pt-[calc(0.5rem+3.5rem+env(safe-area-inset-top,0px))] sm:pb-10 sm:pt-[calc(0.75rem+3.75rem+env(safe-area-inset-top,0px))] md:pb-[calc(6.75rem+env(safe-area-inset-bottom,0px))] md:pt-[calc(1rem+4.5rem+env(safe-area-inset-top,0px))]"
      >
        <section className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
          <div className="rounded-[18px] bg-gradient-to-r from-white via-[#eef4ff] to-[#dbeafe]/90 p-4 shadow-[0_20px_40px_-30px_rgba(17,24,39,0.65)] sm:p-5 md:rounded-[22px] md:p-10">
            <div className="md:animate-fade-up-soft">
              <h1 className="text-pretty text-[clamp(1.55rem,8.2vw,3.8rem)] font-extrabold leading-[1.1] text-[#111827] max-md:animate-mobile-enter-up">
                The right mentor and mentee match, <em className="font-semibold not-italic text-[#2563eb]">found</em>.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4b5563] sm:text-base md:mt-4 md:text-lg max-md:animate-mobile-enter-up max-md:mobile-enter-delay-1">
                Atlas supports mentees to find the right mentor. Nova supports mentors to choose who to guide.
              </p>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#6b7280] sm:mt-3 sm:text-sm md:text-base max-md:animate-mobile-enter-up max-md:mobile-enter-delay-2">
                We vet mentors and mentees for expertise and ambition—so you connect with strong talent from leading
                companies.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3 md:mt-8 max-md:animate-mobile-enter-up max-md:mobile-enter-delay-3">
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
            <h2 className="text-2xl font-bold leading-[1.15] text-[#111827]/90 sm:text-3xl md:text-4xl max-md:animate-mobile-enter-up max-md:mobile-enter-delay-4">
              Land the right match in 3 simple steps.
            </h2>
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
              ].map((step, stepIndex) => {
                const stepStagger = ["max-md:mobile-enter-delay-5", "max-md:mobile-enter-delay-6", "max-md:mobile-enter-delay-7"][stepIndex] ?? "";
                return (
                <article
                  key={step.text}
                  className={`relative overflow-hidden rounded-[16px] bg-gradient-to-r from-white via-[#eef4ff] to-[#dbeafe]/90 p-5 shadow-[0_12px_24px_-20px_rgba(17,24,39,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-18px_rgba(17,24,39,0.55)] sm:rounded-[20px] sm:p-6 md:p-7 max-md:animate-mobile-enter-up ${stepStagger}`}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-base shadow-[0_8px_16px_-12px_rgba(17,24,39,0.5)]">
                    {step.icon}
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-[#374151] sm:mt-3 sm:text-sm">{step.text}</p>
                </article>
              );
              })}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="relative z-40 mt-auto flex w-full flex-col md:fixed md:inset-x-0 md:bottom-0 md:mt-0">
        <div className="border-t border-[#111827]/10 bg-gradient-to-r from-white via-[#eef4ff] to-[#dbeafe]/90 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm md:px-8">
            <p className="text-center font-['Times_New_Roman'] italic text-[#6b7280]">When one person is seen, a whole future changes.</p>
          </div>
        </div>
        <div className="shrink-0 bg-white" style={{ height: "env(safe-area-inset-bottom, 0px)" }} aria-hidden />
      </footer>

      {isPopupOpen && (
        <div
          role="presentation"
          className="animate-modal-backdrop fixed inset-0 z-[100] flex touch-manipulation items-end justify-center bg-[#111827]/45 p-3 sm:items-center sm:p-4"
          style={{
            paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))",
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
          }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) closePopup();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-access-title"
            className="animate-modal-sheet modal-sheet-scroll w-full max-w-lg overflow-y-auto overscroll-y-contain rounded-t-[20px] bg-white px-4 pb-5 pt-3 shadow-[0_24px_48px_-24px_rgba(17,24,39,0.65)] sm:rounded-2xl sm:p-6 sm:pb-6 md:p-7"
            style={{
              maxHeight:
                sheetMaxPx != null
                  ? `${sheetMaxPx}px`
                  : "min(92dvh, calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 1.5rem))",
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pb-2 sm:hidden" aria-hidden>
              <div className="h-1 w-10 shrink-0 rounded-full bg-[#111827]/20" />
            </div>

            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2563eb]">Early Access</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <h3 id="early-access-title" className="text-lg font-bold text-[#111827] sm:text-xl">
                    Hi, I&apos;m Sami.
                  </h3>
                  <a
                    href="https://www.linkedin.com/in/samitahir1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sami LinkedIn profile"
                    className="inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-[#0a66c2] text-white touch-manipulation transition hover:brightness-110 sm:h-9 sm:min-h-0 sm:min-w-0 sm:px-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true">
                      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 10.33H5.67V18.5H8.34V10.33ZM7 5.8A1.55 1.55 0 1 0 7 8.9A1.55 1.55 0 0 0 7 5.8ZM18.34 13.58C18.34 11.15 17.04 10.02 15.31 10.02C13.91 10.02 13.29 10.79 12.94 11.33V10.33H10.27V18.5H12.94V13.96C12.94 12.76 13.17 11.6 14.66 11.6C16.13 11.6 16.15 12.98 16.15 14.03V18.5H18.82V13.58H18.34Z" />
                    </svg>
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close"
                className="flex h-11 min-h-[44px] min-w-[44px] shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#111827]/15 text-lg leading-none text-[#6b7280] hover:bg-[#f8fafc] active:bg-[#f1f5f9] sm:h-9 sm:min-h-0 sm:min-w-0 sm:px-3"
              >
                ×
              </button>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-[#4b5563] sm:mb-5 sm:text-sm">
              I&apos;m the developer building Camden Connect. Tell me who you are and why you want to use the platform.
            </p>

            {popupStep === "qualify" && (
              <form
                key="qualify"
                className="animate-modal-step-in space-y-4 pb-[max(0.25rem,env(safe-area-inset-bottom,0px))]"
                onSubmit={submitDetails}
              >
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#1f2937]" id="early-access-role-label">
                    Who are you?
                  </p>
                  <div
                    className="flex flex-col gap-2 sm:flex-row"
                    role="group"
                    aria-labelledby="early-access-role-label"
                  >
                    <button
                      type="button"
                      aria-pressed={form.role === "mentor"}
                      onClick={() => setForm((prev) => ({ ...prev, role: "mentor" }))}
                      className={`min-h-[44px] touch-manipulation rounded-full px-4 py-3 text-sm font-semibold sm:min-h-0 sm:py-2 ${form.role === "mentor" ? "bg-[#2563eb] text-white" : "border border-[#111827]/15 text-[#374151] active:bg-[#f8fafc]"}`}
                    >
                      Mentor
                    </button>
                    <button
                      type="button"
                      aria-pressed={form.role === "mentee"}
                      onClick={() => setForm((prev) => ({ ...prev, role: "mentee" }))}
                      className={`min-h-[44px] touch-manipulation rounded-full px-4 py-3 text-left text-sm font-semibold sm:min-h-0 sm:py-2 ${form.role === "mentee" ? "bg-[#2563eb] text-white" : "border border-[#111827]/15 text-[#374151] active:bg-[#f8fafc]"}`}
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
                    onFocus={(e) => scrollFieldIntoView(e.currentTarget)}
                    className="w-full rounded-xl border border-[#111827]/15 px-3 py-3 text-base outline-none focus:border-[#2563eb] md:py-2.5 md:text-sm"
                    placeholder="Share your reason in one or two lines..."
                    autoComplete="off"
                    autoCorrect="on"
                    enterKeyHint="done"
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
                    onFocus={(e) => scrollFieldIntoView(e.currentTarget)}
                    className="w-full rounded-xl border border-[#111827]/15 px-3 py-3 text-base outline-none focus:border-[#2563eb] md:py-2.5 md:text-sm"
                    placeholder="Full name"
                    autoComplete="name"
                    autoCapitalize="words"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#1f2937]">Your email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    onFocus={(e) => scrollFieldIntoView(e.currentTarget)}
                    className="w-full rounded-xl border border-[#111827]/15 px-3 py-3 text-base outline-none focus:border-[#2563eb] md:py-2.5 md:text-sm"
                    placeholder="you@email.com"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    inputMode="email"
                    enterKeyHint="send"
                    required
                  />
                </label>
                <button
                  type="submit"
                  disabled={!form.role || !form.reason.trim() || !form.name.trim() || !form.email.trim() || isSubmitting}
                  className="min-h-[48px] w-full touch-manipulation rounded-full bg-[#2563eb] px-5 py-3 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:py-2.5 sm:text-sm active:bg-blue-700"
                >
                  {isSubmitting ? "Submitting…" : "Enter"}
                </button>
                {submitError && (
                  <p className="text-pretty text-center text-sm text-[#b91c1c]" role="alert">
                    {submitError}
                  </p>
                )}
              </form>
            )}

            {popupStep === "thanks" && (
              <div key="thanks" className="animate-modal-step-in space-y-4">
                <p className="rounded-xl bg-[#eef4ff] px-4 py-3 text-sm font-semibold text-[#1e3a8a]">
                  Thank you for submitting. Once we reach enough submissions, I&apos;ll launch Camden Connect.
                </p>
                <button
                  type="button"
                  onClick={handleShare}
                  className="min-h-[48px] w-full touch-manipulation rounded-full border border-[#111827]/15 px-5 py-3 text-base font-semibold text-[#1f2937] hover:bg-[#f8fafc] active:bg-[#f1f5f9] sm:min-h-0 sm:py-2.5 sm:text-sm"
                >
                  Share to invite others
                </button>
                {shareState !== "idle" && (
                  <p className="text-center text-sm text-[#6b7280]">
                    {shareState === "shared" ? "Thanks for sharing." : "Share message copied. Paste it to invite people."}
                  </p>
                )}
                <button
                  type="button"
                  onClick={closePopup}
                  className="min-h-[48px] w-full touch-manipulation rounded-full bg-[#2563eb] px-5 py-3 text-base font-semibold text-white sm:min-h-0 sm:py-2.5 sm:text-sm active:bg-blue-700"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
