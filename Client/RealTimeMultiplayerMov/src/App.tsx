import { useState } from "react";
import "./App.css";
import GameClientContext from "./GameClientContext";
import GameServerContext from "./GameServerContext";
import IPlayerVehicle from "./IPlayerVehicle";

export type GameState = {
  state: IPlayerVehicle[]
}

export type movementRequest = {
  vehicleId : number,
  action: string
}

function App() {

  const [isServer, setIsServer] = useState<Boolean | undefined>(undefined);

  return (
    <>
    <div >
      <div style={{color: 'black'}}>What do you want to be?</div>
      <div className="flex gap-5">
        <button onClick={() => setIsServer(true)}>
          Server
        </button>
        <button onClick={() => setIsServer(false)}>
          Client
        </button>

        {

          isServer == undefined ? <div style={{color: 'black'}}>Click a button</div> : isServer ? <GameServerContext></GameServerContext> : <GameClientContext></GameClientContext>
        }

      </div>
    </div>
    </>
  );
}

export default App;
