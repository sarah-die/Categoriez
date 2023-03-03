import { initial, useGameContext } from "../../Context";

export const resetGame = () => {
  const ctx = useGameContext();
  ctx.setGameStatus(initial.gameStatus!);
  ctx.setInGameStatus(initial.inGameStatus!);
  ctx.setRoundStatus(initial.roundStatus!);
  ctx.setAssignedCategoriez(initial.assignedCategoriez!);
  ctx.setCategoriezWhitelist(initial.categoriezWhitelist!);
  ctx.setChosenCollection(initial.chosenCollection!);
};
