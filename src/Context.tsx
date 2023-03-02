import React, { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import {presetCollections} from "./components/presetCollections";

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
  saveCategoryToCollection: (colName: string, newCat: string) => void;
  snackbarStatus: boolean;
  setSnackbarOpen: (s: boolean) => void;
  assignedCategoriez: string[];
  setAssignedCategoriez: (c: string[]) => void;
  chosenCollection: Collection["id"];
  setChosenCollection: (c: Collection["id"]) => void;
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
  saveCategoryToCollection: () => {},
  snackbarStatus: false,
  setSnackbarOpen: () => {},
  assignedCategoriez: [],
  setAssignedCategoriez: () => {},
  chosenCollection: presetCollections[0].id,
  setChosenCollection: () => {},
});

export type InGameStatus =
  | "start"
  | "hiddenCategory"
  | "createWords"
  | "reveal";
export type GameStatus = "ongoing" | "noCurrentGame";
export type Collection = { name: string; categoriez: string[]; id: string };

export const GameProvider = (props: { children: React.ReactNode }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>("noCurrentGame");
  const [inGameStatus, setInGameStatus] = useState<InGameStatus>("start");
  const [currentPlayers, setPlayers] = useState<string[]>(
    new Array(3).fill("")
  );
  const [collections, setCollections] = useState<Collection[]>(
    JSON.parse(
      localStorage.getItem("collections") || JSON.stringify(presetCollections)
    )
  );

  const saveCategoryToCollection = (colName: string, newCat: string) => {
    const existingColIndex = collections.findIndex((c) => c.name === colName);
    let newCollections;
    if (existingColIndex >= 0) {
      const existingCol = collections[existingColIndex];
      const newCol = {
        ...existingCol,
        categoriez: [...existingCol.categoriez, newCat],
      };
      newCollections = [
        ...collections.slice(0, existingColIndex),
        newCol,
        ...collections.slice(existingColIndex + 1),
      ];
    } else {
      newCollections = [
        ...collections,
        { name: colName, categoriez: [newCat], id: nanoid() },
      ];
    }
    setCollections(newCollections);
    localStorage.setItem("collections", JSON.stringify(newCollections));
  };

  const [snackbarStatus, setSnackbarOpen] = useState<boolean>(false);

  const [assignedCategoriez, setAssignedCategoriez] = useState<string[]>([]);

  const [chosenCollection, setChosenCollection] = useState<Collection["id"]>(
    presetCollections[0].id
  );

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
        saveCategoryToCollection,
        snackbarStatus,
        setSnackbarOpen,
        assignedCategoriez,
        setAssignedCategoriez,
        chosenCollection,
        setChosenCollection,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useGameContext = () => useContext(Context);
