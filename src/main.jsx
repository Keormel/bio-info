import React from "react";
import ReactDOM from "react-dom/client";
import PortfolioApp from "./App.jsx";

const rootElement = document.getElementById("root");
const app = (
  <React.StrictMode>
    <PortfolioApp />
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
