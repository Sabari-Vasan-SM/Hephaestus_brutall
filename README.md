# BRUTAL. — Streetwear With No Rules

An independent, production-grade e-commerce application and **Super Admin Suite** built with **TanStack Start**, **React 19**, **Vite**, and **Tailwind CSS v4**, rendered in a high-impact **Neo-Brutalist** editorial design language.

> **Zero Backend Required**: Fully functional client-side engine with persistent `localStorage` synchronization across all storefront operations, product catalogs, inventory adjustment audits, live checkout, and multi-stage order tracking.

---

## ⚡ Super Admin Access

Access the dedicated Super Admin suite at `/superadmin`:

| Portal URL | Default Admin Email | Password |
| :--- | :--- | :--- |
| **`/superadmin`** (or `/superadmin/login`) | `admin@brutal.com` | `admin123` |

*(A 1-click **"Fill Demo Admin Credentials"** button is also available directly on the login screen).*

---

## ⚡ Convex Real-time Backend & Database Architecture

The application is powered by a **Convex real-time reactive backend**:

### 📊 Database Schema (`convex/schema.ts`)
* **`products`**: Full catalog entities with SKU indexes, categories, gallery arrays, materials, review aggregations, and stock counters.
* **`orders`**: Real-time order fulfillment pipeline with customer details, order timeline event logs, and status progression.
* **`inventoryLogs`**: Immutable chronological stock audit ledger tracking every purchase, restock, manual adjustment, and order cancellation restore.
* **`customers`**: Registered customer accounts, multiple shipping addresses, and order history associations.
* **`coupons`**: Discount engine supporting percentage and flat promo codes with minOrder thresholds and active toggles.
* **`taxonomy`**: Dynamic dropdowns for brands, categories, category labels, subtitle presets, and badges.
* **`homeConfig`**: Live CMS homepage editor storing hero typography, CTA buttons, stats, marquee items, manifesto pillars, and footer configuration.
* **`storeSettings`**: Global configuration for announcement banners, shipping thresholds, and support contacts.
* **`admins`**: Super Admin authentication credentials and session controls.

### 🛠️ Convex Backend Functions
* **`convex/products.ts`**: `list`, `listActive`, `getById`, `create`, `update`, `remove`, `duplicate`, `toggleStatus`, `addReview`.
* **`convex/orders.ts`**: `list`, `listByCustomer`, `getById`, `placeOrder` (atomic stock deduction + log creation), `updateStatus`, `cancelOrder` (with automatic inventory rollback), `getMetrics`.
* **`convex/inventory.ts`**: `listStock`, `listLogs`, `updateStock`, `adjustStock`.
* **`convex/customers.ts`**: `list`, `getByEmail`, `register`, `login`, `updateProfile`, `addAddress`, `deleteAddress`, `setDefaultAddress`.
* **`convex/coupons.ts`**: `list`, `validate`, `create`, `remove`, `toggleStatus`.
* **`convex/taxonomy.ts`**: `get`, `addBrand`, `deleteBrand`, `addCategory`, `deleteCategory`, `addCategoryLabel`, `deleteCategoryLabel`, `addSubtitlePreset`, `deleteSubtitlePreset`, `addBadge`, `deleteBadge`.
* **`convex/homeConfig.ts`**: `get`, `update`, `reset`.
* **`convex/settings.ts`**: `get`, `update`, `seed`, `resetToDemoData`.
* **`convex/admin.ts`**: `login`, `getSession`.

---

## ✨ Features & Architecture

### 1. Super Admin Management Suite (`/superadmin`)
- **Visual Page Editor & CMS (`/superadmin/page-editor`)**:
  - Full UI customization of Homepage Hero (badges, multiline typography, descriptions, CTAs, stat counters, image presets, custom image URLs, floating stickers).
  - Scrolling Marquee Text editor (Add, edit, remove top & bottom scrolling phrases).
  - Flash Promo & Offer Bar editor (toggle, custom discount text, direct links).
  - Catalog Section Headings & Kickers (Featured Picks, Trending Radar).
  - Brand Manifesto & Pillar Values editor (Heading + customizable cards).
  - Footer & Social Handles editor (Multiline tagline, social URLs, newsletter text, and copyright).
- **Executive Analytics Dashboard (`/superadmin`)**: Live gross merchandise value (GMV), total orders, units sold, low-stock alerts radar, and top-selling products.
- **Dropdowns & Taxonomy Manager (`/superadmin/taxonomy`)**: Direct UI management for Brands, Primary Categories, Subcategories, Subtitles, and Badges.
- **Product Catalog Manager (`/superadmin/products`)**:
  - Full CRUD: Create, Edit, Duplicate, Toggle Status (`Active`/`Draft`), Delete.
  - Multi-attribute filters: Category, Status, Stock Health, and Search.
  - Live PDP preview shortcuts.
- **Product Editor & Creator (`/superadmin/products/new`, `/superadmin/products/:productId/edit`)**:
  - Image preset selector + URL input.
  - Multi-size, color, badge, brand, SKU, and pricing configuration.
- **Inventory Controller & Audit Ledger (`/superadmin/inventory`)**:
  - Fast inline stock adjustments (`+1`, `+10`, `+25`, custom count).
  - Search by SKU or product name with low-stock / sold-out filters.
  - Immutable chronological inventory activity audit trail.
- **Order Fulfillment Pipeline (`/superadmin/orders`)**:
  - Filter orders by status (`PLACED`, `CONFIRMED`, `PACKED`, `SHIPPED`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`).
  - 1-click stage progression directly from table.
- **Order Inspector (`/superadmin/orders/:orderId`)**:
  - Detailed piece breakdown, customer info, shipping addresses, timeline event notes, and status transitions.
- **Customer Directory (`/superadmin/customers`)**:
  - Registered client list, total order metrics, lifetime spend, and address books.
- **Store Settings & Promo Engine (`/superadmin/settings`)**:
  - Store metadata, announcement banner toggles, free shipping thresholds.
  - Promo code creator & manager (percentage / flat discount with expiry).
  - 1-click Factory Demo Data Reset.

### 2. Customer Storefront
- **Dynamic Homepage & Catalog (`/`, `/shop`)**: Real-time product cards, brand filters, price sliders, size & color selectors, grid/list view switcher.
- **Product Detail Pages (`/product/:productId`)**:
  - Live stock status badges (*"In Stock"*, *"Only X Units Remaining"*, *"Out of Stock"*).
  - Interactive customer review submission form saving dynamically to state.
  - Dynamic "Goes With" recommendations.
- **Cart & Bag Engine (`/cart`)**:
  - Real-time stock-aware quantity controls.
  - Free shipping progress bar (*"Add ₹X more for free shipping"*).
  - Dynamic coupon validation and application.
- **Checkout Pipeline (`/checkout`)**:
  - Address auto-fill from saved customer addresses.
  - Delivery speed selector (Standard vs Express Priority).
  - Payment simulation (Cards, UPI, COD, Demo Authorization).
  - Instant stock decrement and redirect to live order tracker.
- **Real-Time Order Tracking (`/order/:orderId`)**:
  - Visual status progress stepper synchronized in real-time with Super Admin fulfillment changes.
  - Chronological timeline events and customer cancellation action (auto-restores stock).
- **Customer Account Portal (`/account`, `/login`, `/signup`)**:
  - Profile and contact details editor.
  - Multi-address book (Add, Delete, Set Default).
  - Complete order history and saved wishlist items.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack SSR React framework)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **State & Storage**: Reactive React Context + `localStorage` event-synchronized engine
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@utility` design tokens
- **UI Components**: Radix UI Primitives, [Sonner](https://sonner.emilkowal.ski/) Toasts, [Lucide React](https://lucide.dev/) Icons
- **Validation**: [Zod](https://zod.dev/) Schema Validation
- **Bundler & Server Engine**: [Vite](https://vitejs.dev/) & [Nitro](https://nitro.unjs.io/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher

### Installation & Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

---

## 🎨 Design Tokens

- **Ink (Foreground)**: `oklch(0 0 0)` / `#000000`
- **Paper (Background)**: `oklch(1 0 0)` / `#FFFFFF`
- **Zap (Accent Neon)**: `oklch(0.877 0.176 96.5)` / `#D4FF00`
- **Flare (Accent Coral/Red)**: `oklch(0.667 0.234 39.5)` / `#FF2E00`
- **Smoke (Muted Gray)**: `oklch(0.965 0.002 90)` / `#F6F6F6`
- **Typography**: `Archivo` (Headings) + `Space Grotesk` (Body & UI labels)
