import { useEffect, useState } from "react";

export function getRouteFromPath(pathname) {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  if (cleanPath === "/portfolio") {
    return { page: "portfolio" };
  }

  if (cleanPath.startsWith("/project/")) {
    const projectId = decodeURIComponent(cleanPath.slice("/project/".length));
    return { page: "project", projectId };
  }

  return { page: "home" };
}

export function useRoute() {
  const [route, setRoute] = useState(() => {
    if (typeof window === "undefined") {
      return { page: "home" };
    }

    return getRouteFromPath(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => setRoute(getRouteFromPath(window.location.pathname));

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return [route, setRoute];
}

export function useRouteReady(route) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const frame = window.requestAnimationFrame(() => setReady(true));

    return () => window.cancelAnimationFrame(frame);
  }, [route.page, route.projectId]);

  return ready;
}

export function navigateTo(path, setRoute) {
  window.history.pushState({}, "", path);
  setRoute(getRouteFromPath(path));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
