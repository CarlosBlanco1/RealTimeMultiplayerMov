// sum.test.js
import { expect, test } from "vitest";
import moveVehicle from "./vehicleUtils";
import IPlayerVehicle from "./IPlayerVehicle";

test("move straight in x direction", () => {
  const startingVehicle: IPlayerVehicle = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    Angle: 0,
    isMovingForward: true,
    isMovingBackward: false,
    isTurningRight: false,
    isTurningLeft: false,
    isAccelerating: true,
    isDecelerating: false,
  };

  const finalVehicle: IPlayerVehicle = {
    id: 1,
    xPosition: 1,
    yPosition: 0,
    Angle: 0,
    isMovingForward: true,
    isMovingBackward: false,
    isTurningRight: false,
    isTurningLeft: false,
    isAccelerating: true,
    isDecelerating: false,
  };

  expect(moveVehicle(startingVehicle)).toEqual(finalVehicle);
});

test("move straight in y direction", () => {
  const startingVehicle: IPlayerVehicle = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    Angle: 90,
    isMovingForward: true,
    isMovingBackward: false,
    isTurningRight: false,
    isTurningLeft: false,
    isAccelerating: true,
    isDecelerating: false,
  };

  const finalVehicle: IPlayerVehicle = {
    id: 1,
    xPosition: 0,
    yPosition: 1,
    Angle: 90,
    isMovingForward: true,
    isMovingBackward: false,
    isTurningRight: false,
    isTurningLeft: false,
    isAccelerating: true,
    isDecelerating: false,
  };

  expect(moveVehicle(startingVehicle)).toEqual(finalVehicle);
});

test("turn left", () => {
    const startingVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: 0,
      isMovingForward: false,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: true,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    const finalVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: 45,
      isMovingForward: false,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: true,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    expect(moveVehicle(startingVehicle)).toEqual(finalVehicle);
  });

  test("turn right", () => {
    const startingVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: 0,
      isMovingForward: false,
      isMovingBackward: false,
      isTurningRight: true,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    const finalVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: -45,
      isMovingForward: false,
      isMovingBackward: false,
      isTurningRight: true,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    expect(moveVehicle(startingVehicle)).toEqual(finalVehicle);
  });

  test("user doesn't turn if they don't want to", () => {
    const startingVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: 0,
      isMovingForward: false,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    const finalVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: 0,
      isMovingForward: false,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    expect(moveVehicle(startingVehicle)).toEqual(finalVehicle);
  });

  test("move on 225 degree angle", () => {
    const startingVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: 225,
      isMovingForward: true,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    const finalVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: -0.7,
      yPosition: -0.7,
      Angle: 225,
      isMovingForward: true,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    expect(moveVehicle(startingVehicle)).toEqual(finalVehicle);
  });

  test("move on -45 degree angle", () => {
    const startingVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: -45,
      isMovingForward: true,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    const finalVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0.7,
      yPosition: -0.7,
      Angle: -45,
      isMovingForward: true,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    expect(moveVehicle(startingVehicle)).toEqual(finalVehicle);
  });

  test("move on 45 degree angle", () => {
    const startingVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0,
      yPosition: 0,
      Angle: 45,
      isMovingForward: true,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    const finalVehicle: IPlayerVehicle = {
      id: 1,
      xPosition: 0.7,
      yPosition: 0.7,
      Angle: 45,
      isMovingForward: true,
      isMovingBackward: false,
      isTurningRight: false,
      isTurningLeft: false,
      isAccelerating: true,
      isDecelerating: false,
    };
  
    expect(moveVehicle(startingVehicle)).toEqual(finalVehicle);
  });