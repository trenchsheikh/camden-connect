"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Connection = {
  id: string;
  name: string;
  role: string;
  tags: string[];
  status: "online" | "away";
  action: "schedule" | "manage";
  image: string;
};

const initialConnections: Connection[] = [
  {
    id: "c1",
    name: "David Chen",
    role: "Senior AI Research Mentor - 2 years active",
    tags: ["Machine Learning", "Leadership"],
    status: "online",
    action: "schedule",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAy6h1fqzJYV8Koh-YsAD0QNSdU2KQPFD3qYXvQ_fZUL6nAJt1_j_9G24MYu6c8aSC_SmPAPgkX58pWqPTackxH2hW2L6G9Qw9RymLIU_pYZMBAOzIELWBXJ53TnZClRhkphZRkKtfohd-h6ta0cD-WkO8O63sfWE3qffBC0U1WqzufZYufPk5zxzNeI0VahXm9By_DLcD3o5keBYGDRwDFCDEQXMgPYCtGu5IdwwrgqyU8s-W78tSMSLk_5gTSdb2PyTjrcE9ggRYf",
  },
  {
    id: "c2",
    name: "Sarah Jenkins",
    role: "UX Strategy Mentee - Tomorrow at 10:00 AM",
    tags: ["Design Systems"],
    status: "away",
    action: "manage",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBR3FKhZ1a2O4Ih-6KEE4QER2B6ZqdQF-n6niNw8q5ib1mi9oJnD0HWOLWQdt9smINQZ5Tp7Y64yFgXwyWOyZYZruAa6NAY4_I7wKpaPQvwQxuHvK2IZdVGZ7KJIdMjDl1M6Y__ecSxEN98vl62NaoWBQ3Dd_CK0ZAAqQQ_ZOdiEz2GehAywcaeePkHy0mYubMJC16DKi9UxKq5KTZYjNZonxRy0Ur2YSu96CIvEJ9CapAombO2H1nFb28o5fQBlJlSPnVzHCTIZfPi",
  },
];

export default function AdminPage() {
  const [activeSessions, setActiveSessions] = useState(24);
  const [milestones] = useState(8);
  const [connectionStrength, setConnectionStrength] = useState(94);
  const [connections, setConnections] = useState(initialConnections);
  const [insightDismissed, setInsightDismissed] = useState(false);

  const scheduleSession = () => {
    setActiveSessions((prev) => prev + 1);
    setConnectionStrength((prev) => Math.min(100, prev + 1));
  };

  const toggleConnection = (id: string) => {
    setConnections((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, status: entry.status === "online" ? "away" : "online" }
          : entry
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827]">
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[#e5e7eb] bg-white/80 px-6 py-4 backdrop-blur-md md:px-10">
        <div className="text-xl font-extrabold tracking-tight text-[#2563eb]">Camden Connect</div>
        <div className="hidden items-center gap-6 md:flex">
          <Link className="text-sm font-medium text-[#4b5563] hover:text-[#2563eb]" href="/mentors">Find Mentors</Link>
          <a className="text-sm font-medium text-[#4b5563] hover:text-[#2563eb]" href="#">Youth Programs</a>
          <a className="text-sm font-medium text-[#4b5563] hover:text-[#2563eb]" href="#">Impact</a>
          <a className="text-sm font-medium text-[#4b5563] hover:text-[#2563eb]" href="#">Resources</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold text-[#4b5563] hover:text-[#2563eb]">Log In</button>
          <button className="rounded-lg bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white">Get Started</button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-10">
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">System Status: Active</span>
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Welcome back, Marcus</h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#4b5563]">
            Your mentorship ecosystem is thriving. You have 2 sessions scheduled for today and 4 new connection requests.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 md:col-span-4">
            <p className="mb-1 text-sm font-semibold text-[#4b5563]">Active Sessions</p>
            <p className="mb-2 text-3xl font-bold">{activeSessions}</p>
            <p className="text-xs font-medium text-[#059669]">+12% improvement</p>
          </div>
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 md:col-span-4">
            <p className="mb-1 text-sm font-semibold text-[#4b5563]">Milestones Reached</p>
            <p className="mb-2 text-3xl font-bold">{milestones.toString().padStart(2, "0")}</p>
            <p className="text-xs text-[#4b5563]">Next: Senior Mentor Status</p>
          </div>
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 md:col-span-4">
            <p className="mb-1 text-sm font-semibold text-[#4b5563]">Connection Strength</p>
            <p className="mb-3 text-3xl font-bold">{connectionStrength}%</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
              <div className="h-full bg-[#059669]" style={{ width: `${connectionStrength}%` }} />
            </div>
          </div>

          <section className="rounded-xl border border-[#e5e7eb] bg-white p-8 md:col-span-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Active Connections</h2>
              <button className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">View All</button>
            </div>
            <div className="space-y-4">
              {connections.map((connection) => (
                <article key={connection.id} className="flex flex-col items-center gap-5 rounded-lg border border-[#e5e7eb] p-4 transition hover:border-[#2563eb]/30 hover:bg-[#dbeafe]/20 sm:flex-row">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image src={connection.image} alt={connection.name} fill sizes="64px" className="object-cover" />
                    <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${connection.status === "online" ? "bg-[#059669]" : "bg-[#9ca3af]"}`} />
                  </div>
                  <div className="grow text-center sm:text-left">
                    <h3 className="mb-1 text-base font-bold leading-none">{connection.name}</h3>
                    <p className="mb-2 text-xs text-[#4b5563]">{connection.role}</p>
                    <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
                      {connection.tags.map((tag) => (
                        <span key={tag} className="rounded bg-[#dbeafe] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#2563eb]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleConnection(connection.id)} className="rounded-lg border border-[#d1d5db] p-2.5 text-xs font-semibold text-[#4b5563] hover:bg-[#f3f4f6]">
                      Chat
                    </button>
                    {connection.action === "schedule" ? (
                      <button onClick={scheduleSession} className="rounded-lg bg-[#2563eb] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700">
                        Schedule Session
                      </button>
                    ) : (
                      <button className="rounded-lg border border-[#d1d5db] px-4 py-2 text-xs font-bold text-[#111827] hover:bg-[#f3f4f6]">
                        Manage
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-[#e5e7eb] bg-white p-8 md:col-span-4">
            <h2 className="mb-6 text-xl font-bold tracking-tight">Skill Development</h2>
            <div className="space-y-4">
              {[
                { label: "Technical Fluency", value: 92, color: "bg-[#2563eb]" },
                { label: "Strategic Planning", value: 78, color: "bg-[#2563eb]/70" },
                { label: "Mentorship", value: 85, color: "bg-[#059669]" },
              ].map((skill) => (
                <div key={skill.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#4b5563]">{skill.label}</span>
                    <span className="text-[#2563eb]">{skill.value}%</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-[#f3f4f6]">
                    <div className={`h-full rounded-full ${skill.color}`} style={{ width: `${skill.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {!insightDismissed && (
            <section className="flex flex-col items-center gap-6 rounded-xl border border-[#2563eb]/20 bg-gradient-to-r from-[#dbeafe]/40 to-transparent p-6 md:col-span-12 md:flex-row">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dbeafe] text-[#2563eb]">AI</div>
              <div className="grow text-center md:text-left">
                <h3 className="mb-0.5 text-sm font-bold">AI Recommendation</h3>
                <p className="text-xs italic text-[#4b5563]">
                  &quot;Based on your recent progress in Technical Architecture, Marcus, connect with Julian Voss. He specializes in distributed systems and is looking for advanced mentees.&quot;
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-[#d1d5db] bg-white px-6 py-2 text-xs font-bold text-[#111827] hover:border-[#2563eb] hover:text-[#2563eb]">
                  Explore Profile
                </button>
                <button onClick={() => setInsightDismissed(true)} className="rounded-lg border border-[#d1d5db] px-4 py-2 text-xs font-bold text-[#4b5563]">
                  Dismiss
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
