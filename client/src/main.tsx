import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PomodoroProvider } from "./components/Pomodoro/PomodoroContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PomodoroProvider>
      <App />
    </PomodoroProvider>
  </React.StrictMode>
);
