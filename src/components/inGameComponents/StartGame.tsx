import Grid2 from "@mui/material/Unstable_Grid2";
import { useGameContext } from "../../Context";
import { Button, Typography } from "@mui/material";

/** This component gives a quick overview about the following in-game-steps and the order of the players. */
export default function StartGame() {
  const ctx = useGameContext();

  const assignCategoriez = () => {
    const newAssignedCategoriez = new Array(ctx.currentPlayers.length);
    const chosenColIndex: number = ctx.collections.findIndex(
      (c) => c.id === ctx.chosenCollection
    );
    const whiteList: number[] = ctx.collections[chosenColIndex].categoriez.map(
      (_, i) => i
    );
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
        Welcome to round 1!
      </Typography>
      <Typography color={"inherit"} variant={"body1"} my={1}>
        The first thing you will see are your assigned categoriez. You'll see
        them in the following order:
      </Typography>
      <Grid2 container flexDirection={"row"} spacing={5}>
        {ctx.currentPlayers.map((p, i) => {
          return (
            <Grid2 my={1}>
              <Typography key={i} p={1}>
                Nr. {i + 1}:
              </Typography>
              <Typography
                key={i}
                border={1}
                borderColor={"black"}
                borderRadius={2}
                px={2}
                py={1}
              >
                {p}
              </Typography>
            </Grid2>
          );
        })}
      </Grid2>
      <Typography color={"inherit"} variant={"body1"} my={1}>
        Make sure that only the player whose name is displayed sees the
        category.
      </Typography>
      <Typography color={"inherit"} variant={"body1"} my={1}>
        Press the button when you are ready for your categoriez!
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
