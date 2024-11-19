export default interface IPlayerVehicle {
    id : number,
    xPosition : number,
    yPosition : number,
    Angle : number,
    isMovingForward : Boolean,
    isTurningRight : Boolean,
    isTurningLeft : Boolean,
    isAccelerating : Boolean,
    isDecelerating : Boolean,
}