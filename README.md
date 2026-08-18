# BRUTAL. — Streetwear With No Rules

An independent, full-stack streetwear storefront web application built with **TanStack Start**, **React 19**, **Vite**, and **Tailwind CSS v4**, rendered in a high-impact **Neo-Brutalist** editorial design language.

---

## ✨ Features

- **Bold Neo-Brutalist Aesthetic**: Heavy black borders (`border-[3px]`), hard offset ink drop-shadows (`brutal-shadow`), uppercase typography (`Archivo` & `Space Grotesk`), and vibrant accent highlights (`zap` neon and `flare` orange/red).
- **Product Catalog & Filtering**:
  - Browse limited drops with Category, Sort, Price, and Sale filters.
  - Switch seamlessly between Grid and List view layouts.
  - Real-time active filter chips and count indicator.
- **Product Detail Pages (PDP)**:
  - Dynamic image galleries with thumbnail selection.
  - Interactive color & size selectors with stock indicators.
  - Quantity controls, accordion details (materials, sizing, shipping), and related product recommendations.
- **Cart & Wishlist Management**:
  - Global persistent store for cart items with quantity updates and promo code engine (`BRUTAL10`, `DROP20`).
  - One-click wishlist save/remove with counter badge in the navbar.
- **Checkout & Order Confirmation**:
  - Form validation with Zod schemas.
  - Multi-step address input, delivery options, and payment selection.
  - Generated order tracking summary and detailed receipts.
- **Interactive Search Overlay**:
  - Instant keyboard-accessible modal (`SearchOverlay`) with live keyword search and quick-filter category pills.
- **Neo-Brutalist Feedback & Dialogs**:
  - Custom Sonner toast notifications with ink borders and punchy brand colors.
  - Styled modal dialogs and alert banners.
- **Responsive Navigation**:
  - Sticky header with quick-action links and live cart badges.
  - Full-screen slide-out mobile drawer.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack SSR React framework)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **State & Data Fetching**: [TanStack Query](https://tanstack.com/query) & React Context
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@utility` design tokens
- **UI Components**: [Radix UI](https://www.radix-ui.com/) Primitives, [Sonner](https://sonner.emilkowal.ski/) Toasts, [Lucide React](https://lucide.dev/) Icons
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Bundler & Server Engine**: [Vite](https://vitejs.dev/) & [Nitro](https://nitro.unjs.io/)

---

## 📂 Project Structure

```text
├── public/                  # Static assets & custom SVG/ICO favicons
├── src/
│   ├── components/          # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   │   └── ui/              # Base primitives (Alert, Dialog, Button, Sonner, etc.)
│   ├── hooks/               # Custom React hooks (use-mobile, etc.)
│   ├── lib/                 # Store context, mock data, formatters, and utilities
│   ├── routes/              # TanStack file-based routes
│   │   ├── __root.tsx       # Root layout shell & global providers
│   │   ├── index.tsx        # Homepage hero & drop highlights
│   │   ├── shop.tsx         # Catalog with filter & sorting sidebar
│   │   ├── product.$productId.tsx # Product detail view
│   │   ├── cart.tsx         # Shopping cart & discount code application
│   │   ├── checkout.tsx     # Order checkout & shipping form
│   │   ├── order.$orderId.tsx # Order summary & confirmation
│   │   ├── wishlist.tsx     # Saved items grid
│   │   ├── account.tsx      # Customer profile & order history
│   │   ├── login.tsx        # Authentication & sign-in
│   │   ├── signup.tsx       # New customer registration
│   │   └── info.$slug.tsx   # Brand editorial pages (shipping, sizing, faq)
│   ├── router.tsx           # Router instance configuration
│   ├── server.ts            # SSR entry handler
│   └── styles.css           # Global Tailwind v4 styles and Neo-Brutalist tokens
├── package.json             # Dependencies and npm scripts
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite + TanStack Start plugin configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Hephaestus_brutall
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) (or the port indicated in the terminal) in your browser.

---

## 📜 Available Scripts

| Script                | Command              | Description                                    |
| :-------------------- | :------------------- | :--------------------------------------------- |
| **`npm run dev`**     | `vite dev`           | Starts local dev server with HMR               |
| **`npm run build`**   | `vite build`         | Compiles client and SSR bundles for production |
| **`npm run preview`** | `vite preview`       | Runs local preview of the production build     |
| **`npm run lint`**    | `eslint .`           | Runs ESLint to check for code quality          |
| **`npm run format`**  | `prettier --write .` | Formats all code files with Prettier           |

---

## 🎨 Design Tokens

- **Ink (Foreground)**: `oklch(0 0 0)` / `#000000`
- **Paper (Background)**: `oklch(1 0 0)` / `#FFFFFF`
- **Zap (Accent Neon)**: `oklch(0.877 0.176 96.5)` / `#D4FF00`
- **Flare (Accent Coral/Red)**: `oklch(0.667 0.234 39.5)` / `#FF2E00`
- **Smoke (Muted Gray)**: `oklch(0.965 0.002 90)` / `#F6F6F6`
- **Typography**: `Archivo` (Headings) + `Space Grotesk` (Body & UI labels)
