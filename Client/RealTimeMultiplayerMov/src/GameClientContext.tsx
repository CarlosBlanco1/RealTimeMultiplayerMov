import { useEffect, useState } from "react";
import IPlayerVehicle from "./IPlayerVehicle";
import { GameState } from "./App";
import Vehicle from "./Vehicle";
import PlayerControls from "./PlayerControls";

export default function GameClientContext() {
  const [vehicleId] = useState<number>(Date.now());
  const [vehicles, setVehicles] = useState<IPlayerVehicle[]>();
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  function ChangeState(gameState: GameState) {
    setVehicles(gameState.state);
  }

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5165/ws");
    setSocket(newSocket);

    //Send new vehicle id after connection
    newSocket.addEventListener("open", () => {
      console.log("connection made");

      let newVehicleId = { newVehicleId: vehicleId };
      newSocket.send(JSON.stringify(newVehicleId));
    });

    newSocket.addEventListener("message", (event) => {
      console.log("revieved event", event.data);

      let newState: GameState = {
        state: JSON.parse(event.data)["state"] as IPlayerVehicle[],
      };

      ChangeState(newState);
    });
  }, []);

  return (
    <>
      <>
        {vehicles && (
          <>
            {vehicles.map((v) => {
              <Vehicle id={v.id}></Vehicle>;
              if (v.id == vehicleId) {
                <PlayerControls
                  upKey="w"
                  downKey="s"
                  leftKey="a"
                  rightKey="d"
                  id={vehicleId}
                ></PlayerControls>;
              }
            })}
          </>
        )}
      </>
    </>
  );
}
