import { useEffect } from "react";
import { absoluteUrl, getSeoForRoute, getStructuredData, siteName } from "../seo.js";

function ensureMeta(attribute, value) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  return element;
}

function setMeta(attribute, value, content) {
  ensureMeta(attribute, value).setAttribute("content", content);
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function setStructuredData(data) {
  let element = document.getElementById("structured-data");

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = "structured-data";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

export function usePageSeo(route, project) {
  useEffect(() => {
    const seo = getSeoForRoute(route, project);
    const canonical = absoluteUrl(seo.path);
    const image = absoluteUrl(seo.image);
    const robots = seo.noindex ? "noindex, nofollow" : "index, follow";

    document.documentElement.lang = "ru";
    document.title = seo.title;

    setMeta("name", "description", seo.description);
    setMeta("name", "robots", robots);
    setMeta("property", "og:site_name", siteName);
    setMeta("property", "og:type", seo.type);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", image);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", image);
    setCanonical(canonical);
    setStructuredData(getStructuredData(seo, route, project));
  }, [route, project]);
}
