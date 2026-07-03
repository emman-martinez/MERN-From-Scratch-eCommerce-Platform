import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import { AppProviders } from "./app/Providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
);
