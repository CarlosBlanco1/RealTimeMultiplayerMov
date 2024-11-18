import { useState } from "react";
import IPlayerVehicle from "./IPlayerVehicle";

export default function moveVehicle(vehicle : IPlayerVehicle) :IPlayerVehicle {
    const newVehicle = useState<IPlayerVehicle>(vehicle);

    return newVehicle;
}