// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Contexts
import { AuthProvider } from "./context/AuthContext.jsx";
import { HistoryProvider } from "./context/HistoryContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </AuthProvider>
  </React.StrictMode>
);
