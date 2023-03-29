import React, { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { presetCollections } from "./components/presetCollections";
import { useSaveDataToSessionStorage } from "./components/utils/useSaveDataToSessionStorage";

// globally available props
export type contextType = {
  gameStatus: GameStatus;
  setGameStatus: (g: GameStatus) => void;
  inGameStatus: InGameStatus;
  setInGameStatus: (i: InGameStatus) => void;
  roundStatus: number[];
  setRoundStatus: (r: number[]) => void;
  currentPlayers: string[];
  setPlayers: (p: string[]) => void;
  collections: Collection[];
  setCollections: (c: Collection[]) => void;
  saveCategoryToCollection: (colName: string, newCat: string) => void;
  snackbarStatus: boolean;
  setSnackbarOpen: (s: boolean) => void;
  snackbarMessage: string;
  setSnackbarMessage: (m: string) => void;
  assignedCategoriez: string[];
  setAssignedCategoriez: (c: string[]) => void;
  categoriezWhitelist: number[];
  setCategoriezWhitelist: (w: number[]) => void;
  chosenCollections: Collection["id"][];
  setChosenCollections: (c: Collection["id"][]) => void;
};

// new context with initial values
const Context = createContext<contextType>(null as unknown as contextType);

export type InGameStatus =
  | "start"
  | "beginOfNewRound"
  | "hiddenCategory"
  | "createWords"
  | "reveal";
export type GameStatus = "ongoing" | "noCurrentGame";
export type Collection = { name: string; categoriez: string[]; id: string };

export const initial: Partial<contextType> = {
  gameStatus: "noCurrentGame",
  inGameStatus: "start",
  roundStatus: new Array(6).fill(0),
  currentPlayers: new Array(3).fill(""),
  snackbarMessage: "Error",
  assignedCategoriez: [],
  categoriezWhitelist: [],
  chosenCollections: [presetCollections[0].id],
};

export const GameProvider = (props: { children: React.ReactNode }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    JSON.parse(
      sessionStorage.getItem("gameStatus") || JSON.stringify(initial.gameStatus)
    )
  );
  const [inGameStatus, setInGameStatus] = useState<InGameStatus>(
    JSON.parse(
      sessionStorage.getItem("inGameStatus") ||
        JSON.stringify(initial.inGameStatus)
    )
  );
  const [roundStatus, setRoundStatus] = useState<number[]>(
    JSON.parse(
      sessionStorage.getItem("roundStatus") ||
        JSON.stringify(initial.roundStatus)
    )
  );
  const [currentPlayers, setPlayers] = useState<string[]>(
    JSON.parse(
      sessionStorage.getItem("currentPlayers") ||
        JSON.stringify(initial.currentPlayers)
    )
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
  const [snackbarMessage, setSnackbarMessage] = useState<string>(
    initial.snackbarMessage!
  );

  const [assignedCategoriez, setAssignedCategoriez] = useState<string[]>(
    JSON.parse(
      sessionStorage.getItem("assignedCategoriez") ||
        JSON.stringify(initial.assignedCategoriez)
    )
  );
  const [categoriezWhitelist, setCategoriezWhitelist] = useState<number[]>(
    JSON.parse(
      sessionStorage.getItem("categoriezWhitelist") ||
        JSON.stringify(initial.categoriezWhitelist)
    )
  );
  const [chosenCollection, setChosenCollection] = useState<Collection["id"][]>(
    JSON.parse(
      sessionStorage.getItem("chosenCollection") ||
        JSON.stringify(initial.chosenCollections!)
    )
  );

  // useEffect to prevent loss of game data when user reloads the page
  useSaveDataToSessionStorage("gameStatus", gameStatus);
  useSaveDataToSessionStorage("currentPlayers", currentPlayers);
  useSaveDataToSessionStorage("chosenCollections", chosenCollection);
  useSaveDataToSessionStorage("inGameStatus", inGameStatus);
  useSaveDataToSessionStorage("roundStatus", roundStatus);
  useSaveDataToSessionStorage("assignedCategoriez", assignedCategoriez);
  useSaveDataToSessionStorage("categoriezWhitelist", categoriezWhitelist);

  return (
    <Context.Provider
      value={{
        gameStatus,
        setGameStatus,
        inGameStatus,
        setInGameStatus,
        roundStatus,
        setRoundStatus,
        currentPlayers,
        setPlayers,
        collections,
        setCollections,
        saveCategoryToCollection,
        snackbarStatus,
        setSnackbarOpen,
        snackbarMessage,
        setSnackbarMessage,
        assignedCategoriez,
        setAssignedCategoriez,
        categoriezWhitelist,
        setCategoriezWhitelist,
        chosenCollections: chosenCollection,
        setChosenCollections: setChosenCollection,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useGameContext = () => useContext(Context);
