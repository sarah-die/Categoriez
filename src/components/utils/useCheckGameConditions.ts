import { useCallback } from "react";
import { useGameContext } from "../../Context";

/** Functions checks all conditions that need to be fulfilled before players can start a new game. **/
export const useCheckGameConditions = () => {
  const ctx = useGameContext();
  const { currentPlayers, setSnackbarMessage, setSnackbarOpen } = ctx;

  const checkForNameDuplicates = useCallback(() => {
    const array: string[] = currentPlayers
      .filter((p) => p !== "")
      .map((p) => p.toLowerCase());

    const setFromArray = new Set(array);
    if (array.length !== setFromArray.size) {
      setSnackbarMessage(
        "Bitte stellt sicher, dass sich die Spielernamen voneinander unterscheiden."
      );
      setSnackbarOpen(true);
      return false;
    } else {
      return true;
    }
  }, [currentPlayers, setSnackbarOpen, setSnackbarMessage]);

  const checkForEmptyNameFields = useCallback(() => {
    if (currentPlayers.some((p) => p === "")) {
      setSnackbarMessage("Bitte tragt für jeden Spieler einen Namen ein.");
      setSnackbarOpen(true);
      return false;
    } else if (currentPlayers.some((p) => p === " ")) {
      setSnackbarMessage(
        "Bitte stellt sicher, dass jeder Spielername mindestens ein Schriftzeichen enthält."
      );
      setSnackbarOpen(true);
    } else {
      return true;
    }
  }, [currentPlayers, setSnackbarOpen, setSnackbarMessage]);

  const checkAmountOfCategoriez = () => {
    const numberOfCategoriez: number = ctx.chosenCollections
      .map(
        (colID) =>
          ctx.collections.find((col) => col.id === colID)!.categoriez.length
      )
      .reduce((acc, cur) => acc + cur);
    const numberOfPlayers: number = ctx.currentPlayers.length;
    const numberOfRounds: number = ctx.roundStatus.length;
    let necessaryNumberOfCategoriez: number;

    if (numberOfPlayers <= 6) {
      necessaryNumberOfCategoriez = 6;
    } else if (numberOfPlayers <= 7) {
      necessaryNumberOfCategoriez = 7;
    } else {
      necessaryNumberOfCategoriez = 8;
    }

    if (numberOfCategoriez < necessaryNumberOfCategoriez * numberOfRounds) {
      setSnackbarMessage(
        "Die Kollektion, die ihr gewählt habt, enthält leider nicht genug Categoriez. Wählt eine andere, eine Weitere dazu oder reduziert die Anzahl an Spielern oder Runden."
      );
      ctx.setSnackbarOpen(true);
      return false;
    } else {
      return true;
    }
  };

  const checkGameConditions = () =>
    checkForNameDuplicates() &&
    checkForEmptyNameFields() &&
    checkAmountOfCategoriez();

  return { checkGameConditions };
};
