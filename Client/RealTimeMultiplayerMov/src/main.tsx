import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GameServerContextProvider from "./GameServerContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <GameServerContextProvider>
      <App />
    </GameServerContextProvider>
);
