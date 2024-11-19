import IPlayerVehicle from "./IPlayerVehicle";

export default function GameServerContext() {
    
    const vehicles : IPlayerVehicle[] = []

    const updateVehicle = (
        id: number,
        vehicleAction:
           | "moveForward"    // 'w' pressed
           | "moveBackward"   // 's' pressed
           | "turnLeft"       // 'a' pressed
           | "turnRight"      // 'd' pressed
           | "stopForwards"   // when user lets go of 'w' key
           | "stopBackwards"  // when user lets go of 's' key
           | "stopLeft"       // when user lets go of 'a' key
           | "stopRight"      // when user lets go of 'd' key
     ) => {
        let vehicleToUpdate = vehicles.find(vehicle => vehicle.id == id);

        switch (vehicleAction) {
            case "moveForward":
              vehicleToUpdate?.isMovingForward = true
              break;
            
            default:
                throw "Invalid Vehicle Action";
        }
        // return adjusted vehicle instance
     }
}