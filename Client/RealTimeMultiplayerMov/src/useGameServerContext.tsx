import { createContext, useContext } from "react";
import IPlayerVehicle from "./IPlayerVehicle";

export interface VehicleContextInterface {
    vehicle: IPlayerVehicle;
    updateVehicle: (id: number, vehicleAction: "moveForward" | "moveBackward" | "turnLeft" | "turnRight" | "stopForwards" | "stopBackwards" | "stopLeft" | "stopRight") => void;
}

export const vehicleContext = createContext<VehicleContextInterface>({
    vehicle: {
        id: 0,
        xPosition: 0,
        yPosition: 0,
        Angle: 0,
        isMovingForward: false,
        isTurningRight: false,
        isTurningLeft: false,
        isAccelerating: false,
        isDecelerating: false
    },
    updateVehicle: () => {}
})


export const useVehicleContext = () => {
    return useContext(vehicleContext)
};
