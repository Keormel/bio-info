import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

function injectIntoTemplate(template, appHtml, seoTags) {
  return template
    .replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, `<!-- SEO_START -->\n    ${seoTags}\n    <!-- SEO_END -->`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

async function writeRouteHtml(routePath, html) {
  const outputDir = routePath === "/" ? distDir : path.join(distDir, routePath.replace(/^\/+/, ""));

  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "index.html"), html, "utf8");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sitemapXml(routes, absoluteUrl, baseUrl) {
  const now = new Date().toISOString();
  const urls = routes
    .map((entry) => {
      const priority = entry.path === "/" ? "1.0" : entry.path === "/portfolio" ? "0.9" : "0.8";

      return [
        "  <url>",
        `    <loc>${escapeXml(absoluteUrl(entry.path, baseUrl))}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        "    <changefreq>monthly</changefreq>",
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function robotsTxt(absoluteUrl, baseUrl) {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml", baseUrl)}`,
    "",
  ].join("\n");
}

const vite = await createServer({
  root: rootDir,
  appType: "custom",
  logLevel: "error",
  server: {
    middlewareMode: true,
  },
});

try {
  const [{ default: PortfolioApp }, { projects }, seoModule] = await Promise.all([
    vite.ssrLoadModule("/src/App.jsx"),
    vite.ssrLoadModule("/src/data.js"),
    vite.ssrLoadModule("/src/seo.js"),
  ]);

  const { absoluteUrl, getSeoForRoute, normalizeSiteUrl, renderSeoTags, siteUrl } = seoModule;
  const baseUrl = normalizeSiteUrl(process.env.SITE_URL || process.env.VITE_SITE_URL || siteUrl);
  const template = await readFile(path.join(distDir, "index.html"), "utf8");
  const routes = [
    { path: "/", route: { page: "home" } },
    { path: "/portfolio", route: { page: "portfolio" } },
    ...projects.map((project) => ({
      path: `/project/${encodeURIComponent(project.id)}`,
      route: { page: "project", projectId: project.id },
      project,
    })),
  ];

  await Promise.all(
    routes.map(async (entry) => {
      const appHtml = renderToString(React.createElement(PortfolioApp, { initialRoute: entry.route }));
      const seo = getSeoForRoute(entry.route, entry.project);
      const html = injectIntoTemplate(template, appHtml, renderSeoTags(seo, entry.route, entry.project, baseUrl));

      await writeRouteHtml(entry.path, html);
    }),
  );

  await Promise.all([
    writeFile(path.join(distDir, "sitemap.xml"), sitemapXml(routes, absoluteUrl, baseUrl), "utf8"),
    writeFile(path.join(distDir, "robots.txt"), robotsTxt(absoluteUrl, baseUrl), "utf8"),
  ]);
} finally {
  await vite.close();
}
