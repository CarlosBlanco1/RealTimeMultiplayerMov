import React, { useEffect, useState } from "react";
import CarIcon from "./CarIcon"; // Assuming this is your car icon
import { useVehicleContext } from "./useGameServerContext";

export default function Vehicle({ id }: { id: number }) {
  const context = useVehicleContext();

  const vehicle = context.vehicles.find((v) => v.id == id);

  const [rotation, setRotation] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    if (vehicle) {
      setRotation(vehicle.Angle);
      setXPosition(vehicle.xPosition);
      setYPosition(vehicle.yPosition);
    }
  }, [vehicle]);

  return (
    <div
      className="vehicle"
      style={{
        position: "absolute",
        top: `${yPosition}px`,
        left: `${xPosition}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <CarIcon />
    </div>
  );
}
