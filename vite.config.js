var _a;
import path from "node:path";
import { execSync } from "node:child_process";
import pkg from "./package.json";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
var base = (_a = process.env.VITE_BASE_PATH) !== null && _a !== void 0 ? _a : "/habit-tracker/";
var buildTimestamp = new Date().toISOString();
var gitCommitHash = (function () {
    try {
        return execSync("git rev-parse --short HEAD", {
            stdio: ["ignore", "pipe", "ignore"]
        })
            .toString()
            .trim();
    }
    catch (_a) {
        return "local";
    }
})();
export default defineConfig({
    base: base,
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
        __APP_BUILD_TIMESTAMP__: JSON.stringify(buildTimestamp),
        __APP_BUILD_HASH__: JSON.stringify(gitCommitHash)
    },
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
