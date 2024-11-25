import IPlayerVehicle from "./IPlayerVehicle";

export default function moveVehicle(vehicle: IPlayerVehicle): IPlayerVehicle {

    console.log(vehicle.Angle)
  if (vehicle.isTurningLeft) {
    vehicle.Angle += 45;
  }

  if (vehicle.isTurningRight) {
    vehicle.Angle -= 45;
  }

  let radians = vehicle.Angle * (Math.PI / 180);

  if (vehicle.isMovingForward) {
    vehicle.xPosition += Math.round(Math.cos(radians) * 10) * 1.5;
    vehicle.yPosition += Math.round(Math.sin(radians) * 10) * 1.5;
  }

  if (vehicle.isMovingBackward) {
    vehicle.xPosition -= Math.round(Math.cos(radians) * 10) * 1.5;
    vehicle.yPosition -= Math.round(Math.sin(radians) * 10) * 1.5;
  }

  return vehicle;
}
