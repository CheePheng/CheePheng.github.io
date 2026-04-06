import React, { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import ExperienceSwitcher from "@/components/ExperienceSwitcher";
import LoadingFallback from "@/components/LoadingFallback";

const GsapHomePage = React.lazy(() => import("@/pages/GsapHomePage"));
const CaseStudiesPage = React.lazy(() => import("@/pages/CaseStudiesPage"));
const BoldTypePage = React.lazy(() => import("@/pages/BoldTypePage"));
const CinematicPage = React.lazy(() => import("@/pages/CinematicPage"));
const ProjectDetailPage = React.lazy(() => import("@/pages/ProjectDetailPage"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

const App = () => (
  <div className="dark">
    <HashRouter>
      <ExperienceSwitcher />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<PageTransition />}>
            <Route path="/" element={<GsapHomePage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/bold" element={<BoldTypePage />} />
            <Route path="/cinematic" element={<CinematicPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  </div>
);

export default App;
