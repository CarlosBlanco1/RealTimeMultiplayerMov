import { useEffect } from "react";
import { movementRequest } from "./App";

export default function PlayerControls({
  upKey,
  downKey,
  leftKey,
  rightKey,
  id,
  socket,
}: {
  upKey: string;
  downKey: string;
  leftKey: string;
  rightKey: string;
  id: number;
  socket: WebSocket;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let action: string | null = null;

      switch (event.key) {
        case upKey:
          action = "moveForward";
          break;
        case downKey:
          action = "moveBackward";
          break;
        case leftKey:
          action = "turnLeft";
          break;
        case rightKey:
          action = "turnRight";
          break;
        default:
          return;
      }

      if (action) {
        const movementRequest: movementRequest = {
          vehicleId: id,
          action: action,
        };
        try {
          socket.send(JSON.stringify(movementRequest));
          console.log("sent keystroke action")
        } catch (error) {
          console.error("Error sending movement request:", error);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      let action: string | null = null;

      switch (event.key) {
        case upKey:
          action = "stopForwards";
          break;
        case downKey:
          action = "stopBackwards";
          break;
        case leftKey:
          action = "stopLeft";
          break;
        case rightKey:
          action = "stopRight";
          break;
        default:
          return;
      }

      if (action) {
        const movementRequest: movementRequest = {
          vehicleId: id,
          action: action,
        };
        try {
          socket.send(JSON.stringify(movementRequest));
        } catch (error) {
          console.error("Error sending movement request:", error);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return null;
}
