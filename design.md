---
name: Unity & Vitality
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#434655'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#784b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The brand personality of this design system is built on the intersection of institutional reliability and youthful energy. It serves two distinct audiences: mentors who require a sense of professionalism and stability, and youth who seek a platform that feels current, vibrant, and accessible. The UI should evoke a sense of "active safety"—an environment that is protective but encourages growth and movement.

The chosen style is **Corporate / Modern with an Energetic Edge**. It utilizes clean layouts and structural integrity (Minimalism) but injects life through saturated accent colors and intentional whitespace. The interface avoids being overly clinical by using soft shapes and meaningful transitions, ensuring the digital space feels like a welcoming community hub rather than a bureaucratic tool.

## Colors

The color palette is anchored by "Supportive Blue" (#2563EB) to establish immediate trust and authority. This is balanced by "Inspiring Green" (#10B981), which is used for progress indicators, success states, and growth-oriented call-to-actions. 

A tertiary "Empowerment Amber" is introduced sparingly to highlight notifications or active mentorship opportunities, adding warmth to the system. The neutral palette leans toward slate and charcoal rather than pure blacks to maintain a softer, more modern feel. The background is kept off-white to reduce eye strain and provide a "canvas" feel that makes the primary colors pop.

## Typography

This design system utilizes **Plus Jakarta Sans** for headlines to provide a friendly, optimistic, and slightly geometric appearance that appeals to a younger demographic without losing professional credibility. Its open counters and modern curves make large titles feel inviting.

For body copy and functional labels, **Be Vietnam Pro** is selected. Its contemporary, warm character ensures that long-form content—such as mentorship guidelines or community stories—remains highly readable and approachable. Bold weights are used frequently for labels to maintain a clear information hierarchy and high accessibility.

## Layout & Spacing

The layout utilizes a **fluid grid system** to ensure the platform is equally effective on mobile devices (used primarily by youth) and desktops (used by mentors). A standard 12-column grid is used for desktop layouts, transitioning to a 4-column grid for mobile.

The spacing rhythm is based on a 4px baseline, but defaults to generous 24px (md) and 40px (lg) increments to create an "airy" and empowering feel. Large margins and gutters prevent the interface from feeling cramped or overwhelming, which is essential for maintaining a sense of safety and clarity.

## Elevation & Depth

To convey a sense of modern trust, this design system uses **Tonal Layers** combined with **Ambient Shadows**. Instead of harsh borders, surfaces are defined by subtle shifts in background color (e.g., a slightly darker gray for card backgrounds on an off-white page).

Shadows are exceptionally soft, with a large blur radius and very low opacity (5-10%), often tinted with a hint of the primary blue. This creates a "lifted" effect for interactive elements like cards and buttons, suggesting they are tangible and ready for engagement. High-priority elements, like "New Message" alerts, may use a slightly more pronounced shadow to draw immediate attention.

## Shapes

The shape language is consistently **Rounded** (Level 2). This level of corner radius (8px for standard components, 16px for cards) strikes the perfect balance between the rigid professionalism of square edges and the overly playful nature of full pills. 

Interactive elements like input fields and primary buttons utilize the 8px radius to feel modern and "soft to the touch," while containers like profile cards or community boards use the 16px (rounded-lg) radius to create a protective, "contained" look. Icons should follow this logic, utilizing rounded caps and joins rather than sharp angles.

## Components

### Buttons & Chips
Buttons are high-contrast with bold labels. Primary buttons use the Supportive Blue with white text, while secondary buttons use a light blue ghost style. Chips are used for tags like "Mentorship," "Sports," or "Education," using the Inspiring Green background at 10% opacity with dark green text.

### Cards
Cards are the primary container for community content. They feature a white background, the Level 2 roundedness, and a subtle ambient shadow. Card headers should use Plus Jakarta Sans in a medium weight to clearly define the topic.

### Input Fields
Inputs should feel safe and accessible. They feature a 1px border in a neutral slate, which thickens and changes to Supportive Blue on focus. Error states must be clearly marked with both a color change and an icon for accessibility.

### Progress & Status
Because this is an empowering system, progress bars and achievement badges are prominent. Use Inspiring Green for completion and Supportive Blue for "in-progress" states.

### Mentorship Specifics
Include "Profile Snippet" components that emphasize the human element—circular avatars with a "verified" badge to build immediate trust between the mentor and the youth.