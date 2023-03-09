import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, Typography } from "@mui/material";
import { useGameContext } from "../../Context";
import { useResetGame } from "../utils/ResetGame";

/** This component displays all categories from the current game. */
export default function Reveal() {
  const ctx = useGameContext();
  const resetGame = useResetGame();

  const nextRound = () => {
    const indexOf0: number = ctx.roundStatus.indexOf(0);
    const newRoundStatus = [...ctx.roundStatus];
    newRoundStatus.splice(indexOf0, 1, 1);
    ctx.setRoundStatus(newRoundStatus);
    ctx.setInGameStatus("beginOfNewRound");
  };

  return (
    <>
      <Grid2
        container
        xs={12}
        m={{ xs: 2, md: 9 }}
        p={4}
        sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
        flexDirection={"column"}
      >
        <Typography color={"inherit"} variant={"body1"} my={1}>
          Hier sind eure Categoriez. Nehmt euch nun die Zeit zu erraten wer
          welche Category gelegt hat. Wertet anschließend, vom Startspieler dieser Runde (
          {ctx.currentPlayers[ctx.roundStatus.indexOf(0) % ctx.currentPlayers.length]}) beginnend aus,
          ob ihr richtig getippt habt oder nicht. Verteilt entsprechend Punkte
          mit Hilfe der Punkte-Chips.
        </Typography>
        <Grid2 container flexDirection={"row"} spacing={3}>
          {ctx.assignedCategoriez.map((c, index) => {
            return (
              <Grid2 sm={6} md={4} lg={3} xl={2}>
                <Typography p={1}>Nr. {index + 1}</Typography>
                <Typography
                  border={1}
                  borderColor={"black"}
                  borderRadius={2}
                  px={2}
                  py={1}
                >
                  {c}
                </Typography>
              </Grid2>
            );
          })}
        </Grid2>
      </Grid2>
      <Grid2
        container
        xs={12}
        mx={{ xs: 2, md: 9 }}
        p={4}
        sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
        flexDirection={"column"}
      >
        <Typography color={"inherit"} variant={"body1"}>
          Alle Punkte verteilt?
        </Typography>
        <Grid2 container justifyContent={"center"}>
          {ctx.roundStatus.indexOf(0) === ctx.roundStatus.length - 1 ? (
            <Button
              variant={"contained"}
              size={"large"}
              sx={{ height: 50, fontSize: 22, my: 1, color: "black" }}
              onClick={resetGame}
            >
              Spiel beenden
            </Button>
          ) : (
            <Button
              variant={"contained"}
              size={"large"}
              sx={{ height: 50, fontSize: 22, my: 1, color: "black" }}
              onClick={nextRound}
            >
              Nächste Runde
            </Button>
          )}
        </Grid2>
      </Grid2>
    </>
  );
}
