import React, { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

const presetCollections: Collection[] = [
  {
    name: "All",
    id: "preset-collecction-all",
    categoriez: [
      "cat1.1",
      "cat1.2",
      "cta1.3",
      "catloremsbnsid",
      "catloremsbnsid",
      "cat",
      "cat",
      "catloremsbnsid",
    ],
  },
  {
    name: "collection1",
    id: "preset-collecction1",
    categoriez: [
      "cat1.1",
      "cat1.2",
      "cta1.3",
      "cat4",
      "catloremsbnsid",
      "cat",
      "catloremsbnsid",
      "cat",
      "cat",
      "catloremsbnsid",
      "catloremsbnsid",
      "cat",
      "cat",
      "catloremsbnsid",
    ],
  },
  {
    name: "collection2",
    id: "preset-collecction2",
    categoriez: ["cat2.1", "catloremsbnsid.2", "cat", "cat", "cat", "cat"],
  },
  {
    name: "collection3",
    id: "preset-collecction3",
    categoriez: [
      "cat2.1",
      "cat2.2",
      "catloremsbnsid",
      "catloremsbnsid",
      "cat",
      "cat",
      "catloremsbnsid",
      "cat",
    ],
  },
  {
    name: "collection4",
    id: "preset-collecction4",
    categoriez: ["cat2.1", "catloremsbnsid.2", "cat", "cat"],
  },
];

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
