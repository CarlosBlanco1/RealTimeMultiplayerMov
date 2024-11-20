import { useState } from "react";
import CarIcon from "./CarIcon";

export default function Vehicle() {
  const [rotation, setRotation] = useState(0);
  const [viewBox, setViewBox] = useState(0);
  const [xPosition, setXPostion] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  //Get coordinates from the context
  
  return (
    <div
      style={{
        position: "fixed",
        rotate: `${rotation}deg`,
        fill: "#999999",
        width: `${viewBox}px`,
        height: `${viewBox}px`,
        top: `${xPosition}px`,
        left: `${yPosition}px`,
      }}
    >
      
      <CarIcon />
    </div>
  );
}
