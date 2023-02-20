import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, Typography } from "@mui/material";
import { useGameContext } from "../../Context";

export default function CreateWords() {
  const ctx = useGameContext();
  return (
    <Grid2
      container
      rowSpacing={1}
      xs={12}
      m={{ xs: 2, md: 9 }}
      p={4}
      sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      flexDirection={"column"}
    >
      <Typography color={"inherit"} variant={"body1"} my={1}>
        You now have time to create some krazy wordz. Click the button below
        when all players are finished.
      </Typography>
      <Grid2 container justifyContent={"center"}>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, my: 2, color: "black" }}
          onClick={() => ctx.setGameStatus("reveal")}
        >
          Reveal categoriez
        </Button>
      </Grid2>
    </Grid2>
  );
}
