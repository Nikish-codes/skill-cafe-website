---
name: Skill Café 3.0 — Google I/O & Google for Startups Edition
description: Calm, confident, spacious, and restrained event landing page designed in Google's design language
colors:
  canvas-white: "#FFFFFF"
  surface-gray: "#F8F9FA"
  border-subtle: "#E8EAED"
  text-primary: "#202124"
  text-secondary: "#5F6368"
  primary-accent: "#DA5662"
  primary-accent-hover: "#C84652"
  accent-peach: "#FEF7ED"
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(40px, 5.5vw, 64px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(32px, 4vw, 48px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  h4:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  h5:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  title:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-compact:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  small:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  micro:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  card: "24px"
  btn: "999px"
  input: "8px"
  badge: "999px"
spacing:
  section-desktop: "128px"
  section-tablet: "96px"
  section-mobile: "72px"
  final-cta: "160px"
  card-padding: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary-accent}"
    textColor: "{colors.canvas-white}"
    height: "48px"
    rounded: "{rounded.btn}"
    padding: "0 24px"
    fontSize: "{typography.body.fontSize}"
    fontWeight: 500
  button-primary-hover:
    backgroundColor: "{colors.primary-accent-hover}"
  card-standard:
    backgroundColor: "{colors.canvas-white}"
    border: "1px solid {colors.border-subtle}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
---

# Design System: Google I/O & Google for Startups

> Calm, confident, spacious, and easy to scan. Restraint is the primary design principle.

## Principles
1. **One Idea Per Section:** Each section does exactly one job with a maximum 8-word headline and at most one supporting paragraph (max-w 640px).
2. **Single Pattern Repetition:** Within each section, repeat a single visual container pattern (e.g. 7 uniform school pills, 4 equal-height outcome cards, 4 horizontal timeline steps, two-row continuous archive cards, 3 equal partner cards).
3. **No Decorative Noise:** No bouncing badges, no colored dropshadows, no heavy gradients, no emoji icons.
4. **Single Geometric Sans:** Plus Jakarta Sans is used everywhere across all headings, body text, labels, and badges.

## Color Palette
- **Canvas White (`#FFFFFF`):** Base ground for Hero, Outcomes, Event Details, and Ecosystem.
- **Surface Gray (`#F8F9FA`):** Alternating ground for Manifesto, Event Phases, Archives, and Registration CTA.
- **Hairline Border (`#E8EAED`):** 1px boundary between sections and on card outlines.
- **Text Primary (`#202124`):** High contrast Google dark charcoal for all headlines and labels.
- **Text Secondary (`#5F6368`):** Readable muted gray for body copy and metadata.
- **Brand Accent (`#DA5662`):** Signature coral-rose accent reserved for primary action CTAs, active highlights, and eyebrow kickers.
- **Soft Peach (`#FEF7ED`):** Extremely quiet organic silhouette positioned strictly under the hero 3D cup.

## Typography Scale
- **Display / H1:** `clamp(40px, 5.5vw, 64px)` (font-weight 500, leading 1.1, tracking -0.02em)
- **H2:** `clamp(32px, 4vw, 48px)` (font-weight 500, leading 1.15, tracking -0.01em)
- **H3:** `20px` (font-weight 500, leading 1.3)
- **Body:** `16px` (font-weight 400, leading 1.6)
- **Small / Captions:** `14px` (font-weight 400, leading 1.5)
- **Eyebrows:** `13px` (font-weight 500, uppercase, tracking 0.08em)
- **Micro / Chips:** `12px` (font-weight 500, leading 1.4)

## Grid & Spacing
- Strict 8px grid system.
- Section vertical padding: 128px (desktop), 96px (tablet), 72px (mobile). Final CTA section is 160px (`py-40`).
- Container max-width: 1200px.
- Reading width: 640px.
