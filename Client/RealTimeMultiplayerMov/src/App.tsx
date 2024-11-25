import "./App.css";
import GameServerContextProvider from "./GameServerContextProvider";
import PlayerControls from "./PlayerControls";
import Vehicle from "./Vehicle";

function App() {

  return (
    <>
      <GameServerContextProvider>
        <Vehicle></Vehicle>
        <PlayerControls></PlayerControls>
      </GameServerContextProvider>
    </>
  );
}

export default App;
