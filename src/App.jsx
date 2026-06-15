import { useEffect, useState } from "react";
import { projects } from "./data.js";
import { useClock } from "./hooks/useClock.js";
import { useRoute, useRouteReady, navigateTo } from "./hooks/useRoute.js";
import { HomePage } from "./pages/HomePage.jsx";
import { PortfolioPage } from "./pages/PortfolioPage.jsx";
import { ProjectPage } from "./pages/ProjectPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

const themes = {
  dark: {
    bg: "#0f0f0f",
    bg2: "#1a1a1a",
    bg3: "#222",
    text: "#f0f0f0",
    text2: "#999",
    border: "rgba(255,255,255,0.08)",
    accent: "#7c3aed",
    accent2: "#a78bfa",
  },
  light: {
    bg: "#f4f4f0",
    bg2: "#ffffff",
    bg3: "#eaeae6",
    text: "#111",
    text2: "#666",
    border: "rgba(0,0,0,0.08)",
    accent: "#7c3aed",
    accent2: "#5b21b6",
  },
};

export default function PortfolioApp() {
  const [isDark, setIsDark] = useState(true);
  const [route, setRoute] = useRoute();
  const clock = useClock();
  const ready = useRouteReady(route);
  const t = isDark ? themes.dark : themes.light;
  const project = projects.find((item) => item.id === route.projectId);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.title = route.page === "project" && project ? `${project.title} · Portfolio` : "Portfolio";
    document.body.classList.toggle("light", !isDark);
  }, [isDark, project, route.page]);

  const containerStyle = {
    height: route.page === "home" ? "100vh" : "auto",
    background: t.bg,
    color: t.text,
    padding: route.page === "home" ? "20px 32px" : "24px 16px 36px",
    transition: "background 0.25s ease, color 0.25s ease",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflowY: route.page === "home" ? "hidden" : "auto",
    overflowX: "hidden",
    "--bg": t.bg,
    "--bg2": t.bg2,
    "--bg3": t.bg3,
    "--text": t.text,
    "--text2": t.text2,
    "--border": t.border,
    "--accent": t.accent,
    "--accent2": t.accent2,
    "--card-r": "16px",
  };

  const goHome = () => navigateTo("/", setRoute);
  const goPortfolio = () => navigateTo("/portfolio", setRoute);
  const goProject = (id) => navigateTo(`/project/${id}`, setRoute);

  return (
    <div className={`portfolio-app ${isDark ? "theme-dark" : "light"} ${ready ? "is-ready" : "is-loading"}`} style={containerStyle}>
      <div className="app-shell" style={{ display: route.page === "home" ? "flex" : "block", height: route.page === "home" ? "100%" : "auto" }}>
        {route.page === "home" && <HomePage t={t} clock={clock} isDark={isDark} setIsDark={setIsDark} onGoToPortfolio={goPortfolio} />}

        {route.page === "portfolio" && <PortfolioPage t={t} onBackHome={goHome} onOpenProject={goProject} />}

        {route.page === "project" && project && <ProjectPage t={t} project={project} onBackToPortfolio={goPortfolio} onBackHome={goHome} />}

        {route.page === "project" && !project && <NotFoundPage t={t} onBackHome={goHome} onBackToPortfolio={goPortfolio} />}
      </div>

      <style>{`
        * { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          min-height: 100%;
        }
        body {
          background: #0f0f0f;
        }
        body.light {
          background: var(--bg);
          color: var(--text);
        }
        a { color: inherit; }
        button, a { -webkit-tap-highlight-color: transparent; }

        .portfolio-app {
          overflow-x: hidden;
        }

        .app-shell {
          width: min(1440px, calc(100vw - 32px));
          margin: 0 auto;
        }

        .grid-shell,
        .portfolio-grid,
        .project-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 16px;
        }

        .page-shell {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          align-items: center;
        }

        .page-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
        }

        .page-title {
          margin: 0 0 8px;
          font-size: 36px;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .page-subtitle {
          margin: 0;
          max-width: 860px;
          color: var(--text2);
          font-size: 16px;
          line-height: 1.65;
        }

        .back-button,
        .theme-button,
        .inline-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 10px;
          border: 0.5px solid var(--border);
          background: var(--bg3);
          color: var(--text);
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }

        .back-button,
        .theme-button {
          padding: 12px 16px;
          min-height: 48px;
          font-size: 14px;
        }

        .back-button:hover,
        .theme-button:hover,
        .inline-button:hover,
        .soft-link:hover {
          transform: translateY(-2px);
          border-color: rgba(124, 58, 237, 0.3);
        }

        .back-button.subtle {
          background: transparent;
        }

        .cta-row,
        .card-footer,
        .project-card-top,
        .project-meta-line,
        .detail-author,
        .project-hero,
        .inline-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .cta-row,
        .card-footer {
          margin-top: 18px;
          padding: 14px 16px;
          border-radius: 12px;
          background: var(--bg3);
          color: var(--text);
          font-size: 14px;
        }

        .project-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--text);
          margin: 16px 0 10px;
          letter-spacing: -0.02em;
        }

        .project-title.large {
          font-size: 36px;
          margin-top: 14px;
        }

        .project-desc,
        .detail-text {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text2);
        }

        .project-year,
        .project-role,
        .detail-author-role {
          color: var(--text2);
          font-size: 13px;
        }

        .project-preview {
          width: 72px;
          height: 72px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 30px;
          flex-shrink: 0;
        }

        .project-preview-large {
          width: 124px;
          height: 124px;
          font-size: 54px;
          border-radius: 24px;
        }

        .project-hero {
          align-items: flex-start;
        }

        .project-hero-text {
          flex: 1;
        }

        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.12);
          color: var(--accent2);
          font-size: 12px;
          line-height: 1.4;
        }

        .stack-pill,
        .soft-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text2);
          padding: 8px 10px;
          border-radius: 10px;
          background: var(--bg3);
        }

        .soft-link {
          text-decoration: none;
          justify-content: flex-start;
          margin-bottom: 10px;
          padding: 10px 12px;
          color: var(--text);
        }

        .theme-button {
          width: 100%;
          background: var(--bg3);
        }

        .metric-list,
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .metric-row,
        .feature-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          background: var(--bg3);
          color: var(--text);
          font-size: 14px;
        }

        .feature-row {
          justify-content: flex-start;
        }

        .feature-row i {
          color: var(--accent2);
        }

        .inline-actions {
          justify-content: flex-start;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .inline-button {
          padding: 12px 16px;
          min-height: 46px;
          background: var(--bg3);
          font-size: 14px;
        }

        .inline-button.secondary {
          background: transparent;
        }

        .detail-author-name {
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 2px;
        }

        .avatar-box {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--accent);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
          margin-right: 8px;
        }

        .cell {
          background: var(--bg2);
          border: 0.5px solid var(--border);
          border-radius: var(--card-r);
          padding: 28px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(10px);
          animation: cellIn 420ms ease forwards;
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.2s ease;
        }

        .cell:hover {
          border-color: rgba(124, 58, 237, 0.3);
          transform: translateY(-2px);
        }

        .is-ready .cell {
          opacity: 1;
        }

        @keyframes cellIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 960px) {
          .grid-shell,
          .portfolio-grid,
          .project-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .page-head,
          .project-hero {
            flex-direction: column;
          }

          .grid-shell > .cell,
          .portfolio-grid > .cell,
          .project-grid > .cell {
            grid-column: span 2 !important;
          }
        }

        @media (max-width: 640px) {
          .grid-shell,
          .portfolio-grid,
          .project-grid {
            grid-template-columns: 1fr;
          }

          .page-title {
            font-size: 26px;
          }

          .project-title.large {
            font-size: 24px;
          }

          .grid-shell > .cell,
          .portfolio-grid > .cell,
          .project-grid > .cell {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
