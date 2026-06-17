import { bio, contacts, projects, stack } from "./data.js";

const envSiteUrl = import.meta.env?.VITE_SITE_URL;

export function normalizeSiteUrl(value = "https://keormel.xyz") {
  return String(value || "https://keormel.xyz").replace(/\/+$/, "");
}

export const siteUrl = normalizeSiteUrl(envSiteUrl);
export const siteName = "Keormel Portfolio";

export function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

export function truncateText(value, limit = 160) {
  const text = cleanText(value);

  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, Math.max(0, limit - 3)).trimEnd()}...`;
}

export function absoluteUrl(value, baseUrl = siteUrl) {
  if (!value) {
    return `${normalizeSiteUrl(baseUrl)}/`;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const path = value.startsWith("/") ? value : `/${value}`;
  return `${normalizeSiteUrl(baseUrl)}${path}`;
}

export function getProjectById(projectId) {
  return projects.find((project) => project.id === projectId);
}

export function getSeoForRoute(route = { page: "home" }, project) {
  if (route.page === "portfolio") {
    return {
      title: "Portfolio projects - Keormel",
      description:
        "Portfolio of Keormel: web applications, Telegram bots, React, Node.js, Python and full-stack development case studies.",
      path: "/portfolio",
      image: bio.avatar,
      type: "website",
    };
  }

  if (route.page === "project") {
    if (!project) {
      return {
        title: "Page not found - Keormel",
        description: "This project page was not found in Keormel portfolio.",
        path: route.projectId ? `/project/${encodeURIComponent(route.projectId)}` : "/portfolio",
        image: bio.avatar,
        type: "website",
        noindex: true,
      };
    }

    return {
      title: `${cleanText(project.title)} - Keormel case study`,
      description: truncateText(project.desc || project.long || `${project.title} project case study by Keormel.`),
      path: `/project/${encodeURIComponent(project.id)}`,
      image: project.logo || bio.avatar,
      type: "article",
    };
  }

  return {
    title: "Keormel - Full-stack developer",
    description:
      "Portfolio of Keormel: full-stack developer working with React, Node.js, Python, web applications and Telegram bots.",
    path: "/",
    image: bio.avatar,
    type: "profile",
  };
}

function removeEmpty(value) {
  if (Array.isArray(value)) {
    return value.map(removeEmpty).filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, removeEmpty(item)])
        .filter(([, item]) => item !== undefined && item !== ""),
    );
  }

  return value === null ? undefined : value;
}

export function getStructuredData(seo, route = { page: "home" }, project, baseUrl = siteUrl) {
  const canonical = absoluteUrl(seo.path, baseUrl);
  const image = absoluteUrl(seo.image || bio.avatar, baseUrl);
  const sameAs = contacts.map((contact) => contact.url).filter(Boolean);

  if (route.page === "project" && project) {
    return removeEmpty({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: cleanText(project.title),
      description: seo.description,
      url: canonical,
      image,
      dateCreated: project.date || project.year,
      creator: {
        "@type": "Person",
        name: bio.name,
        alternateName: "Keormel",
        jobTitle: bio.role,
        url: absoluteUrl("/", baseUrl),
        sameAs,
      },
      keywords: [...(project.tags || []), ...(project.stack || [])].join(", "),
    });
  }

  return removeEmpty({
    "@context": "https://schema.org",
    "@type": "Person",
    name: bio.name,
    alternateName: "Keormel",
    jobTitle: bio.role,
    description: seo.description,
    url: absoluteUrl("/", baseUrl),
    image,
    sameAs,
    knowsAbout: stack.map((item) => item.name),
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeJsonForHtml(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function renderSeoTags(seo, route, project, baseUrl = siteUrl) {
  const canonical = absoluteUrl(seo.path, baseUrl);
  const image = absoluteUrl(seo.image || bio.avatar, baseUrl);
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow";
  const structuredData = getStructuredData(seo, route, project, baseUrl);

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="author" content="${escapeHtml(bio.name)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.type)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<script type="application/ld+json" id="structured-data">${escapeJsonForHtml(structuredData)}</script>`,
  ].join("\n    ");
}
