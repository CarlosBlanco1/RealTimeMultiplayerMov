import { useEffect, useState } from "react";
import { GameState } from "./App";
import IPlayerVehicle from "./IPlayerVehicle";
import { useVehicleContext } from "./useGameServerContext";

export default function GameServerContext() {
  const gameContext = useVehicleContext();
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5165/ws");
    setSocket(newSocket);
    newSocket.addEventListener("open", () => {
      console.log("connected to server");
      newSocket.send("Hello Server!");
    });

    newSocket.addEventListener("message", (event) => {
      console.log("revieved event", event.data);

      let newState: GameState = {
        state: JSON.parse(event.data)["state"] as IPlayerVehicle[],
      };

      gameContext.setVehicles(newState.state);
    });
  }, []);
  return (
   <>
   <div>
        <div className="text-black">Im a server</div>
   </div>
   </>
  );
}
