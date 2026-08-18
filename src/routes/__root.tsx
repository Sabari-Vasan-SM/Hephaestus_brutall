import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md border-[3px] border-foreground p-10 text-center brutal-shadow">
        <h1 className="text-8xl">404</h1>
        <h2 className="mt-4 text-xl">Nothing here.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page doesn't exist or has been dropped.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="label-xs inline-flex border-[3px] border-foreground bg-zap px-5 py-3 press brutal-shadow-sm"
          >
            BACK HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md border-[3px] border-foreground p-10 text-center brutal-shadow">
        <h1 className="text-3xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something broke on our end. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="label-xs border-[3px] border-foreground bg-foreground px-5 py-3 text-background press brutal-shadow-sm"
          >
            TRY AGAIN
          </button>
          <a
            href="/"
            className="label-xs border-[3px] border-foreground px-5 py-3 press brutal-shadow-sm"
          >
            GO HOME
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BRUTAL. — Streetwear With No Rules" },
      {
        name: "description",
        content:
          "BRUTAL. is an independent streetwear label. Heavyweight basics, limited drops, no compromise.",
      },
      { property: "og:title", content: "BRUTAL. — Streetwear With No Rules" },
      {
        property: "og:description",
        content: "Independent pieces for people who don't follow the usual. Shop the new drop.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {/* Required: nested routes render here. */}
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </StoreProvider>
    </QueryClientProvider>
  );
}
