import { createContext, useContext } from "react";
import IPlayerVehicle from "./IPlayerVehicle";

export interface VehicleContextInterface {
    vehicles: IPlayerVehicle[];
    setVehicles : React.Dispatch<React.SetStateAction<IPlayerVehicle[]>>;
    updateVehicle: (id: number, vehicleAction: "moveForward" | "moveBackward" | "turnLeft" | "turnRight" | "stopForwards" | "stopBackwards" | "stopLeft" | "stopRight") => void;
    addNewVehicle: (newVehicleId : number) => void;
}

export const vehicleContext = createContext<VehicleContextInterface>({
    vehicles: [{
        id: 0,
        xPosition: 0,
        yPosition: 0,
        Angle: 0,
        isMovingForward: false,
        isMovingBackward: false,
        isTurningRight: false,
        isTurningLeft: false,
        isAccelerating: false,
        isDecelerating: false
    }],
    setVehicles: () => {},
    updateVehicle: () => {},
    addNewVehicle: () => {}
})


export const useVehicleContext = () => {
    return useContext(vehicleContext)
};
