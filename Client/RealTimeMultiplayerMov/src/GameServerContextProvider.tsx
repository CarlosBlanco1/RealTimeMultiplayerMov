import { useEffect, useState } from "react";
import IPlayerVehicle from "./IPlayerVehicle";
import { vehicleContext } from "./useGameServerContext";
import moveVehicle from "./vehicleUtils";

export default function GameServerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [vehicles, setVehicles] = useState<IPlayerVehicle[]>([]);

  useEffect(() => {
    const addVehiclesWithDelay = async () => {
      console.log("this add vehcilce got called");
  
      const car1Id = await addNewVehicle();
      console.log(car1Id);
  
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
  
      const car2Id = await addNewVehicle();
      console.log(car2Id);
    };
  
    addVehiclesWithDelay();
    console.log(vehicles)
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((oldVehicles) =>
        oldVehicles.map((vehicle) => moveVehicle(vehicle))
      );
    }, 100);

    //TWO TYPES OF MESSAGES, I WANT TO MOVE THE VEHICLE MESSAGE, AND CURRENT STATE MESSAGE
    return () => clearInterval(interval);
  }, []);

  const addNewVehicle = () => {
    console.log("this add vehcile")
    const newVehicle = {
      id: Date.now(),
      xPosition: 0,
      yPosition: 0,
      Angle: 0,
      isMovingForward: false,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: false,
      isDecelerating: false,
    };

    setVehicles((v) => [...v, newVehicle]);
    console.log(vehicles)
    return newVehicle.id;
  };

  const updateVehicle = (
    id: number,
    vehicleAction:
      | "moveForward" // 'w' pressed
      | "moveBackward" // 's' pressed
      | "turnLeft" // 'a' pressed
      | "turnRight" // 'd' pressed
      | "stopForwards" // when user lets go of 'w' key
      | "stopBackwards" // when user lets go of 's' key
      | "stopLeft" // when user lets go of 'a' key
      | "stopRight" // when user lets go of 'd' key
  ) => {
    switch (vehicleAction) {
      case "moveForward":
        setVehicles((oldVehicles) =>
          oldVehicles.map((v) =>
            v.id === id ? { ...v, isMovingForward: true } : v
          )
        );
        break;

      case "moveBackward":
        setVehicles((oldVehicles) =>
          oldVehicles.map((v) =>
            v.id === id ? { ...v, isMovingBackward: true } : v
          )
        );
        break;

      case "turnLeft":
        setVehicles((oldVehicles) =>
          oldVehicles.map((v) =>
            v.id === id ? { ...v, isTurningLeft: true } : v
          )
        );
        break;

      case "turnRight":
        setVehicles((oldVehicles) =>
          oldVehicles.map((v) =>
            v.id === id ? { ...v, isTurningRight: true } : v
          )
        );
        break;

      case "stopForwards":
        setVehicles((oldVehicles) =>
          oldVehicles.map((v) =>
            v.id === id ? { ...v, isMovingForward: false } : v
          )
        );
        break;

      case "stopBackwards":
        setVehicles((oldVehicles) =>
          oldVehicles.map((v) =>
            v.id === id ? { ...v, isMovingBackward: false } : v
          )
        );
        break;

      case "stopLeft":
        setVehicles((oldVehicles) =>
          oldVehicles.map((v) =>
            v.id === id ? { ...v, isTurningLeft: false } : v
          )
        );
        break;

      case "stopRight":
        setVehicles((oldVehicles) =>
          oldVehicles.map((v) =>
            v.id === id ? { ...v, isTurningRight: false } : v
          )
        );
        break;

      default:
        throw "Invalid Vehicle Action";
    }
  };

  return (
    <>
      <vehicleContext.Provider
        value={{
          vehicles,
          setVehicles,
          updateVehicle,
          addNewVehicle
        }}
      >
        {children}
      </vehicleContext.Provider>
    </>
  );
}
