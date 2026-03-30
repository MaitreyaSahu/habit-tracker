import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { toast, Toaster } from "sonner";
import App from "@/app/App";
import "@/styles/index.css";

const updateSW = registerSW({
  immediate: true,
  onOfflineReady() {
    toast.success("Tracker is ready offline", {
      id: "pwa-offline-ready",
      description: "The app can keep working even when you lose connection."
    });
  },
  onNeedRefresh() {
    toast("Update available", {
      id: "pwa-update-available",
      description: "A newer version of Tracker is ready. Refresh to apply the latest changes.",
      duration: Infinity,
      action: {
        label: "Refresh",
        onClick: () => void updateSW(true)
      },
      cancel: {
        label: "Later",
        onClick: () => toast.dismiss("pwa-update-available")
      }
    });
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        className: "tracker-toast"
      }}
    />
  </React.StrictMode>
);
