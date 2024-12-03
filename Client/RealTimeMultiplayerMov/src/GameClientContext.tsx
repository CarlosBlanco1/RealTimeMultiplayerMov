import { useEffect, useState } from "react";
import IPlayerVehicle from "./IPlayerVehicle";
import { GameState } from "./App";
import Vehicle from "./Vehicle";
import PlayerControls from "./PlayerControls";

export default function GameClientContext() {
  const [vehicleId] = useState<number>(Date.now());
  const [vehicles, setVehicles] = useState<IPlayerVehicle[]>([]);
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  function ChangeState(gameState: GameState) {
    setVehicles(gameState.state);
  }

  function createInitialVehicle() {
    const initialVehicle: IPlayerVehicle = {
      id: vehicleId,
      xPosition: 0,
      yPosition: 0,
      Angle: 0,
      isMovingForward: false,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: false,
      isDecelerating: false
    };
    return initialVehicle;
  }

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5165/ws");
    setSocket(newSocket);

    newSocket.addEventListener("open", () => {
      console.log("Connection made");
      const initialVehicle = createInitialVehicle();
      setVehicles((prevVehicles) => [...prevVehicles, initialVehicle]);
    });

    newSocket.addEventListener("message", (event) => {
      console.log("Received event", event.data);

      const messageData = JSON.parse(event.data)

      //If the message doesn't contain state, its actually a message for the server
      if(!messageData.state)
      {
        return
      }

      const newState: GameState = {
        state: messageData.state as IPlayerVehicle[],
      };

      ChangeState(newState);
    });

    return () => {
      newSocket.close();
      console.log("WebSocket closed");
    };
  }, [vehicleId]);

  return (
    <>
      {vehicles.map((v) => (
        <div key={v.id}>
          <Vehicle id={v.id} />
          {v.id === vehicleId && socket &&(
            <PlayerControls
              upKey="w"
              downKey="s"
              leftKey="a"
              rightKey="d"
              id={vehicleId}
              socket={socket}
            />
          )}
        </div>
      ))}
    </>
  );
}

