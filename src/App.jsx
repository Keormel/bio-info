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

const contourOpenPaths = [
  "M -110 126 C 30 34 96 155 206 102 C 342 37 334 -72 512 -42",
  "M -108 216 C 38 126 142 254 268 176 C 396 98 426 -10 596 18",
  "M -95 306 C 78 212 174 362 342 256 C 482 168 522 40 710 62",
  "M -80 402 C 126 292 238 452 436 338 C 594 248 670 112 842 145",
  "M -66 510 C 176 362 322 556 542 432 C 744 318 800 208 988 240",
  "M 72 716 C 230 594 366 664 492 752 C 622 842 752 852 872 770 C 1014 674 1038 538 1166 462 C 1296 386 1414 484 1606 356",
  "M 178 32 C 214 126 336 148 402 54 C 470 -44 554 -18 616 62 C 686 154 632 268 716 336 C 806 408 904 362 936 250 C 982 86 1078 68 1216 118",
  "M 294 0 C 238 128 330 218 454 190 C 576 162 620 242 578 340 C 520 478 600 594 736 640 C 924 704 1006 606 1054 466",
  "M 454 -52 C 386 102 448 212 574 232 C 704 252 738 350 686 456 C 624 584 704 712 850 742 C 1036 780 1120 650 1172 506",
  "M 637 -54 C 572 82 614 182 728 202 C 858 225 882 328 826 428 C 760 546 842 674 978 696 C 1140 722 1244 596 1304 462",
  "M 850 -22 C 958 72 1084 76 1182 -4 C 1308 -106 1448 -50 1518 74 C 1582 188 1544 302 1622 408",
  "M 842 120 C 990 206 1104 166 1190 68 C 1306 -66 1472 -4 1530 144 C 1576 260 1548 410 1652 502",
  "M 872 248 C 1026 330 1146 300 1236 184 C 1338 52 1486 116 1532 256 C 1574 386 1548 532 1644 630",
  "M 904 380 C 1064 458 1174 420 1270 306 C 1374 182 1484 256 1528 382 C 1572 508 1544 666 1640 752",
  "M 986 875 C 1076 726 1182 648 1316 710 C 1434 764 1514 720 1608 628",
  "M 1132 906 C 1226 770 1326 752 1438 820 C 1502 858 1564 852 1648 782",
];

const contourLoopPaths = [
  "M 74 602 C 108 466 276 390 392 458 C 516 530 500 684 386 760 C 252 850 38 760 74 602 Z",
  "M 130 606 C 164 506 284 462 368 514 C 458 568 446 676 358 730 C 262 788 106 724 130 606 Z",
  "M 190 612 C 226 548 296 526 352 562 C 408 598 406 666 344 700 C 278 736 168 690 190 612 Z",
  "M 250 622 C 276 592 318 586 346 608 C 378 634 370 670 334 688 C 292 708 232 672 250 622 Z",
  "M 642 34 C 686 -84 850 -90 904 28 C 958 150 848 238 746 190 C 664 152 608 124 642 34 Z",
  "M 690 46 C 724 -24 824 -28 860 44 C 896 118 828 170 766 142 C 716 120 670 98 690 46 Z",
  "M 732 52 C 754 20 806 14 826 54 C 844 90 810 118 780 102 C 750 88 720 82 732 52 Z",
  "M 884 300 C 950 174 1110 198 1174 326 C 1242 462 1122 588 980 540 C 850 496 822 416 884 300 Z",
  "M 938 328 C 986 244 1086 262 1128 348 C 1172 438 1092 514 1002 482 C 918 454 898 402 938 328 Z",
  "M 994 352 C 1024 316 1072 322 1094 370 C 1116 418 1072 454 1024 438 C 982 424 970 386 994 352 Z",
  "M 1226 132 C 1294 34 1440 56 1496 166 C 1550 274 1442 374 1324 330 C 1204 286 1168 216 1226 132 Z",
  "M 1286 160 C 1330 106 1414 118 1448 182 C 1482 246 1416 306 1350 282 C 1284 258 1252 204 1286 160 Z",
  "M 1344 186 C 1370 166 1410 170 1424 204 C 1438 238 1404 264 1372 252 C 1340 240 1322 210 1344 186 Z",
];

function TopographicBackground() {
  const renderPaths = (prefix) => (
    <>
      {contourOpenPaths.map((path, index) => (
        <path key={`${prefix}-open-${index}`} d={path} />
      ))}
      {contourLoopPaths.map((path, index) => (
        <path key={`${prefix}-loop-${index}`} d={path} />
      ))}
    </>
  );

  return (
    <div className="topographic-background" aria-hidden="true">
      <svg className="topographic-map topographic-map-primary" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <g>{renderPaths("primary")}</g>
      </svg>
      <svg className="topographic-map topographic-map-secondary" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(1600 900) rotate(180)">{renderPaths("secondary")}</g>
      </svg>
    </div>
  );
}

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
    minHeight: "100vh",
    background: isDark ? "#030303" : "#f7f4ec",
    color: t.text,
    padding: route.page === "home" ? "20px 32px" : "24px 16px 36px",
    display: "flex",
    flexDirection: "column",
    transition: "background 0.25s ease, color 0.25s ease",
    fontFamily: "'Manrope', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflowY: "auto",
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
    "--topo-bg": isDark ? "#030303" : "#f7f4ec",
    "--topo-line": isDark ? "rgba(255,255,255,0.72)" : "rgba(17,24,39,0.24)",
    "--topo-line-soft": isDark ? "rgba(255,255,255,0.32)" : "rgba(17,24,39,0.12)",
    "--panel-bg": isDark ? "rgba(18,18,18,0.82)" : "rgba(255,255,255,0.74)",
    "--chip-bg": isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.58)",
    "--contact-link-bg": isDark ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.11)",
    "--contact-link-hover-bg": isDark ? "rgba(124,58,237,0.18)" : "rgba(124,58,237,0.16)",
    "--contact-link-border": isDark ? "rgba(167,139,250,0.16)" : "rgba(124,58,237,0.26)",
    "--contact-link-shadow": isDark ? "none" : "0 10px 24px rgba(124,58,237,0.1)",
  };

  const goHome = () => navigateTo("/", setRoute);
  const goPortfolio = () => navigateTo("/portfolio", setRoute);
  const goProject = (id) => navigateTo(`/project/${id}`, setRoute);

  return (
    <div className={`portfolio-app ${isDark ? "theme-dark" : "light"} ${ready ? "is-ready" : "is-loading"}`} style={containerStyle}>
      <TopographicBackground />

      <div className="app-shell" style={{ display: route.page === "home" ? "flex" : "block", flex: "1 0 auto" }}>
        {route.page === "home" && <HomePage t={t} clock={clock} isDark={isDark} setIsDark={setIsDark} onGoToPortfolio={goPortfolio} />}

        {route.page === "portfolio" && <PortfolioPage t={t} onBackHome={goHome} onOpenProject={goProject} />}

        {route.page === "project" && project && <ProjectPage t={t} project={project} onBackToPortfolio={goPortfolio} onBackHome={goHome} />}

        {route.page === "project" && !project && <NotFoundPage t={t} onBackHome={goHome} onBackToPortfolio={goPortfolio} />}
      </div>

      <footer className="site-footer">
        <span>Copyright © {new Date().getFullYear()} Keormel. Все права защищены. Скачивание, копирование и редактирование не допускается.</span>
        <span>
          сode by <a href="#">keormel</a>
        </span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          min-height: 100%;
          width: 100%;
        }
        body {
          background: #0f0f0f;
          min-width: 0;
        }
        body.light {
          background: var(--bg);
          color: var(--text);
        }
        a { color: inherit; }
        button, a { -webkit-tap-highlight-color: transparent; }

        .portfolio-app {
          position: relative;
          overflow-x: hidden;
          isolation: isolate;
          background: var(--topo-bg);
          width: 100%;
          min-height: 100svh;
        }

        .topographic-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          background:
            radial-gradient(circle at 18% 74%, rgba(124, 58, 237, 0.08), transparent 28%),
            radial-gradient(circle at 78% 18%, rgba(124, 58, 237, 0.05), transparent 24%),
            var(--topo-bg);
          transition: background 0.25s ease;
        }

        .topographic-map {
          position: absolute;
          inset: -8%;
          width: 116%;
          height: 116%;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .topographic-map path {
          vector-effect: non-scaling-stroke;
        }

        .topographic-map-primary {
          color: var(--topo-line);
          stroke: currentColor;
          stroke-width: 1.15;
          opacity: 0.9;
          animation: topoDriftPrimary 34s ease-in-out infinite alternate;
        }

        .topographic-map-secondary {
          color: var(--topo-line-soft);
          stroke: currentColor;
          stroke-width: 0.95;
          opacity: 0.72;
          animation: topoDriftSecondary 46s ease-in-out infinite alternate;
        }

        .app-shell,
        .site-footer {
          position: relative;
          z-index: 1;
        }

        .app-shell {
          width: min(1440px, calc(100vw - 32px));
          margin: 0 auto;
        }

        .site-footer {
          width: min(1440px, calc(100vw - 32px));
          margin: 20px auto 0;
          padding: 16px 0 0;
          border-top: 0.5px solid var(--border);
          color: var(--text2);
          font-size: 13px;
          line-height: 1.5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .site-footer a {
          color: var(--text);
          font-weight: 700;
          text-decoration: none;
        }

        .site-footer a:hover {
          color: var(--accent2);
        }

        @keyframes topoDriftPrimary {
          from {
            transform: translate3d(-1.8%, -1.2%, 0) scale(1.02);
          }
          to {
            transform: translate3d(1.6%, 1.1%, 0) scale(1.05);
          }
        }

        @keyframes topoDriftSecondary {
          from {
            transform: translate3d(1.4%, 1.1%, 0) scale(1.08);
          }
          to {
            transform: translate3d(-1.4%, -1%, 0) scale(1.04);
          }
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

        .home-layout,
        .home-content,
        .home-column,
        .project-hero-text,
        .bio-name-block {
          min-width: 0;
        }

        .home-layout {
          width: 100%;
        }

        .home-content {
          align-items: flex-start;
        }

        .home-column {
          width: 100%;
        }

        .home-stats-grid > div,
        .home-stack-grid > *,
        .stack-pill,
        .soft-link,
        .tag-pill,
        .feature-row,
        .metric-row {
          min-width: 0;
        }

        .stack-pill span,
        .soft-link span,
        .feature-row span,
        .card-footer span,
        .inline-button span,
        .back-button span,
        .tag-pill {
          overflow-wrap: anywhere;
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
          letter-spacing: 0;
          overflow-wrap: anywhere;
        }

        .page-subtitle {
          margin: 0;
          max-width: 860px;
          color: var(--text2);
          font-size: 16px;
          line-height: 1.65;
          overflow-wrap: anywhere;
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
          background: var(--chip-bg);
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
          background: var(--chip-bg);
          color: var(--text);
          font-size: 14px;
        }

        .project-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--text);
          margin: 16px 0 10px;
          letter-spacing: 0;
          overflow-wrap: anywhere;
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
          overflow-wrap: anywhere;
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

        .project-preview.has-logo {
          padding: 0;
          overflow: hidden;
        }

        .project-preview img {
          width: 100%;
          height: 100%;
          object-fit: var(--project-logo-fit, cover);
          display: block;
          border-radius: inherit;
        }

        .project-preview-letter {
          font-weight: 800;
          line-height: 1;
          text-transform: uppercase;
        }

        .project-preview-large {
          width: 124px;
          height: 124px;
          font-size: 54px;
          border-radius: 24px;
        }

        .project-preview-large.has-logo {
          padding: 0;
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
          background: var(--chip-bg);
        }

        .soft-link {
          text-decoration: none;
          justify-content: flex-start;
          margin-bottom: 10px;
          padding: 10px 12px;
          color: var(--text);
        }

        .contact-link {
          background: var(--contact-link-bg);
          border: 0.5px solid var(--contact-link-border);
          box-shadow: var(--contact-link-shadow);
          font-weight: 600;
        }

        .contact-link i {
          color: var(--accent2);
        }

        .contact-link:hover {
          background: var(--contact-link-hover-bg);
        }

        .theme-button {
          width: 100%;
          background: var(--chip-bg);
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
          background: var(--chip-bg);
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
          background: var(--chip-bg);
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

        .avatar-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
          display: block;
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
          background: var(--panel-bg);
          border: 0.5px solid var(--border);
          border-radius: var(--card-r);
          padding: 28px;
          width: 100%;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(18px);
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

        @media (hover: none) {
          .cell:hover,
          .back-button:hover,
          .theme-button:hover,
          .inline-button:hover,
          .soft-link:hover {
            transform: none;
          }
        }

        @media (max-width: 1180px) {
          .home-layout {
            flex-direction: column !important;
            gap: 16px !important;
          }

          .home-theme-rail {
            width: 100%;
          }

          .home-theme-toggle {
            width: auto !important;
            min-width: 120px;
            height: 48px !important;
            flex-direction: row !important;
            padding: 0 14px;
          }

          .home-content {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px !important;
            width: 100%;
          }

          .home-column {
            display: flex !important;
            flex: initial !important;
            flex-direction: column !important;
            gap: 16px !important;
          }

          .home-column-about {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 960px) {
          .app-shell,
          .site-footer {
            width: min(100%, calc(100vw - 24px));
          }

          .grid-shell,
          .portfolio-grid,
          .project-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .page-head,
          .project-hero {
            flex-direction: column;
          }

          .cell {
            padding: 24px;
          }

          .project-preview-large {
            width: 96px;
            height: 96px;
            border-radius: 20px;
            font-size: 42px;
          }

          .grid-shell > .cell,
          .portfolio-grid > .cell,
          .project-grid > .cell {
            grid-column: span 2 !important;
          }
        }

        @media (max-width: 640px) {
          .portfolio-app {
            padding: 14px 12px 24px !important;
          }

          .app-shell,
          .site-footer {
            width: 100%;
          }

          .topographic-map {
            inset: -16%;
            width: 132%;
            height: 132%;
          }

          .home-layout {
            gap: 12px !important;
          }

          .home-content {
            grid-template-columns: 1fr;
            gap: 12px !important;
          }

          .home-column-about,
          .home-column-meta,
          .home-column-stack {
            grid-column: auto;
          }

          .home-theme-toggle {
            width: 100% !important;
            min-width: 0;
            height: 46px !important;
          }

          .grid-shell,
          .portfolio-grid,
          .project-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .page-shell {
            gap: 12px;
          }

          .page-head {
            gap: 12px;
            width: 100%;
          }

          .cell {
            padding: 20px;
            border-radius: 14px;
          }

          .bio-intro {
            gap: 12px !important;
          }

          .bio-name {
            font-size: 22px !important;
          }

          .bio-age {
            font-size: 14px !important;
            margin-left: 6px !important;
          }

          .avatar-box {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }

          .project-preview {
            width: 60px;
            height: 60px;
            border-radius: 14px;
            font-size: 25px;
          }

          .project-preview-large {
            width: 76px;
            height: 76px;
            border-radius: 18px;
            font-size: 34px;
          }

          .page-title {
            font-size: 26px;
          }

          .page-subtitle,
          .project-desc,
          .detail-text {
            font-size: 15px;
            line-height: 1.65;
          }

          .project-title {
            font-size: 22px;
            margin: 14px 0 8px;
          }

          .project-title.large {
            font-size: 24px;
          }

          .back-button,
          .theme-button {
            width: 100%;
            min-height: 44px;
            padding: 10px 14px;
          }

          .inline-actions,
          .detail-author {
            flex-direction: column;
            align-items: stretch;
          }

          .inline-button {
            width: 100%;
            min-height: 44px;
            padding: 10px 14px;
          }

          .project-card-top,
          .project-meta-line {
            align-items: flex-start;
          }

          .cta-row,
          .card-footer {
            padding: 12px;
            gap: 10px;
          }

          .tag-row {
            gap: 6px;
            margin-top: 12px;
          }

          .tag-pill {
            font-size: 11px;
          }

          .stack-pill,
          .soft-link {
            padding: 10px;
          }

          .grid-shell > .cell,
          .portfolio-grid > .cell,
          .project-grid > .cell {
            grid-column: span 1 !important;
          }

          .site-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            margin-top: 14px;
            font-size: 12px;
            line-height: 1.45;
          }
        }

        @media (max-width: 420px) {
          .portfolio-app {
            padding: 12px 10px 22px !important;
          }

          .cell {
            padding: 16px;
          }

          .home-stack-grid {
            grid-template-columns: 1fr !important;
          }

          .home-stats-grid {
            gap: 6px !important;
          }

          .home-stats-grid > div > div:first-child {
            font-size: 18px !important;
          }

          .home-stats-grid > div > div:last-child {
            font-size: 10px !important;
            letter-spacing: 0 !important;
          }

          .bio-intro {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .project-preview {
            width: 56px;
            height: 56px;
            font-size: 23px;
          }

          .project-preview-large {
            width: 70px;
            height: 70px;
            font-size: 31px;
          }
        }
      `}</style>
    </div>
  );
}
