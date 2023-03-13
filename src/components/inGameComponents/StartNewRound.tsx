import { useGameContext } from "../../Context";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, Typography } from "@mui/material";

export default function StartNewRound() {
  const ctx = useGameContext();

  const assignCategoriez = () => {
    const newAssignedCategoriez = new Array(ctx.currentPlayers.length);

    const allCat: string[] = ctx.chosenCollections.flatMap(
      (colID) => ctx.collections.find((col) => col.id === colID)!.categoriez
    );

    const whiteList: number[] = [...ctx.categoriezWhitelist];
    ctx.currentPlayers.forEach((p, i) => {
      const random = Math.floor(Math.random() * whiteList.length);
      newAssignedCategoriez[i] = allCat[whiteList[random]];
      whiteList.splice(random, 1);
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
        Ihr seid nun in Runde {ctx.roundStatus.indexOf(0) + 1}. Wenn ihr bereit
        für eure neuen Kategorien seid, startet die neue Runde mit Klick auf den
        Button.
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
