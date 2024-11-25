import React, { useEffect, useState } from "react";
import CarIcon from "./CarIcon"; // Assuming this is your car icon
import { useVehicleContext } from "./useGameServerContext";

export default function Vehicle() {
  const context = useVehicleContext();

  const [rotation, setRotation] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    setRotation(context.vehicle.Angle);
    setXPosition(context.vehicle.xPosition);
    setYPosition(context.vehicle.yPosition);
  }, [context.vehicle]);

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
