# ⚡ Shared-UI

> **Premium interactive client component library and multi-style demo websites extracted and generalized from [Vehicular Media](https://github.com/Lwhels/vehicularmedia).**

Shared-UI is an open, modular collection of high-craft React motion components, spatial lighting primitives, and multi-layered perspective cards. Built on **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, it delivers responsive, hardware-accelerated 120fps interactions across desktop and mobile.

---

## 🌟 Highlights

- **Extracted from Production**: Distilled directly from Vehicular Media’s flagship creative agency platform, stripping away proprietary assets while preserving physics, easing curves, and specular lighting.
- **8 Complete Demo Websites**: Pre-built, domain-specific demo applications featuring realistic mock data, interactive state machines, and dedicated styling identities:
  1. 🏎️ **Portfolio & Studio** (`/demos/portfolio`) - Automotive & commercial film production showcase with 3D project perspective cards, showreel modal, and RAW sensor color reveal.
  2. 🛍️ **Luxury E-Commerce** (`/demos/ecommerce`) - Cyber/minimalist technical apparel store with spotlight catalog, interactive slide-out bag drawer, coupon codes, and confetti checkout.
  3. 🍽️ **Fine Dining Restaurant** (`/demos/restaurant`) - Michelin-starred gastronomic atelier with interactive plate secret revealer, seasonal degustation menus, and online table reservation.
  4. 📈 **Enterprise SaaS** (`/demos/business`) - Silicon Indigo cloud telemetry landing page with interactive annual ROI savings calculator, 3D pricing tiers, and partner marquee.
  5. 📰 **Editorial Blog** (`/demos/blog`) - High-craft journal featuring real-time reading progress bar, topic filters, interactive applause counter, and full reader drawer.
  6. 🏝️ **Retreat & Hospitality** (`/demos/booking`) - Private sanctuary villa booking engine with stay duration filters, 3D villa cards, and cylindrical VIP concierge carousel.
  7. 👥 **Creator Community** (`/demos/social`) - Community feed with interactive post composer, spring like animations, magnetic follow buttons, and live presence status dots.
  8. 💬 **Chat & Messenger** (`/demos/chat`) - Sleek dark glass team workspace messenger with channel switcher, message bubble reactions, and automated AI bot responses.
- **Dynamic 5-Theme Engine**: Real-time palette and design token switching across all components and demos:
  - **Obsidian Amber** (Vehicular Media dark automotive luxury)
  - **Champagne Gold** (Fine dining, jewelry, luxury hospitality)
  - **Cyber Indigo** (Enterprise SaaS, DevOps, high-tech tools)
  - **Deep Emerald** (Organic wellness, ESG, fintech)
  - **Vibrant Rose** (Fashion, creator platforms, social media)
- **Interactive Component Playground**: Standalone laboratory to test each component with live property knobs, sliders, and one-click copyable JSX snippets.

---

## 📦 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/Lwhels/shared-UI.git
cd shared-UI

# Install dependencies
npm install

# Start local interactive dev server
npm run dev
```

Visit `http://localhost:3000` to launch the Component Playground and explore all 8 demo websites.

### 2. Production Build

```bash
npm run build
npm run preview
```

Generates a pre-compiled, highly optimized static production bundle in `dist/`.

---

## 🧩 Component Directory & API Reference

All components are exported directly from `shared-ui` or `@/components`:

```tsx
import {
  Spotlight,
  ThreeDCard,
  CardContainer,
  CardBody,
  CardItem,
  MovingBorder,
  MovingBorderButton,
  Carousel3D,
  InfiniteMovingCards,
  TextReveal,
  BubbleReveal,
  Magnetic,
  GlassCard,
  GlowingBadge,
  StatusDot,
  ThemeSwitcher,
} from "shared-ui";
```

### 1. `Spotlight`
A mouse-tracking radial gradient spotlight that illuminates borders and surfaces as the cursor glides across the container.

```tsx
<Spotlight
  size={600}
  spotlightColor="rgba(245, 158, 11, 0.18)"
  borderGlow={true}
  className="p-6 rounded-2xl"
>
  <h3>Interactive Spotlight Card</h3>
</Spotlight>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `number` | `600` | Diameter in pixels of the radial spotlight. |
| `spotlightColor` | `string` | `rgba(245, 158, 11, 0.18)` | CSS radial-gradient stop color. |
| `borderGlow` | `boolean` | `true` | Whether to render an outer illuminated specular edge. |

---

### 2. `ThreeDCard` (`CardContainer`, `CardBody`, `CardItem`)
Creates an authentic 3D spatial card tilt using CSS `transform-style: preserve-3d` and mouse displacement angles. Child `CardItem`s float at distinct Z-depths.

```tsx
<CardContainer className="w-full">
  <CardBody className="bg-zinc-900 p-8 rounded-2xl border border-white/10">
    <CardItem translateZ={30}>
      <span className="text-xs text-amber-400 font-mono">Category</span>
    </CardItem>
    <CardItem translateZ={50}>
      <h3 className="text-2xl font-bold text-white">Title</h3>
    </CardItem>
    <CardItem translateZ={80} rotateX={10} className="w-full my-4">
      <div className="h-40 rounded-xl bg-amber-500" />
    </CardItem>
  </CardBody>
</CardContainer>
```

| Prop | Component | Description |
| :--- | :--- | :--- |
| `rotationIntensity` | `CardContainer` | Divisor controlling tilt sensitivity (lower = more tilt). Default: `25`. |
| `translateZ` | `CardItem` | Depth translation in pixels along the Z axis on hover. |
| `rotateX`, `rotateY`, `rotateZ` | `CardItem` | Angular rotations applied to the specific child element. |

---

### 3. `MovingBorder` & `MovingBorderButton`
Traces an animated glowing gradient particle along an SVG rectangle perimeter using continuous `requestAnimationFrame` timing.

```tsx
<MovingBorderButton
  duration={3000}
  borderRadius="1.75rem"
  className="font-bold text-amber-300"
>
  Explore Works →
</MovingBorderButton>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `duration` | `number` | `3000` | Milliseconds required for the glowing beam to complete one full perimeter loop. |
| `borderRadius` | `string` | `1.75rem` | CSS border radius applied to the inner surface and outer SVG boundary. |
| `borderClassName` | `string` | `undefined` | Custom radial gradient tailwind classes for the moving beam. |

---

### 4. `Carousel3D`
A cylindrical 3D card carousel where slides rotate in 3D perspective space with arrow navigation, dot indicators, and keyboard arrows (`ArrowLeft` / `ArrowRight`).

```tsx
<Carousel3D
  cards={[
    { title: "Strategy", subtitle: "Architecture", content: "Data-driven roadmaps." },
    { title: "Production", subtitle: "Cinema", content: "4K HDR video production." },
  ]}
  showArrows={true}
  showDots={true}
  autoPlay={false}
/>
```

---

### 5. `InfiniteMovingCards`
Continuous infinite horizontal marquee ticker for logos, press quotes, or client reviews with smooth speed controls and pause-on-hover.

```tsx
<InfiniteMovingCards
  items={testimonials}
  direction="left"
  speed="normal"
  pauseOnHover={true}
/>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `direction` | `"left" \| "right"` | `"left"` | Scrolling direction of the scroller track. |
| `speed` | `"fast" \| "normal" \| "slow"` | `"normal"` | Speed profile (fast: 20s, normal: 40s, slow: 80s). |
| `pauseOnHover` | `boolean` | `true` | Temporarily freeze the animation when the user hovers over the cards. |

---

### 6. `TextReveal`
Decodes text strings with a high-tech scramble/matrix animation, cycling through random character banks before locking into the target phrase.

```tsx
<TextReveal
  text="SYSTEM.INITIALIZED"
  triggerOn="inView"
  scrambleSpeed={30}
  chars="-_~`!@#$%^&*()+=[]{}|;:,.<>?"
/>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `triggerOn` | `"inView" \| "hover" \| "mount"` | `"inView"` | When the scramble effect begins. |
| `scrambleSpeed` | `number` | `30` | Milliseconds per character shuffle cycle. |
| `chars` | `string` | Alphanumeric + Symbols | Custom bank of random glyphs to cycle through. |

---

### 7. `BubbleReveal`
An interactive circular lens that follows the mouse with spring physics, revealing a hidden layer underneath the base view with a glowing perimeter ring.

```tsx
<BubbleReveal
  size={200}
  ringColor="rgba(245, 158, 11, 0.4)"
  overlayContent={<BaseSurfaceView />}
>
  <SecretUnderlyingView />
</BubbleReveal>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `number` | `190` | Diameter of the circular reveal lens in pixels. |
| `ringColor` | `string` | `rgba(255, 255, 255, 0.3)` | Border and glow color of the trailing indicator ring. |
| `overlayContent` | `React.ReactNode` | Required | Content visible by default before the lens hovers over it. |

---

### 8. `Magnetic`
Applies subtle spring gravitational attraction toward the cursor when hovering over buttons, icons, or navigation pills.

```tsx
<Magnetic strength={0.3}>
  <button className="px-6 py-3 rounded-full bg-amber-500 text-black font-bold">
    Magnetic CTA
  </button>
</Magnetic>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `strength` | `number` | `0.25` | Gravitational pull multiplier (higher = more displacement). |
| `active` | `boolean` | `true` | Toggle magnetic behavior conditionally. |

---

## 🎨 Theme Tokens & Customization

The library features a centralized `ThemeProvider` and CSS variables configured in `src/styles/globals.css`:

```tsx
import { ThemeProvider, useTheme } from "shared-ui";

function App() {
  return (
    <ThemeProvider>
      <MyApplication />
    </ThemeProvider>
  );
}
```

Switch themes programmatically or through the built-in `<ThemeSwitcher />` component:

```tsx
const { theme, setTheme } = useTheme();

// Set to Champagne Gold, Cyber Indigo, Deep Emerald, Vibrant Rose, or Obsidian
setTheme("champagne");
```

---

## 📁 Repository Structure

```
shared-UI/
├── src/
│   ├── components/            # Core extracted client components
│   │   ├── Spotlight.tsx
│   │   ├── ThreeDCard.tsx
│   │   ├── MovingBorder.tsx
│   │   ├── Carousel3D.tsx
│   │   ├── InfiniteMovingCards.tsx
│   │   ├── TextReveal.tsx
│   │   ├── BubbleReveal.tsx
│   │   ├── Magnetic.tsx
│   │   ├── GlassCard.tsx
│   │   ├── InteractiveBadge.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   └── index.ts
│   ├── context/
│   │   └── ThemeContext.tsx   # Multi-style token engine
│   ├── demos/                 # 8 Full Demo Websites
│   │   ├── portfolio/         # Dark Automotive Agency
│   │   ├── ecommerce/         # Luxury Cyber Boutique + Cart Drawer
│   │   ├── restaurant/        # Gastronomy + Secret Ingredient Lens
│   │   ├── business/          # Enterprise SaaS + Live ROI Calculator
│   │   ├── blog/              # Editorial Journal + Progress Bar
│   │   ├── booking/           # Luxury Retreats + Concierge Cylinder
│   │   ├── social/            # Creator Community + Live Composer
│   │   └── chat/              # Dark Glass Messenger + AI Bot
│   ├── pages/
│   │   └── HomeHub.tsx        # Master Playground & Documentation
│   ├── lib/
│   │   └── utils.ts           # Class merging (cn) & formatters
│   ├── styles/
│   │   └── globals.css        # Tailwind styles & theme variables
│   ├── App.tsx                # Master router
│   ├── main.tsx               # Client entry point
│   └── index.ts               # Package public export
├── dist/                      # Production build output
├── index.html                 # Web application shell
├── package.json               # Package configuration
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite bundler configuration
```

---

## 📄 License

MIT © [Wheeler Media & Development](https://github.com/Lwhels)
