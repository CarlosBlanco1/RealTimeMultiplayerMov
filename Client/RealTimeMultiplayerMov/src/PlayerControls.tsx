import { useEffect } from "react";
import { useVehicleContext } from "./useGameServerContext";

export default function PlayerControls() {

    const gameContext = useVehicleContext();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          console.log(`Key down: ${event.key}`);
          switch (event.key) {
            case 'w':
                gameContext.updateVehicle(1, "moveForward")
                break;
            case 's':
                gameContext.updateVehicle(1, "moveBackward")
                break;

            case 'a':
                gameContext.updateVehicle(1, "turnLeft")
                break;

            case 'd':
                gameContext.updateVehicle(1, "turnRight")
                break;
          
            default:
                break;
          }
        };
      
        const handleKeyUp = (event: KeyboardEvent) => {
          console.log(`Key up: ${event.key}`);

          switch (event.key) {
            case 'w':
                gameContext.updateVehicle(1, "stopForwards")
                break;

            case 's':
                gameContext.updateVehicle(1, "stopBackwards")
                break;

            case 'a':
                gameContext.updateVehicle(1, "stopLeft") 
                break;

            case 'd':
                gameContext.updateVehicle(1, "stopRight") 
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
      
}