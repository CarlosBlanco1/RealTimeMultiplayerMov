import { useEffect, useState } from "react";
import { GameState } from "./App";
import IPlayerVehicle from "./IPlayerVehicle";
import Vehicle from "./Vehicle";
import PlayerControls from "./PlayerControls";
import { useVehicleContext } from "./useGameServerContext";

export default function GameServerContext () {
    const gameContext = useVehicleContext();
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [messages, setMessages] = useState<string[]>([]);
 
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5165/ws");
    setSocket(newSocket);
    newSocket.addEventListener("open", () => {
      console.log("connected to server");
      newSocket.send("Hello Server!");
    });
 
    newSocket.addEventListener("message", (event) => {
      console.log("revieved event", event.data);

      let newState : GameState = {
        type: JSON.parse(event.data)["type"],
        state: JSON.parse(event.data)["state"] as IPlayerVehicle[]
      } 

      gameContext.setVehicles(newState.state);
      setMessages(oldMessages => [...oldMessages, event.data]);
    })
  }, []);
  return (
    <>
    {gameContext?.vehicles?.length >= 2 && (
        <>
          <Vehicle id={gameContext.vehicles[0].id}></Vehicle>
          {/* <Vehicle id={gameContext.vehicles[1].id}></Vehicle> */}
          <PlayerControls
            upKey="w"
            downKey="s"
            leftKey="a"
            rightKey="d"
            id={gameContext.vehicles[0].id}
          ></PlayerControls>
          {/* <PlayerControls
            upKey="i"
            downKey="k"
            leftKey="j"
            rightKey="l"
            id={gameContext.vehicles[1].id}
          ></PlayerControls> */}
        </>
      )}
      <h1>WebSocket Chat</h1>
      <button
        onClick={() => {
          if (!socket) {
            console.log("socket not found");
            return;
          }
          let state: GameState = {
            type: "gameState",
            state: gameContext.vehicles
          };
          socket?.send(JSON.stringify(state))
        }}
        disabled={!socket}
      >
        {" "}
        Send message
      </button>
      <div style={{color: 'black'}}>
        {messages.map((message, i) => (
          <div key={i.toString()}>{message}</div>
        ))}
      </div>
    </>
  )
}