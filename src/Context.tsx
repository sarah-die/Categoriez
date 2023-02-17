import React, {createContext, useContext, useState} from "react";

// globally available props
type contextType = {
  currentGameStatus: GameStatus;
  setGameStatus: (g: GameStatus) => void;
};

// new context with initial values
const Context = createContext<contextType>({
  currentGameStatus: "start",
  setGameStatus: () => {},
});

export type GameStatus = "start" | "hiddenCategory" | "createWords" | "reveal";

export const GameProvider = (props: { children: React.ReactNode }) => {
  const [currentGameStatus, setGameStatus] = useState<GameStatus>("start");

  return (
    <Context.Provider
      value={{
        currentGameStatus,
        setGameStatus,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useGameContext = () => useContext(Context);