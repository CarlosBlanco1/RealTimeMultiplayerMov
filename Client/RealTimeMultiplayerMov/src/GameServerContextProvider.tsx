import { useEffect, useState } from "react";
import IPlayerVehicle from "./IPlayerVehicle";
import { vehicleContext } from "./useGameServerContext";
import moveVehicle from "./vehicleUtils";

export default function GameServerContextProvider({ children }: { children: React.ReactNode }) {
    

    const [vehicle, setVehicle] = useState<IPlayerVehicle>({
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: 0,
      isMovingForward: true,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    })

    useEffect(() => {
      function infiniteLoop() {
        console.log("started running loop")
        setVehicle(v => moveVehicle(v))

        setTimeout(infiniteLoop, 100);
      }

      infiniteLoop();
    }, []);

    const updateVehicle = (
        id: number,
        vehicleAction:
           | "moveForward"    // 'w' pressed
           | "moveBackward"   // 's' pressed
           | "turnLeft"       // 'a' pressed
           | "turnRight"      // 'd' pressed
           | "stopForwards"   // when user lets go of 'w' key
           | "stopBackwards"  // when user lets go of 's' key
           | "stopLeft"       // when user lets go of 'a' key
           | "stopRight"      // when user lets go of 'd' key
     ) => {


        switch (vehicleAction) {
            case "moveForward":
              setVehicle(v => ({...v, isMovingForward : true}))
              break;
            
            case "turnLeft":
              setVehicle(v => ({...v, isTurningLeft : true}))
              break;

            case "turnRight":
              setVehicle(v => ({...v, isTurningRight : true}))
              break;
            
            case "stopForwards":
              setVehicle(v => ({...v, isMovingForward : false}))
              break;

            case "stopLeft":
              setVehicle(v => ({...v, isTurningLeft : false}))
              break;

            case "stopRight":
              setVehicle(v => ({...v, isTurningRight : false}))
              break;      
            
            default:
                throw "Invalid Vehicle Action";
        }
     }

     return (
      <>
        <vehicleContext.Provider
          value={{
            vehicle,
            updateVehicle
          }}
        >
          {children}
        </vehicleContext.Provider>
      </>
    );
}