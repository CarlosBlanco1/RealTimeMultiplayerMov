import { useEffect } from "react";
import { useVehicleContext } from "./useGameServerContext";

export default function PlayerControls({upKey, downKey, leftKey, rightKey, id} : {upKey: string, downKey: string, leftKey: string, rightKey: string, id: number}) {

    const gameContext = useVehicleContext();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          console.log(`Key down: ${event.key}`);
          switch (event.key) {
            case upKey:
                gameContext.updateVehicle(id, "moveForward")
                break;

            case downKey:
                gameContext.updateVehicle(id, "moveBackward")
                break;

            case leftKey:
                gameContext.updateVehicle(id, "turnLeft")
                break;

            case rightKey:
                gameContext.updateVehicle(id, "turnRight")
                break;
          
            default:
                break;
          }
        };
      
        const handleKeyUp = (event: KeyboardEvent) => {
          console.log(`Key up: ${event.key}`);

          switch (event.key) {
            case upKey:
                gameContext.updateVehicle(id, "stopForwards")
                break;

            case downKey:
                gameContext.updateVehicle(id, "stopBackwards")
                break;

            case leftKey:
                gameContext.updateVehicle(id, "stopLeft") 
                break;

            case rightKey:
                gameContext.updateVehicle(id, "stopRight") 
                break;
          
            default:
                break;
          }
        };
      
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
      
        // Cleanup the event listeners
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("keyup", handleKeyUp);
        };
      }, []);
      ``
      return null;
}