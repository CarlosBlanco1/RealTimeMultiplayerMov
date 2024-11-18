// sum.test.js
import { expect, test } from 'vitest'
import moveVehicle from './vehicleUtils'
import IPlayerVehicle from './IPlayerVehicle'


test('move straight', () => {
    const startingVehicle : IPlayerVehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        Angle: 0,
        isMovingForward: true,
        isTurningRight: false,
        isTurningLeft: false,
        isAccelerating: true,
        isDecelerating: false
    }

    const finalVehicle : IPlayerVehicle = {
        id: 1,
        xPosition: 1,
        yPosition: 0,
        Angle: 0,
        isMovingForward: true,
        isTurningRight: false,
        isTurningLeft: false,
        isAccelerating: true,
        isDecelerating: false
    }

  expect(moveVehicle(startingVehicle)).toBe(finalVehicle)
})