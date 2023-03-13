import { initial, useGameContext } from "../../Context";
import { useCallback } from "react";

// Hooks können nicht in (TS)-Funktionen verwendet werden.
// Aber es können eigene Hooks erstellt werden (beginnend mit use).
// Hookifite Funktionen brauchen einen return mit useCallback und ein Dependency-Array.
export const useResetGame = () => {
  const ctx = useGameContext();
  return useCallback(() => {
    ctx.setGameStatus(initial.gameStatus!);
    ctx.setInGameStatus(initial.inGameStatus!);
    ctx.setRoundStatus(initial.roundStatus!);
    ctx.setAssignedCategoriez(initial.assignedCategoriez!);
    ctx.setCategoriezWhitelist(initial.categoriezWhitelist!);
    ctx.setChosenCollections(initial.chosenCollections!);
  }, [ctx]);
};
