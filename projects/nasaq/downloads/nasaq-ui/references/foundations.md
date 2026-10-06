# Foundations

The canonical portable values are in ../assets/tokens.json and ../assets/nasaq.css.
JSON follows the DTCG typed token structure: color primitives use sRGB components, alpha, and a hex fallback; semantic tokens reference primitives. Light and dark semantic groups are separate so a converter can assign them to modes. This bundle does not create Figma Variables automatically.

## Color and modes

Light: background paper, surface white, text/action ink, on-action white, border line, muted #68635F, link #B82413, focus #423879.
Dark: background #171717, surface #272625, text/action paper, on-action ink, border #4A4745, muted/focus lavender, link pink. Brand/pastel compositions retain ink foreground even inside dark contexts.

Semantic variables cover interactive UI. Brand backgrounds use primitive tokens explicitly with tested foregrounds. Line is a decorative separator; controls must also have text/shape and visible focus, not rely on border contrast alone.

## Typography

Display/H1/H2/H3 use Almarai. Lead/body/labels/controls use Almarai. Available weights:300,400,700,800. Use real weights; do not synthesize500/600. Latin identifiers can use the same UI family or a system monospace for code. Text outline in exported SVG lockups may vary if fonts are not loaded; embed the supplied fonts for web, or outline text in the target design tool before distribution as a fixed logo file.

Do not use a proprietary Thmanyah typeface. Fonts in this package carry SIL OFL licenses in assets.

## Icons / miscellaneous symbols

Original stroke icons on24px grid,1.75px strokes. Inline SVG supports currentColor. Files used as img display black by default; use a suitable single-color treatment in dark mode. Use text labels for action meaning. Decorative stars may use Unicode; render differs by platform. Use icon-spark.svg for stable geometry.

## Effects / motion

Floating surface shadow:0 8px 24px #17171712. Focus ring:3px,4px offset. Dialog backdrop:#17171788. Border-only ordinary cards. Fast state transitions120ms, entry200ms. Disable optional motion under reduced-motion.

## Grid / radius

12/8/4 columns across desktop/tablet/mobile. Gaps24/24/16px. Radii0/4/12/20/999px. CSS utilities are starters; compose responsive layout for the actual content. RTL logical properties are required.

Token format reference: https://www.designtokens.org/tr/2025.10/format/


Expanded foundation groups: 88 color shades, 19 Almarai typography composites and motion/interaction tokens. Read colors.md, typography.md and motion.md. Lucide is bundled separately from original Nasaq icons with its license; preserve attribution. No large red introduction, cover or brand panel.
