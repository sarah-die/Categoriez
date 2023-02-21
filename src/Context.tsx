import React, { createContext, useContext, useState } from "react";

// globally available props
type contextType = {
  currentGameStatus: GameStatus;
  setGameStatus: (g: GameStatus) => void;
  currentPlayers: string[];
  setPlayers: (p: string[]) => void;
  collections: Collection[];
  setCollections: (c: Collection[]) => void;
};

// new context with initial values
const Context = createContext<contextType>({
  currentGameStatus: "start",
  setGameStatus: () => {},
  currentPlayers: ["player1", "player2", "player3"],
  setPlayers: () => {},
  collections: [],
  setCollections: () => {},
});

export type GameStatus = "start" | "hiddenCategory" | "createWords" | "reveal";
export type Collection = { name: string; categoriez: string[] };

export const GameProvider = (props: { children: React.ReactNode }) => {
  const [currentGameStatus, setGameStatus] = useState<GameStatus>("start");
  const [currentPlayers, setPlayers] = useState<string[]>(new Array(3).fill(""));
  const [collections, setCollections] = useState<Collection[]>([
    { name: "test", categoriez: ["1", "2"] }, { name: "test2", categoriez: ["1", "2"] }
  ]);

  return (
    <Context.Provider
      value={{
        currentGameStatus,
        setGameStatus,
        currentPlayers,
        setPlayers,
        collections,
        setCollections,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useGameContext = () => useContext(Context);
