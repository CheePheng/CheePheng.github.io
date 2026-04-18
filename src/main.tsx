import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/literata/wght.css";
import "@fontsource-variable/literata/wght-italic.css";
import "@fontsource-variable/hanken-grotesk/wght.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
