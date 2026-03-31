# Design System Strategy: The Synthetic Intelligence Authority

## 1. Overview & Creative North Star: "The Digital Mentor"
This design system is built to transform a high-stakes anxiety-inducing activity—the job interview—into a controlled, elite performance. Our Creative North Star is **"The Digital Mentor"**: a sophisticated, authoritative, yet invisible guide. 

To move beyond the "generic SaaS" aesthetic, this system rejects the rigid, boxed-in layouts of traditional dashboards. Instead, we utilize **Intentional Asymmetry** and **Tonal Depth**. By overlapping high-contrast typography over translucent, layered surfaces, we create an editorial feel that suggests premium intelligence rather than a simple utility tool. We break the grid with "Floating Insights"—data points and AI feedback that feel like they are hovering in a three-dimensional space, anchored by light rather than lines.

---

## 2. Colors & Atmospheric Depth
Our palette is rooted in the deep obsidian of professional focus, punctuated by the "Electric Teal" of AI activation.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to define sections. Boundary definition must be achieved exclusively through:
*   **Background Shifts:** Transitioning from `surface` (#080e1c) to `surface-container-low` (#0c1322).
*   **Tonal Transitions:** Using subtle value shifts to imply edge, not a hard stroke.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent materials. 
*   **Base:** `surface` (#080e1c) for the primary application background.
*   **Secondary Content:** `surface-container` (#12192a) for main content areas.
*   **Elevated Insights:** `surface-container-highest` (#1d2539) for cards and active modules.
*   **Nesting:** Place a `surface-container-lowest` (#000000) card inside a `surface-bright` (#222c41) section to create a "recessed" look, providing tactile depth without shadows.

### The "Glass & Gradient" Rule
To evoke a sense of high-end technology, use Glassmorphism for floating feedback panels. Apply `surface-container` with a `backdrop-blur` (16px-24px).
*   **Signature Textures:** Main CTAs should not be flat. Apply a linear gradient from `primary` (#6af2de) to `primary-container` (#10b7a5) at a 135° angle to give the button "soul" and a metallic, premium sheen.

---

## 3. Typography: The Editorial Edge
We pair the geometric authority of **Manrope** for displays with the hyper-functional clarity of **Inter** for data.

*   **Display (Manrope):** Used for "The Hook." Large scales (`display-lg`: 3.5rem) with tight letter spacing (-0.02em) create a bold, editorial statement.
*   **Headlines (Manrope):** `headline-lg` (2rem) conveys authority in interview feedback.
*   **Body (Inter):** `body-lg` (1rem) for interview transcripts and AI analysis. The high x-height of Inter ensures legibility against dark backgrounds.
*   **Labels (Inter):** `label-md` (0.75rem) in `on-surface-variant` (#a5abbd) for metadata, ensuring a clear distinction between "content" and "UI chrome."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are discarded in favor of **Ambient Glows** and **Tonal Stacking**.

*   **The Layering Principle:** Rather than using a shadow to lift a card, place a `surface-container-high` card on a `surface-dim` background. This creates a soft, natural lift.
*   **Ambient Shadows:** For critical floating elements (like a live AI coach tooltip), use a diffused glow.
    *   *Shadow Specs:* Blur: 40px, Color: `primary` (#6af2de) at 5-8% opacity. This mimics the light emitted from the AI's "energy."
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` (#424858) at 15% opacity. It should be felt, not seen.

---

## 5. Component Architecture

### Buttons: The "Power Source"
*   **Primary:** Gradient of `primary` to `primary-container`. `radius-md` (0.75rem). No border.
*   **Secondary:** `surface-container-highest` fill with `primary` text. This maintains the "Dark Mode" aesthetic while remaining clickable.
*   **Tertiary:** Ghost style; `on-surface` text with no container, gaining a `surface-variant` background on hover.

### Cards: Geometric Intelligence
*   **The Rule:** Forbid divider lines.
*   **Separation:** Use `spacing-8` (2rem) or a subtle shift from `surface-container` to `surface-container-low`.
*   **Grid Texture:** Apply a 20px dot-grid texture in `outline-variant` at 5% opacity to the background of `surface-container` to evoke a "technical blueprint" feel.

### Input Fields: The Response Zone
*   **Default:** `surface-container-lowest` fill. `outline-variant` at 20% opacity.
*   **Focus State:** Border shifts to `primary` (#6af2de) with a subtle `primary-dim` outer glow (4px blur).
*   **Error:** Background shifts to `error_container` (#9f0519) at 10% opacity, with `error` (#ff716c) text.

### Signature Component: The "AI Pulse"
*   A custom progress bar using a `secondary` (#38fbf7) glow effect that pulses during voice analysis, housed in a `surface-container-lowest` track.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use `spacing-12` and `spacing-16` for "Breathing Room." High-end experiences require air.
*   **Do** overlap elements. Let a title in `display-sm` slightly overlap the edge of a card to break the "boxed" feel.
*   **Do** use `primary` sparingly. It is an "Electric Accent," not a primary surface color.

### Don't:
*   **Don't** use 100% white text. Stick to `on-surface` (#e0e5f9) to reduce eye strain and maintain the premium navy atmosphere.
*   **Don't** use sharp 0px corners. Always use `DEFAULT` (0.5rem) or `md` (0.75rem) to keep the "Modern SaaS" friendliness.
*   **Don't** use standard grey shadows. Use tinted shadows to maintain the "Navy/Teal" color harmony.