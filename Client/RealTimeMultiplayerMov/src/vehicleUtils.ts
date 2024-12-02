import IPlayerVehicle from "./IPlayerVehicle";

export default function moveVehicle(vehicle: IPlayerVehicle): IPlayerVehicle {

  if (vehicle.isTurningLeft) {
    vehicle.Angle += 45;
  }

  if (vehicle.isTurningRight) {
    vehicle.Angle -= 45;
  }

  let radians = vehicle.Angle * (Math.PI / 180);

  if (vehicle.isMovingForward) {
    vehicle.xPosition += Math.round(Math.cos(radians) * 10) / 10;
    vehicle.yPosition += Math.round(Math.sin(radians) * 10) / 10;
  }

  if (vehicle.isMovingBackward) {
    vehicle.xPosition -= Math.round(Math.cos(radians) * 10) / 10;
    vehicle.yPosition -= Math.round(Math.sin(radians) * 10) / 10;
  }

  return vehicle;
}
