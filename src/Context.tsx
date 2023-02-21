import React, { createContext, useContext, useState } from "react";

// globally available props
type contextType = {
  gameStatus: GameStatus;
  setGameStatus: (g: GameStatus) => void;
  inGameStatus: InGameStatus;
  setInGameStatus: (i: InGameStatus) => void;
  currentPlayers: string[];
  setPlayers: (p: string[]) => void;
  collections: Collection[];
  setCollections: (c: Collection[]) => void;
};

// new context with initial values
const Context = createContext<contextType>({
  gameStatus: "noCurrentGame",
  setGameStatus: () => {},
  inGameStatus: "start",
  setInGameStatus: () => {},
  currentPlayers: ["player1", "player2", "player3"],
  setPlayers: () => {},
  collections: [],
  setCollections: () => {},
});

export type InGameStatus =
  | "start"
  | "hiddenCategory"
  | "createWords"
  | "reveal";
export type GameStatus = "ongoing" | "noCurrentGame";
export type Collection = { name: string; categoriez: string[] };

export const GameProvider = (props: { children: React.ReactNode }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>("noCurrentGame");
  const [inGameStatus, setInGameStatus] = useState<InGameStatus>("start");
  const [currentPlayers, setPlayers] = useState<string[]>(
    new Array(3).fill("")
  );
  const [collections, setCollections] = useState<Collection[]>([
    { name: "test", categoriez: ["1", "2"] },
    { name: "test2", categoriez: ["1", "2"] },
  ]);

  return (
    <Context.Provider
      value={{
        gameStatus: gameStatus,
        setGameStatus: setGameStatus,
        inGameStatus: inGameStatus,
        setInGameStatus: setInGameStatus,
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
