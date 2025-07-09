import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FavoritesProvider } from "./components/store/FavoritesContext.jsx";
import App from "./App.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </StrictMode>
);
