import { Download, Wifi, WifiOff } from "lucide-react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

export default function AppLayout() {
  const { canInstall, install } = useInstallPrompt();
  const [online, setOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-base-50 bg-grid bg-[size:22px_22px] text-base-900 transition-colors dark:bg-base-950 dark:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[-8%] h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-8%] h-72 w-72 rounded-full bg-teal-300/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-3 py-2 text-xs font-medium text-base-500 backdrop-blur-xl dark:border-white/10 dark:bg-base-900/70 dark:text-base-300">
            {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            <span>{online ? "Offline-ready and synced locally" : "Offline mode active"}</span>
          </div>

          {canInstall ? (
            <Button
              variant="secondary"
              className="gap-2"
              onClick={async () => {
                const accepted = await install();
                toast.success(accepted ? "Tracker installed" : "Install dismissed");
              }}
            >
              <Download className="h-4 w-4" />
              Install
            </Button>
          ) : null}
        </div>

        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>

        <BottomNav />
      </div>
    </div>
  );
}
