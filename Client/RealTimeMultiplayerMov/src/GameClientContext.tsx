import { useEffect, useState } from "react";
import IPlayerVehicle from "./IPlayerVehicle";
import { GameState } from "./App";

export default function GameClientContext() {
 
    const [vehicles, setVehicles] = useState<IPlayerVehicle[]>();
    const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

    function ChangeState(gameState:GameState) {

        setVehicles(gameState.state)
    }

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:5165/ws");
        setSocket(newSocket);
        newSocket.addEventListener("open", () => {
          console.log("connected to server");
          newSocket.send("Hello Server!");
        });
     
        newSocket.addEventListener("message", (event) => {
          console.log("revieved event", event.data);
    
          let newState : GameState = {
            type: JSON.parse(event.data)["type"],
            state: JSON.parse(event.data)["state"] as IPlayerVehicle[]
          } 
    
          ChangeState(newState)
        })
      }, []);
    
      return<>
      <div>Im a client</div>
      </>
      
}