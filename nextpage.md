<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Mentor Application | Camden Connect</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-container-high": "#262a36",
                    "on-primary-container": "#006a71",
                    "tertiary-fixed-dim": "#00e290",
                    "surface-variant": "#313441",
                    "surface-container-highest": "#313441",
                    "on-tertiary-fixed-variant": "#005231",
                    "secondary-fixed": "#e9ddff",
                    "outline-variant": "#3a494b",
                    "surface-tint": "#00dbe7",
                    "on-error-container": "#ffdad6",
                    "surface": "#0f131e",
                    "secondary-fixed-dim": "#d1bcff",
                    "on-tertiary-fixed": "#002111",
                    "error": "#ffb4ab",
                    "on-secondary-container": "#ddcdff",
                    "on-secondary": "#3c0090",
                    "error-container": "#93000a",
                    "inverse-primary": "#00696f",
                    "secondary-container": "#7000ff",
                    "surface-bright": "#353945",
                    "primary-fixed-dim": "#00dbe7",
                    "on-tertiary": "#003920",
                    "on-background": "#dfe2f2",
                    "surface-container": "#1b1f2b",
                    "secondary": "#d1bcff",
                    "inverse-on-surface": "#2c303c",
                    "on-secondary-fixed": "#23005b",
                    "on-primary-fixed-variant": "#004f54",
                    "on-tertiary-container": "#006e44",
                    "on-surface": "#dfe2f2",
                    "primary": "#e1fdff",
                    "on-surface-variant": "#b9cacb",
                    "inverse-surface": "#dfe2f2",
                    "surface-container-lowest": "#0a0e19",
                    "outline": "#849495",
                    "on-primary": "#00363a",
                    "tertiary-container": "#00faa0",
                    "on-secondary-fixed-variant": "#5700c9",
                    "primary-fixed": "#74f5ff",
                    "on-primary-fixed": "#002022",
                    "surface-container-low": "#171b27",
                    "primary-container": "#00f2ff",
                    "background": "#0f131e",
                    "tertiary-fixed": "#52ffac",
                    "tertiary": "#e2ffe9",
                    "surface-dim": "#0f131e",
                    "on-error": "#690005"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "stack-sm": "12px",
                    "stack-md": "24px",
                    "container-max": "1440px",
                    "margin": "40px",
                    "unit": "8px",
                    "stack-lg": "48px",
                    "gutter": "24px"
            },
            "fontFamily": {
                    "headline-lg": ["Plus Jakarta Sans"],
                    "display-xl": ["Plus Jakarta Sans"],
                    "label-sm": ["Plus Jakarta Sans"],
                    "body-md": ["Plus Jakarta Sans"],
                    "label-bold": ["Plus Jakarta Sans"],
                    "headline-md": ["Plus Jakarta Sans"],
                    "body-lg": ["Plus Jakarta Sans"]
            },
            "fontSize": {
                    "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "display-xl": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "800"}],
                    "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.02em", "fontWeight": "500"}],
                    "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "label-bold": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "600"}],
                    "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "700"}],
                    "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>body {
    background-color: #0f131e;
    background-image: radial-gradient(at 0% 0%, rgba(0, 219, 231, 0.15) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(112, 0, 255, 0.1) 0, transparent 50%);
    min-height: 100vh
    }
.glass-pane {
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    border-right: 1px solid rgba(255, 255, 255, 0.05)
    }
.noise-overlay {
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuCizFfbwCq0Dagjb_PswNzG366LNVFYYroWt2kfn_fuehcQovDCEGwEOMBcw9Ywgqn3D0PRKTGflnAEbDMR35YR_OMnekVpTze_cTz6wK38Ov3ucrJ98o7HlqadHcHSgGpwwxZB-od9I7YpXGdY7zAE34VuIxq6qk3g0TTkgfmjO9kJlO-8wK7kaP6nn5jhII7ALYgk_uCLnFIjaD2jpBYPGBOkktELRSiQTD8K2Y7NKBGkdzJ22geTddyGg5CZ0nORLbz52xfjRAmM);
    opacity: 0.03;
    pointer-events: none
    }</style>
</head>
<body class="font-body-md text-on-background antialiased selection:bg-primary-container selection:text-on-primary-fixed">
<nav class="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-[20px] border-b border-white/15 flex justify-between items-center px-10 py-5 shadow-[0_8px_32px_0_rgba(5,7,10,0.8)]">
<div class="text-2xl font-bold text-white tracking-tighter font-headline-lg">Camden Connect</div>
<div class="hidden md:flex items-center gap-8">
<a class="text-slate-300/80 hover:text-white transition-colors font-label-bold" href="#">Find Mentors</a>
<a class="text-slate-300/80 hover:text-white transition-colors font-label-bold" href="#">Youth Programs</a>
<a class="text-slate-300/80 hover:text-white transition-colors font-label-bold" href="#">Impact</a>
<a class="text-slate-300/80 hover:text-white transition-colors font-label-bold" href="#">Resources</a>
</div>
<div class="flex items-center gap-4">
<button class="px-5 py-2 text-slate-300/80 hover:text-white transition-all font-label-bold">Log In</button>
<button class="px-6 py-2 bg-gradient-to-r from-primary-fixed-dim to-primary-container text-on-primary font-label-bold rounded-lg shadow-[0_0_20px_rgba(0,219,231,0.2)] hover:scale-105 active:scale-95 transition-all">Get Started</button>
</div>
</nav>
<main class="relative pt-32 pb-24 px-6 md:px-10 flex flex-col items-center justify-center min-h-screen">
<div class="max-w-2xl w-full">
<div class="text-center mb-10">
<h1 class="font-display-xl text-display-xl text-primary mb-4">Become a Mentor</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">Shaping the future together.</p>
</div>
<div class="glass-pane bg-surface-container/60 rounded-3xl overflow-hidden relative shadow-2xl">
<div class="noise-overlay absolute inset-0"></div>
<div class="h-1.5 w-full bg-surface-container-highest flex">
<div class="h-full w-1/3 bg-gradient-to-r from-cyan-400 to-primary-container shadow-[0_0_15px_rgba(0,219,231,0.5)] transition-all duration-700"></div>
<div class="h-full w-2/3 bg-transparent"></div>
</div>
<div class="p-8 md:p-12">
<div class="flex justify-between items-center mb-10">
<div class="flex items-center gap-3">
<span class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-bold">1</span>
<span class="font-label-bold text-primary">Personal Info</span>
</div>
<div class="h-px flex-1 mx-4 bg-outline-variant"></div>
<div class="flex items-center gap-3 opacity-40">
<span class="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-bold">2</span>
<span class="font-label-bold text-on-surface-variant">Expertise</span>
</div>
<div class="h-px flex-1 mx-4 bg-outline-variant"></div>
<div class="flex items-center gap-3 opacity-40">
<span class="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-bold">3</span>
<span class="font-label-bold text-on-surface-variant">Interest</span>
</div>
</div>
<form class="space-y-8">
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="space-y-2">
<label class="font-label-bold text-on-surface-variant ml-1">Full Name</label>
<input class="w-full bg-surface-container-lowest/50 border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface font-body-md px-4 py-3 transition-all placeholder:text-surface-variant" placeholder="Alex Rivera" type="text"/>
</div>
<div class="space-y-2">
<label class="font-label-bold text-on-surface-variant ml-1">Email Address</label>
<input class="w-full bg-surface-container-lowest/50 border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface font-body-md px-4 py-3 transition-all placeholder:text-surface-variant" placeholder="alex@visionary.ai" type="email"/>
</div>
</div>
<div class="space-y-2">
<label class="font-label-bold text-on-surface-variant ml-1">LinkedIn Profile</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">link</span>
<input class="w-full bg-surface-container-lowest/50 border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface font-body-md pl-12 pr-4 py-3 transition-all placeholder:text-surface-variant" placeholder="linkedin.com/in/alex-rivera" type="url"/>
</div>
</div>
<div class="space-y-2">
<label class="font-label-bold text-on-surface-variant ml-1">Areas of Expertise</label>
<div class="relative">
<select class="w-full bg-surface-container-lowest/50 border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface font-body-md px-4 py-3 appearance-none transition-all">
<option disabled="" selected="" value="">Select your primary field</option>
<option>Software Engineering &amp; AI</option>
<option>Product Design &amp; UX</option>
<option>Entrepreneurship &amp; Strategy</option>
<option>Digital Marketing</option>
<option>Data Science</option>
</select>
<span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
</div>
<div class="space-y-2">
<label class="font-label-bold text-on-surface-variant ml-1">Why Camden?</label>
<textarea class="w-full bg-surface-container-lowest/50 border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface font-body-md px-4 py-3 transition-all placeholder:text-surface-variant resize-none" placeholder="Tell us about your motivation to mentor youth in our community..." rows="4"></textarea>
<div class="flex items-center gap-2 mt-2">
<div class="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00f2ff]"></div>
<span class="text-[10px] font-label-bold text-primary-fixed uppercase tracking-widest">AI Assisted Matching Active</span>
</div>
</div>
<div class="pt-6 flex justify-between items-center">
<button class="text-on-surface-variant font-label-bold hover:text-white transition-colors flex items-center gap-2" type="button">
<span class="material-symbols-outlined">arrow_back</span>
                                Save Progress
                            </button>
<button class="group relative px-8 py-4 bg-primary text-on-primary font-label-bold rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,219,231,0.5)] transition-all hover:scale-105 active:scale-95" type="submit">
<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
<span class="relative flex items-center gap-2">
                                    Next Step
                                    <span class="material-symbols-outlined">arrow_forward</span>
</span>
</button>
</div>
</form>
</div>
</div>
<div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="glass-pane bg-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
<span class="material-symbols-outlined text-primary text-3xl mb-3">diversity_3</span>
<h3 class="font-label-bold text-white mb-1">Community</h3>
<p class="font-label-sm text-on-surface-variant">Join 500+ active mentors in the Camden area.</p>
</div>
<div class="glass-pane bg-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
<span class="material-symbols-outlined text-primary text-3xl mb-3">auto_awesome</span>
<h3 class="font-label-bold text-white mb-1">AI Matching</h3>
<p class="font-label-sm text-on-surface-variant">Our engine connects you with students based on DNA-level synergy.</p>
</div>
<div class="glass-pane bg-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
<span class="material-symbols-outlined text-primary text-3xl mb-3">verified</span>
<h3 class="font-label-bold text-white mb-1">Impact Tracking</h3>
<p class="font-label-sm text-on-surface-variant">Real-time visualization of your mentees' growth milestones.</p>
</div>
</div>
</div>
</main>
<footer class="w-full border-t border-white/5 bg-slate-950/60 backdrop-blur-lg">
<div class="flex flex-col md:flex-row justify-between items-center px-10 py-12 max-w-7xl mx-auto gap-6 font-['Plus_Jakarta_Sans'] text-sm tracking-wide">
<div class="text-xl font-black text-cyan-400">Camden Connect</div>
<p class="text-slate-500">© 2024 Camden Connect. Architecting the future of mentorship.</p>
<div class="flex gap-8">
<a class="text-slate-500 hover:text-slate-300 transition-all" href="#">Privacy</a>
<a class="text-slate-500 hover:text-slate-300 transition-all" href="#">Terms</a>
<a class="text-slate-500 hover:text-slate-300 transition-all" href="#">Safety</a>
<a class="text-slate-500 hover:text-slate-300 transition-all" href="#">Contact</a>
</div>
</div>
</footer>
<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
<div class="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
<div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full"></div>
</div>
</body></html>