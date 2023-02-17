import React, { createContext, useContext, useState } from "react";

// globally available props
type contextType = {
  currentGameStatus: GameStatus;
  setGameStatus: (g: GameStatus) => void;
  currentPlayers: string[];
  setPlayers: (p: string[]) => void;
};

// new context with initial values
const Context = createContext<contextType>({
  currentGameStatus: "start",
  setGameStatus: () => {},
  currentPlayers: ["player1", "player2", "player3"],
  setPlayers: () => {},
});

export type GameStatus = "start" | "hiddenCategory" | "createWords" | "reveal";

export const GameProvider = (props: { children: React.ReactNode }) => {
  const [currentGameStatus, setGameStatus] = useState<GameStatus>("start");
  const [currentPlayers, setPlayers] = useState<string[]>(["player1", "player2", "player3"]);

  return (
    <Context.Provider
      value={{
        currentGameStatus,
        setGameStatus,
        currentPlayers,
        setPlayers,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useGameContext = () => useContext(Context);
