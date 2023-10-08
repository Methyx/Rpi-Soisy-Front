import { useState, createContext } from "react";

// style
import "../style/solitaire.css";

// components
import GameZone from "../components/GameZone";
import GameHeader from "../components/GameHeader";

// context
export const GameContext = createContext(null);

function Solitaire() {
  // const [initDeck, initColumns] = initGame();
  const [deck, setDeck] = useState([]);
  const [columns, setColumns] = useState([]);
  const [stacks, setStacks] = useState([[], [], [], []]);
  const [rejected, setRejected] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  return (
    <div className="solitaire-card-game">
      <GameContext.Provider
        value={{
          deck: deck,
          setDeck: setDeck,
          columns: columns,
          setColumns: setColumns,
          stacks: stacks,
          setStacks: setStacks,
          rejected: rejected,
          setRejected: setRejected,
          gameWon: gameWon,
          setGameWon: setGameWon,
        }}
      >
        <br />
        <GameHeader />
        <GameZone />
      </GameContext.Provider>
    </div>
  );
}

export default Solitaire;
