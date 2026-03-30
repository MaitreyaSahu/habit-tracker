var _a;
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
var base = (_a = process.env.VITE_BASE_PATH) !== null && _a !== void 0 ? _a : "/habit-tracker/";
export default defineConfig({
    base: base,
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["tracker-icon.svg", "tracker-maskable.svg"],
            manifest: {
                name: "Tracker",
                short_name: "Tracker",
                description: "Offline-first habit tracking and study planning PWA.",
                theme_color: "#0f172a",
                background_color: "#020617",
                display: "standalone",
                start_url: base,
                scope: base,
                icons: [
                    {
                        src: "tracker-icon.svg",
                        sizes: "512x512",
                        type: "image/svg+xml",
                        purpose: "any"
                    },
                    {
                        src: "tracker-maskable.svg",
                        sizes: "512x512",
                        type: "image/svg+xml",
                        purpose: "maskable"
                    }
                ]
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,svg,png,ico,json}"],
                runtimeCaching: [
                    {
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return request.destination === "document";
                        },
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "pages-cache"
                        }
                    },
                    {
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return ["style", "script", "worker"].includes(request.destination);
                        },
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "asset-cache"
                        }
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    charts: ["recharts"],
                    motion: ["framer-motion"],
                    dnd: ["@hello-pangea/dnd"],
                    vendor: ["react", "react-dom", "react-router-dom", "zustand", "sonner"]
                }
            }
        }
    }
});
