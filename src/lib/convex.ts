import { ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://brazen-ant-552.convex.cloud";

export const isConvexConfigured = Boolean(import.meta.env.VITE_CONVEX_URL);

export const convex = new ConvexReactClient(convexUrl);
