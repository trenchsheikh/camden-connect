<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Camden Connect | Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary": "#2563EB",
                    "on-primary": "#ffffff",
                    "primary-container": "#dbeafe",
                    "on-primary-container": "#1e3a8a",
                    "secondary": "#475569",
                    "on-secondary": "#ffffff",
                    "secondary-container": "#f1f5f9",
                    "on-secondary-container": "#1e293b",
                    "tertiary": "#059669",
                    "on-tertiary": "#ffffff",
                    "tertiary-container": "#d1fae5",
                    "on-tertiary-container": "#064e3b",
                    "surface": "#f9fafb",
                    "on-surface": "#111827",
                    "surface-variant": "#f3f4f6",
                    "on-surface-variant": "#4b5563",
                    "outline": "#d1d5db",
                    "outline-variant": "#e5e7eb",
                    "background": "#ffffff",
                    "on-background": "#111827",
                    "error": "#dc2626",
                    "surface-container-low": "#f9f9ff",
                    "surface-container": "#f3f4f6",
                    "surface-container-high": "#e5e7eb"
            },
            "borderRadius": {
                    "DEFAULT": "8px",
                    "lg": "12px",
                    "xl": "16px",
                    "full": "9999px"
            },
            "spacing": {
                    "stack-sm": "12px",
                    "stack-md": "24px",
                    "container-max": "1280px",
                    "margin": "40px",
                    "unit": "8px",
                    "stack-lg": "48px",
                    "gutter": "24px"
            },
            "fontFamily": {
                    "sans": ["Plus Jakarta Sans", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #f9fafb;
            color: #111827;
        }
        .card-subtle {
            background: white;
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
        }
        .card-subtle:hover {
            border-color: #2563EB;
            box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
            font-size: 20px;
        }
    </style>
</head>
<body class="font-sans text-on-background antialiased">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 border-b border-outline-variant bg-white/80 backdrop-blur-md flex justify-between items-center px-6 md:px-10 py-4">
<div class="text-xl font-extrabold text-primary tracking-tight">Camden Connect</div>
<div class="hidden md:flex items-center gap-6">
<a class="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Find Mentors</a>
<a class="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Youth Programs</a>
<a class="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Impact</a>
<a class="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Resources</a>
</div>
<div class="flex items-center gap-3">
<button class="text-sm font-semibold text-on-surface-variant hover:text-primary px-4 py-2 transition-colors">Log In</button>
<button class="text-sm font-semibold bg-primary text-on-primary px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Get Started</button>
</div>
</nav>
<main class="pt-28 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
<!-- Header Section -->
<header class="mb-10">
<div class="flex items-center gap-2 mb-3">
<div class="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
<span class="text-[10px] font-bold text-tertiary uppercase tracking-wider">System Status: Active</span>
</div>
<h1 class="text-3xl font-extrabold text-on-surface mb-2 tracking-tight">Welcome back, Marcus</h1>
<p class="text-base text-on-surface-variant max-w-2xl leading-relaxed">Your mentorship ecosystem is thriving. You have 2 sessions scheduled for today and 4 new connection requests.</p>
</header>
<!-- Balanced Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-6">
<!-- Metrics Cards -->
<div class="md:col-span-4 card-subtle rounded-xl p-6">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-primary-container/40 rounded-lg">
<span class="material-symbols-outlined text-primary">hub</span>
</div>
<span class="text-[10px] font-bold text-on-surface-variant bg-surface-variant px-2 py-1 rounded uppercase tracking-wide">Last 30 Days</span>
</div>
<div class="text-sm font-semibold text-on-surface-variant mb-1">Active Sessions</div>
<div class="text-3xl font-bold text-on-surface mb-2">24</div>
<div class="text-xs font-medium text-tertiary flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">trending_up</span> +12% improvement
        </div>
</div>
<div class="md:col-span-4 card-subtle rounded-xl p-6">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-secondary-container rounded-lg">
<span class="material-symbols-outlined text-secondary">military_tech</span>
</div>
</div>
<div class="text-sm font-semibold text-on-surface-variant mb-1">Milestones Reached</div>
<div class="text-3xl font-bold text-on-surface mb-2">08</div>
<div class="text-xs text-on-surface-variant">Next: Senior Mentor Status</div>
</div>
<div class="md:col-span-4 card-subtle rounded-xl p-6">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-tertiary-container/40 rounded-lg">
<span class="material-symbols-outlined text-tertiary">bolt</span>
</div>
</div>
<div class="text-sm font-semibold text-on-surface-variant mb-1">Connection Strength</div>
<div class="text-3xl font-bold text-on-surface mb-3">94%</div>
<div class="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-tertiary w-[94%]"></div>
</div>
</div>
<!-- Active Connections Main Section -->
<div class="md:col-span-8 card-subtle rounded-xl p-8">
<div class="flex justify-between items-center mb-6">
<h2 class="text-xl font-bold text-on-surface tracking-tight">Active Connections</h2>
<button class="text-xs font-bold text-primary flex items-center gap-1 hover:underline uppercase tracking-wider">
          View All <span class="material-symbols-outlined !text-sm">arrow_forward</span>
</button>
</div>
<div class="space-y-4">
<!-- Connection Card 1 -->
<div class="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-lg border border-outline-variant hover:border-primary/30 hover:bg-primary-container/5 transition-all">
<div class="relative flex-shrink-0">
<img alt="David Chen" class="w-16 h-16 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy6h1fqzJYV8Koh-YsAD0QNSdU2KQPFD3qYXvQ_fZUL6nAJt1_j_9G24MYu6c8aSC_SmPAPgkX58pWqPTackxH2hW2L6G9Qw9RymLIU_pYZMBAOzIELWBXJ53TnZClRhkphZRkKtfohd-h6ta0cD-WkO8O63sfWE3qffBC0U1WqzufZYufPk5zxzNeI0VahXm9By_DLcD3o5keBYGDRwDFCDEQXMgPYCtGu5IdwwrgqyU8s-W78tSMSLk_5gTSdb2PyTjrcE9ggRYf"/>
<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-tertiary border-2 border-white rounded-full"></div>
</div>
<div class="flex-grow text-center sm:text-left">
<h3 class="text-base font-bold text-on-surface leading-none mb-1">David Chen</h3>
<p class="text-xs text-on-surface-variant mb-2">Senior AI Research Mentor • 2 years active</p>
<div class="flex flex-wrap gap-1.5 justify-center sm:justify-start">
<span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary-container text-primary">Machine Learning</span>
<span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-secondary-container text-secondary">Leadership</span>
</div>
</div>
<div class="flex gap-2">
<button class="p-2.5 rounded-lg border border-outline hover:bg-surface-variant transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">chat_bubble</span>
</button>
<button class="text-xs font-bold px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-blue-700 transition-all shadow-sm">Schedule Session</button>
</div>
</div>
<!-- Connection Card 2 -->
<div class="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-lg border border-outline-variant hover:border-primary/30 hover:bg-primary-container/5 transition-all">
<div class="relative flex-shrink-0">
<img alt="Sarah Jenkins" class="w-16 h-16 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR3FKhZ1a2O4Ih-6KEE4QER2B6ZqdQF-n6niNw8q5ib1mi9oJnD0HWOLWQdt9smINQZ5Tp7Y64yFgXwyWOyZYZruAa6NAY4_I7wKpaPQvwQxuHvK2IZdVGZ7KJIdMjDl1M6Y__ecSxEN98vl62NaoWBQ3Dd_CK0ZAAqQQ_ZOdiEz2GehAywcaeePkHy0mYubMJC16DKi9UxKq5KTZYjNZonxRy0Ur2YSu96CIvEJ9CapAombO2H1nFb28o5fQBlJlSPnVzHCTIZfPi"/>
<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-outline border-2 border-white rounded-full"></div>
</div>
<div class="flex-grow text-center sm:text-left">
<h3 class="text-base font-bold text-on-surface leading-none mb-1">Sarah Jenkins</h3>
<p class="text-xs text-on-surface-variant mb-2">UX Strategy Mentee • Tomorrow at 10:00 AM</p>
<div class="flex flex-wrap gap-1.5 justify-center sm:justify-start">
<span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-tertiary-container text-tertiary">Design Systems</span>
</div>
</div>
<div class="flex gap-2">
<button class="p-2.5 rounded-lg border border-outline hover:bg-surface-variant transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">chat_bubble</span>
</button>
<button class="text-xs font-bold px-4 py-2 border border-outline hover:bg-surface-variant text-on-surface rounded-lg transition-all">Manage</button>
</div>
</div>
</div>
</div>
<!-- Skill Tracker Section -->
<div class="md:col-span-4 card-subtle rounded-xl p-8 flex flex-col">
<h2 class="text-xl font-bold text-on-surface mb-6 tracking-tight">Skill Development</h2>
<div class="flex-grow flex items-center justify-center py-6">
<div class="relative w-40 h-40">
<div class="absolute inset-0 border border-outline-variant/50 rounded-full"></div>
<div class="absolute inset-6 border border-outline-variant/30 rounded-full"></div>
<div class="absolute inset-12 border border-outline-variant/10 rounded-full"></div>
<svg class="absolute inset-0 w-full h-full transform -rotate-12" viewbox="0 0 100 100">
<polygon fill="rgba(37, 99, 235, 0.1)" points="50,15 80,40 70,75 30,75 20,40" stroke="#2563EB" stroke-width="1.5"></polygon>
<circle cx="50" cy="15" fill="#2563EB" r="1.5"></circle>
<circle cx="80" cy="40" fill="#2563EB" r="1.5"></circle>
<circle cx="70" cy="75" fill="#2563EB" r="1.5"></circle>
<circle cx="30" cy="75" fill="#2563EB" r="1.5"></circle>
<circle cx="20" cy="40" fill="#2563EB" r="1.5"></circle>
</svg>
</div>
</div>
<div class="space-y-4 mt-6">
<div>
<div class="flex justify-between items-center text-xs font-semibold mb-1.5">
<span class="text-on-surface-variant">Technical Fluency</span>
<span class="text-primary">92%</span>
</div>
<div class="w-full h-1 bg-surface-variant rounded-full"><div class="h-full bg-primary w-[92%]"></div></div>
</div>
<div>
<div class="flex justify-between items-center text-xs font-semibold mb-1.5">
<span class="text-on-surface-variant">Strategic Planning</span>
<span class="text-primary/70">78%</span>
</div>
<div class="w-full h-1 bg-surface-variant rounded-full"><div class="h-full bg-primary/70 w-[78%]"></div></div>
</div>
<div>
<div class="flex justify-between items-center text-xs font-semibold mb-1.5">
<span class="text-on-surface-variant">Mentorship</span>
<span class="text-tertiary">85%</span>
</div>
<div class="w-full h-1 bg-surface-variant rounded-full"><div class="h-full bg-tertiary w-[85%]"></div></div>
</div>
</div>
</div>
<!-- AI Insight Banner -->
<div class="md:col-span-12 card-subtle rounded-xl p-6 bg-gradient-to-r from-primary/5 to-transparent border-primary/20 flex flex-col md:flex-row items-center gap-6">
<div class="flex-shrink-0">
<div class="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-2xl">psychology</span>
</div>
</div>
<div class="flex-grow text-center md:text-left">
<h3 class="text-sm font-bold text-on-surface mb-0.5">AI Recommendation</h3>
<p class="text-xs text-on-surface-variant italic leading-relaxed">"Based on your recent progress in Technical Architecture, Marcus, I recommend connecting with Julian Voss. He specializes in distributed systems and is currently looking for advanced mentees."</p>
</div>
<button class="px-6 py-2 bg-white border border-outline hover:border-primary hover:text-primary text-on-surface text-xs font-bold rounded-lg transition-all shadow-sm">Explore Profile</button>
</div>
</div>
</main>
<!-- Footer -->
<footer class="w-full border-t border-outline-variant bg-white flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-10 max-w-7xl mx-auto gap-6 text-[13px]">
<div class="flex flex-col gap-1 text-center md:text-left">
<div class="text-lg font-extrabold text-primary tracking-tight">Camden Connect</div>
<p class="text-on-surface-variant">© 2024 Camden Connect. Architecting the future of mentorship.</p>
</div>
<div class="flex gap-6 font-semibold">
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#">Terms</a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#">Safety</a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
</div>
</footer>
</body></html>