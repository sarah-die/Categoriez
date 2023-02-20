import Grid2 from "@mui/material/Unstable_Grid2";
import { useGameContext } from "../../Context";
import { Button, Typography } from "@mui/material";

export default function StartGame() {
  const ctx = useGameContext();
  return (
    <Grid2
      container
      xs={12}
      m={{ xs: 2, md: 9 }}
      p={4}
      sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      flexDirection={"column"}
      // flexWrap={"wrap"}
    >
      <Typography color={"inherit"} variant={"body1"} my={1}>
        The first thing you will see are your assigned categoriez. You'll see
        them in the following order:
      </Typography>
      <Grid2 xs={9} sm={8} md={4}>
        {ctx.currentPlayers.map((p, i) => {
          return (
            <Typography
              key={i}
              my={3}
              border={1}
              borderColor={"black"}
              borderRadius={2}
              p={1}
            >
              Nr. {i + 1}: {p}
            </Typography>
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

      <Button
        variant={"contained"}
        size={"large"}
        sx={{ height: 50, fontSize: 22, my: 1, color: "black" }}
        onClick={() => ctx.setGameStatus("hiddenCategory")}
      >
        Let's start
      </Button>
    </Grid2>
  );
}
