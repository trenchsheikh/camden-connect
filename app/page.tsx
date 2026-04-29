"use client";

import Link from "next/link";
import {
  FocusEvent,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import logo from "../logo.png";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER = ["reason", "name", "email"] as const;
type FieldName = (typeof FIELD_ORDER)[number];
type MobileFormStep = 0 | 1 | 2;

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupStep, setPopupStep] = useState<"qualify" | "thanks">("qualify");
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mobileFormStep, setMobileFormStep] = useState<MobileFormStep>(0);
  const [form, setForm] = useState({
    role: "",
    reason: "",
    name: "",
    email: "",
  });
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const backdropPointerDownRef = useRef<EventTarget | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const closePopup = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsPopupOpen(false);
  }, []);

  const openPopup = useCallback((role?: "mentor" | "mentee") => {
    setIsPopupOpen(true);
    setPopupStep("qualify");
    setShareState("idle");
    setSubmitError("");
    setIsSubmitting(false);
    setMobileFormStep(0);
    setForm({
      role: role ?? "",
      reason: "",
      name: "",
      email: "",
    });
  }, []);

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

  /**
   * iOS Safari: keep the sheet above the on-screen keyboard without moving
   * the backdrop itself. Changing fixed inset/bottom while the keyboard animates
   * can leave Safari with a stale hit-test layer where taps stop registering.
   */
  useEffect(() => {
    if (!isPopupOpen) return;

    const backdrop = backdropRef.current;
    if (!backdrop) return;

    const vv = window.visualViewport;
    let frame = 0;

    const apply = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let keyboard = 0;
        let viewportH = window.innerHeight;
        if (vv) {
          keyboard = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
          viewportH = vv.height;
        }
        backdrop.style.setProperty("--cc-keyboard", `${keyboard}px`);
        backdrop.style.setProperty("--cc-vv", `${viewportH}px`);
        backdrop.style.paddingBottom = `calc(max(0.75rem, env(safe-area-inset-bottom, 0px)) + ${keyboard}px)`;
      });
    };

    apply();
    vv?.addEventListener("resize", apply);
    vv?.addEventListener("scroll", apply);
    window.addEventListener("focusin", apply);
    window.addEventListener("focusout", apply);
    window.addEventListener("orientationchange", apply);

    return () => {
      cancelAnimationFrame(frame);
      vv?.removeEventListener("resize", apply);
      vv?.removeEventListener("scroll", apply);
      window.removeEventListener("focusin", apply);
      window.removeEventListener("focusout", apply);
      window.removeEventListener("orientationchange", apply);
      backdrop.style.paddingBottom = "";
    };
  }, [isPopupOpen]);

  /** When a field gains focus on iOS, scroll it into view inside the sheet after the keyboard animates. */
  const handleFieldFocus = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    window.setTimeout(() => {
      if (!target.isConnected) return;
      try {
        target.scrollIntoView({ block: "center", behavior: "smooth" });
      } catch {
        target.scrollIntoView();
      }
    }, 320);
  }, []);

  /** Resolve and focus the next form control by name. Returns true if a target was focused. */
  const focusFieldByName = useCallback((name: FieldName) => {
    const form = formRef.current;
    if (!form) return false;
    const next = form.elements.namedItem(name);
    if (next instanceof HTMLElement) {
      next.focus();
      if (next instanceof HTMLInputElement || next instanceof HTMLTextAreaElement) {
        const len = next.value.length;
        try {
          next.setSelectionRange(len, len);
        } catch {
          /* not all input types support selectionRange */
        }
      }
      return true;
    }
    return false;
  }, []);

  /** Press Enter to advance to the next field; on the last field, submit the form. */
  const handleAdvanceKey = useCallback(
    (current: FieldName) =>
      (event: ReactKeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key !== "Enter") return;
        if (event.shiftKey) return; // allow Shift+Enter for newlines in textarea
        event.preventDefault();
        const idx = FIELD_ORDER.indexOf(current);
        const next = FIELD_ORDER[idx + 1];
        if (next) {
          if (current === "reason") {
            setMobileFormStep(2);
            window.setTimeout(() => focusFieldByName(next), 0);
            return;
          }
          focusFieldByName(next);
        } else {
          formRef.current?.requestSubmit();
        }
      },
    [focusFieldByName]
  );

  const selectRole = useCallback(
    (role: "mentor" | "mentee") => {
      setForm((prev) => ({ ...prev, role }));
      if (submitError) setSubmitError("");
    },
    [submitError]
  );

  const validateMobileStep = useCallback(
    (step: MobileFormStep) => {
      if (step === 0 && !form.role) {
        setSubmitError("Please pick whether you're a mentor or a mentee.");
        return false;
      }
      if (step === 1 && !form.reason.trim()) {
        setSubmitError("Tell us in a line or two why you'd like to use Camden Connect.");
        return false;
      }
      setSubmitError("");
      return true;
    },
    [form.reason, form.role]
  );

  const goToMobileStep = useCallback(
    (step: MobileFormStep) => {
      setMobileFormStep(step);
      setSubmitError("");
    },
    []
  );

  const goToNextMobileStep = useCallback(() => {
    if (!validateMobileStep(mobileFormStep)) return;
    const nextStep = Math.min(mobileFormStep + 1, 2) as MobileFormStep;
    setMobileFormStep(nextStep);
    window.setTimeout(() => {
      if (nextStep === 1) focusFieldByName("reason");
      if (nextStep === 2) focusFieldByName("name");
    }, 0);
  }, [focusFieldByName, mobileFormStep, validateMobileStep]);

  /** Press Enter on the selected role to move into the next form field. */
  const handleRoleKeyDown = useCallback(
    (role: "mentor" | "mentee") =>
      (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.preventDefault();
          selectRole(role);
          setMobileFormStep(1);
          window.setTimeout(() => focusFieldByName("reason"), 0);
        }
      },
    [focusFieldByName, selectRole]
  );

  useEffect(() => {
    if (!isPopupOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPopupOpen, closePopup]);

  const submitDetails = (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const role = form.role;
    const reason = form.reason.trim();
    const name = form.name.trim();
    const email = form.email.trim();

    if (!role) {
      setSubmitError("Please pick whether you're a mentor or a mentee.");
      return;
    }
    if (!reason) {
      setSubmitError("Tell us in a line or two why you'd like to use Camden Connect.");
      return;
    }
    if (!name) {
      setSubmitError("Please add your name so we know who to reach.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setSubmitError("Please enter a valid email like you@example.com.");
      return;
    }

    // Optimistic UI — show "thanks" immediately, save in the background.
    setSubmitError("");
    setIsSubmitting(true);
    setPopupStep("thanks");

    const body = JSON.stringify({
      role,
      reason,
      name,
      email,
      source: "landing-popup",
    });

    const send = async (attempt: number): Promise<{ ok: true } | { ok: false; message: string }> => {
      try {
        const response = await fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        });
        if (response.ok) return { ok: true };

        if (response.status >= 500 && attempt < 1) {
          await new Promise((r) => setTimeout(r, 500));
          return send(attempt + 1);
        }

        let message = "Could not submit right now. Please try again.";
        try {
          const data = (await response.json()) as { error?: string };
          if (data.error) message = data.error;
        } catch {
          /* keep default */
        }
        return { ok: false, message };
      } catch {
        if (attempt < 1) {
          await new Promise((r) => setTimeout(r, 500));
          return send(attempt + 1);
        }
        return { ok: false, message: "Could not submit right now. Please check your connection." };
      }
    };

    void send(0)
      .then((result) => {
        if (!result.ok) {
          // Roll back to the form with the user's data intact so they can retry.
          setSubmitError(result.message);
          setPopupStep("qualify");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
              className="rounded-full bg-gradient-to-br from-[#172554] from-0% via-[#2563eb] via-[86%] to-white to-100% px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_8px_20px_-10px_rgba(23,37,84,0.5)] drop-shadow-[0_1px_1px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_12px_24px_-10px_rgba(23,37,84,0.55)] active:scale-95 sm:px-4 sm:py-2 sm:text-sm md:px-5"
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
        <section className="mx-auto mt-4 w-full max-w-[1200px] px-4 sm:mt-5 md:mt-6 md:px-8">
          <div className="rounded-[18px] bg-gradient-to-r from-white via-[#eef4ff] to-[#dbeafe]/90 p-4 shadow-[0_20px_40px_-30px_rgba(17,24,39,0.65)] sm:p-5 md:rounded-[22px] md:p-10">
            <div className="md:animate-fade-up-soft">
              <h1 className="text-pretty text-[clamp(1.55rem,8.2vw,3.8rem)] font-extrabold leading-[1.1] text-[#111827] max-md:animate-mobile-enter-up">
                The right mentor and mentee match, <em className="font-semibold not-italic text-[#2563eb]">found</em>.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4b5563] sm:text-base md:mt-4 md:text-lg max-md:animate-mobile-enter-up max-md:mobile-enter-delay-1">
                Atlas supports mentees to find the right mentor. Nova supports mentors to choose who to guide.
              </p>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#6b7280] sm:mt-3 sm:text-sm md:text-base max-md:animate-mobile-enter-up max-md:mobile-enter-delay-2">
                AI agents pair your next match.
              </p>
              <div className="mt-5 flex w-full max-w-xl flex-col gap-between-buttons sm:mt-6 sm:flex-row md:mt-8 max-md:animate-mobile-enter-up max-md:mobile-enter-delay-3">
                <Link
                  className="inline-flex min-h-11 flex-1 basis-0 items-center justify-center rounded-full bg-gradient-to-br from-[#172554] from-0% via-[#2563eb] via-[86%] to-white to-100% px-4 py-2.5 text-center text-xs font-bold text-white shadow-[0_10px_24px_-10px_rgba(23,37,84,0.55)] drop-shadow-[0_1px_1px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_14px_28px_-10px_rgba(23,37,84,0.6)] active:scale-95 sm:min-h-12 sm:px-5 sm:py-2.5 sm:text-sm md:px-6 md:py-3"
                  href="/mentors"
                  onClick={(event) => {
                    event.preventDefault();
                    openPopup("mentee");
                  }}
                >
                  Start with Atlas
                </Link>
                <Link
                  className="inline-flex min-h-11 flex-1 basis-0 items-center justify-center rounded-full bg-gradient-to-br from-[#172554] from-0% via-[#1e40af] via-[86%] to-white to-100% px-4 py-2.5 text-center text-xs font-bold text-white shadow-[0_10px_24px_-10px_rgba(23,37,84,0.55)] drop-shadow-[0_1px_1px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_14px_28px_-10px_rgba(23,37,84,0.6)] active:scale-95 sm:min-h-12 sm:px-5 sm:py-2.5 sm:text-sm md:px-6 md:py-3"
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
          ref={backdropRef}
          role="presentation"
          className="animate-modal-backdrop fixed inset-0 z-[100] flex min-h-0 touch-manipulation items-end justify-center bg-[#111827]/45 p-3 sm:items-center sm:p-4"
          style={{
            paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))",
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
          }}
          onPointerDown={(e) => {
            backdropPointerDownRef.current = e.target;
          }}
          onPointerUp={(e) => {
            const startedOnBackdrop =
              backdropPointerDownRef.current === e.currentTarget && e.target === e.currentTarget;
            backdropPointerDownRef.current = null;
            if (startedOnBackdrop) closePopup();
          }}
          onPointerCancel={() => {
            backdropPointerDownRef.current = null;
          }}
        >
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-access-title"
            className="animate-modal-sheet modal-sheet-scroll max-h-full min-h-0 w-full max-w-lg overflow-y-auto overscroll-y-contain rounded-t-[20px] bg-white px-4 pb-5 pt-3 shadow-[0_24px_48px_-24px_rgba(17,24,39,0.65)] sm:rounded-2xl sm:p-6 sm:pb-6 md:p-7"
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
                    className="inline-flex h-10 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border border-[#0a66c2]/15 bg-white text-[#0a66c2] shadow-[0_8px_18px_-14px_rgba(10,102,194,0.75)] transition hover:border-[#0a66c2]/25 hover:bg-[#f3f8ff] active:scale-95 sm:h-9 sm:min-h-0 sm:min-w-0 sm:px-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
                    </svg>
                  </a>
                </div>
              </div>
              <button
                type="button"
                onPointerDown={(event) => {
                  event.preventDefault();
                  closePopup();
                }}
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
                ref={formRef}
                key="qualify"
                className="animate-modal-step-in space-y-4 pb-[max(0.25rem,env(safe-area-inset-bottom,0px))]"
                onSubmit={submitDetails}
                noValidate
              >
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#6b7280]">
                    <span>Step {mobileFormStep + 1} of 3</span>
                    <span>{["Role", "Reason", "Contact"][mobileFormStep]}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#e5e7eb]" aria-hidden>
                    <div
                      className="h-full rounded-full bg-[#2563eb] transition-[width] duration-200"
                      style={{ width: `${((mobileFormStep + 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div className={mobileFormStep === 0 ? "block" : "hidden"}>
                  <p className="mb-2 text-sm font-semibold text-[#1f2937]" id="early-access-role-label">
                    Who are you?
                  </p>
                  <div
                    className="flex flex-col gap-between-buttons sm:flex-row"
                    role="radiogroup"
                    aria-labelledby="early-access-role-label"
                  >
                    <label
                      className={`relative flex min-h-[48px] flex-1 cursor-pointer touch-manipulation items-center justify-center rounded-full px-4 py-3 text-center text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-[#2563eb]/40 sm:min-h-0 sm:py-2 ${
                        form.role === "mentor"
                          ? "bg-[#2563eb] text-white shadow-[0_8px_18px_-12px_rgba(37,99,235,0.9)]"
                          : "border border-[#111827]/15 text-[#374151] active:bg-[#f8fafc]"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name="role"
                        value="mentor"
                        checked={form.role === "mentor"}
                        onChange={() => selectRole("mentor")}
                        onKeyDown={handleRoleKeyDown("mentor")}
                      />
                      Mentor
                    </label>
                    <label
                      className={`relative flex min-h-[48px] flex-1 cursor-pointer touch-manipulation items-center justify-center rounded-full px-4 py-3 text-center text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-[#2563eb]/40 sm:min-h-0 sm:py-2 ${
                        form.role === "mentee"
                          ? "bg-[#2563eb] text-white shadow-[0_8px_18px_-12px_rgba(37,99,235,0.9)]"
                          : "border border-[#111827]/15 text-[#374151] active:bg-[#f8fafc]"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name="role"
                        value="mentee"
                        checked={form.role === "mentee"}
                        onChange={() => selectRole("mentee")}
                        onKeyDown={handleRoleKeyDown("mentee")}
                      />
                      Mentee looking for mentor
                    </label>
                  </div>
                </div>
                <label className={mobileFormStep === 1 ? "block" : "hidden"}>
                  <span className="mb-2 block text-sm font-semibold text-[#1f2937]">Why do you want to use the platform?</span>
                  <textarea
                    name="reason"
                    rows={3}
                    value={form.reason}
                    onChange={(event) => setForm((prev) => ({ ...prev, reason: event.target.value }))}
                    onFocus={handleFieldFocus}
                    onKeyDown={handleAdvanceKey("reason")}
                    className="w-full resize-none rounded-xl border border-[#111827]/15 px-3 py-3 text-base outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 md:py-2.5 md:text-sm"
                    placeholder="Share your reason in one or two lines..."
                    autoComplete="off"
                    autoCorrect="on"
                    enterKeyHint="next"
                    maxLength={500}
                  />
                </label>
                <div className={mobileFormStep === 2 ? "space-y-4" : "hidden"}>
                  <p className="rounded-xl bg-[#eef4ff] px-3 py-2 text-xs text-[#1e3a8a]">
                    How we&apos;ll contact you if we launch:
                  </p>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#1f2937]">Your name</span>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                      onFocus={handleFieldFocus}
                      onKeyDown={handleAdvanceKey("name")}
                      className="w-full rounded-xl border border-[#111827]/15 px-3 py-3 text-base outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 md:py-2.5 md:text-sm"
                      placeholder="Full name"
                      autoComplete="name"
                      autoCapitalize="words"
                      autoCorrect="off"
                      spellCheck={false}
                      enterKeyHint="next"
                      maxLength={120}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#1f2937]">Your email</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                      onFocus={handleFieldFocus}
                      onKeyDown={handleAdvanceKey("email")}
                      className="w-full rounded-xl border border-[#111827]/15 px-3 py-3 text-base outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 md:py-2.5 md:text-sm"
                      placeholder="you@email.com"
                      autoComplete="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      inputMode="email"
                      enterKeyHint="send"
                      maxLength={254}
                    />
                  </label>
                </div>
                {submitError && (
                  <p className="text-pretty text-center text-sm text-[#b91c1c]" role="alert" aria-live="polite">
                    {submitError}
                  </p>
                )}
                <div className="flex gap-3">
                  {mobileFormStep > 0 && (
                    <button
                      type="button"
                      onClick={() => goToMobileStep((mobileFormStep - 1) as MobileFormStep)}
                      className="min-h-[48px] flex-1 touch-manipulation rounded-full border border-[#111827]/15 px-5 py-3 text-base font-semibold text-[#1f2937] transition-colors active:bg-[#f1f5f9]"
                    >
                      Back
                    </button>
                  )}
                  {mobileFormStep < 2 ? (
                    <button
                      type="button"
                      onClick={goToNextMobileStep}
                      className="min-h-[48px] flex-1 touch-manipulation rounded-full bg-[#2563eb] px-5 py-3 text-base font-semibold text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.7)] transition-[transform,background-color] active:scale-[0.99] active:bg-[#1d4ed8]"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="min-h-[48px] flex-1 touch-manipulation rounded-full bg-[#2563eb] px-5 py-3 text-base font-semibold text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.7)] transition-[transform,background-color] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99] active:bg-[#1d4ed8]"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </form>
            )}

            {popupStep === "thanks" && (
              <div key="thanks" className="animate-modal-step-in flex flex-col gap-4">
                <p className="rounded-xl bg-[#eef4ff] px-4 py-3 text-sm font-semibold text-[#1e3a8a]">
                  Thank you for submitting. Once we reach enough submissions, I&apos;ll launch Camden Connect.
                </p>
                <div className="flex flex-col gap-between-buttons">
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
