import { useState } from "react";
import "./App.css";
import GameClientContext from "./GameClientContext";
import GameServerContext from "./GameServerContext";
import IPlayerVehicle from "./IPlayerVehicle";

export type GameState = {
  type: string,
  state: IPlayerVehicle[]
}
function App() {

  const [isServer, setIsServer] = useState<Boolean | undefined>(undefined);

  return (
    <>
    <div >
      <div>What do you want to be?</div>
      <div>
        <button onClick={() => setIsServer(true)}>
          Server
        </button>
        <button onClick={() => setIsServer(false)}>
          Client
        </button>


        {

          isServer == undefined ? <div>Click a button</div> : isServer ? <GameClientContext/> : <GameServerContext/>
        }

      </div>
    </div>
    </>
  );
}

export default App;
