import { AnimatePresence, MotionConfig } from "framer-motion";
import { lazy, Suspense } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Skeleton from "@/components/ui/Skeleton";
import { useAppBootstrap } from "@/hooks/useAppBootstrap";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const HabitsPage = lazy(() => import("@/pages/HabitsPage"));
const StudyPlannerPage = lazy(() => import("@/pages/StudyPlannerPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<Skeleton className="h-[70vh]" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/study-planner" element={<StudyPlannerPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  useAppBootstrap();

  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </MotionConfig>
  );
}
