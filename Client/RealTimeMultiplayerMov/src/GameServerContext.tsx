import { useEffect, useState } from "react";
import { movementRequest } from "./App";
import { useVehicleContext } from "./useGameServerContext";

export default function GameServerContext() {
  const gameContext = useVehicleContext();
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5165/ws");

    setSocket(newSocket);
    newSocket.addEventListener("open", () => {
      console.log("connected to server");
    });

    newSocket.addEventListener("message", (event) => {
      console.log("revieved event", event.data);

      const messageData = JSON.parse(event.data)

      //If the vehicleId is not in the message, it's actually a message for the clients
      if(!messageData.vehicleId)
      {
        return;
      }

      //receive movement request and update vehicle accordingly
      let newMovementRequest: movementRequest = {
        vehicleId: messageData.vehicleId,
        action: messageData.action,
      };

      if(!gameContext.vehicles.find(v => v.id == newMovementRequest.vehicleId))
      {
        gameContext.addNewVehicle(newMovementRequest.vehicleId)
        // THIS DOESNT ADD THE FREAKING VEHICLE CORRECTLY
      }

      console.log("vehicles are:")
      console.log(gameContext.vehicles)

      gameContext.updateVehicle(
        newMovementRequest.vehicleId,
        newMovementRequest.action as
          | "moveForward"
          | "moveBackward"
          | "turnLeft"
          | "turnRight"
          | "stopForwards"
          | "stopBackwards"
          | "stopLeft"
          | "stopRight"
      );

      //create and send new state after movement request

      const newState = {
        state: gameContext.vehicles,
      };
      
      newSocket.send(JSON.stringify(newState))
      console.log("sent" + JSON.stringify(newState))

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
