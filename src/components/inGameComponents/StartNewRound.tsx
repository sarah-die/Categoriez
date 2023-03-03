import { useGameContext } from "../../Context";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, Typography } from "@mui/material";

export default function StartNewRound() {
  const ctx = useGameContext();

  const assignCategoriez = () => {
    const newAssignedCategoriez = new Array(ctx.currentPlayers.length);
    const chosenColIndex: number = ctx.collections.findIndex(
      (c) => c.id === ctx.chosenCollection
    );
    const whiteList: number[] = [...ctx.categoriezWhitelist];
    ctx.currentPlayers.forEach((p, i) => {
      const random = Math.floor(Math.random() * whiteList.length);
      whiteList.splice(random, 1);
      newAssignedCategoriez[i] =
        ctx.collections[chosenColIndex].categoriez[random];
    });
    ctx.setCategoriezWhitelist(whiteList);
    ctx.setAssignedCategoriez(newAssignedCategoriez);
    ctx.setInGameStatus("hiddenCategory");
  };

  return (
    <Grid2
      container
      xs={12}
      m={{ xs: 2, md: 9 }}
      p={4}
      sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      flexDirection={"column"}
    >
      <Typography color={"inherit"} variant={"body1"} my={1}>
        Ihr seid nun in Runde {ctx.roundStatus.indexOf(0) + 1}. Der neue
        Startspieler ist {}.
      </Typography>
      <Typography color={"inherit"} variant={"body1"} my={1}>
        Startet die nächste Runde mit Klick auf den Button.
      </Typography>
      <Grid2 container justifyContent={"center"}>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, my: 1, color: "black" }}
          onClick={() => assignCategoriez()}
        >
          Let's go
        </Button>
      </Grid2>
    </Grid2>
  );
}
