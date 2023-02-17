import Grid2 from "@mui/material/Unstable_Grid2";
import { useGameContext } from "../../Context";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

type CatStatus = "hidden" | "shown";
const cur = 0;

export default function ShowCategory() {
  const ctx = useGameContext();
  const [catStatus, setCatStatus] = useState<CatStatus>("hidden");
  const props = { catStatus, setCatStatus };
  return (
    <Grid2
      container
      rowSpacing={1}
      xs={12}
      m={{ xs: 2, md: 9 }}
      sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      flexDirection={"column"}
    >
      {catStatus === "hidden" ? <Hidden {...props} /> : <Shown {...props} />}
    </Grid2>
  );
}

function Hidden(props: {
  catStatus: CatStatus;
  setCatStatus: (status: CatStatus) => void;
}) {
  const ctx = useGameContext();
  // ToDo ctx
  return (
    <Grid2>
      <Grid2>
        <Typography>
          Hey {ctx.currentPlayers[cur]}, are you ready for your catgeory?
        </Typography>
      </Grid2>
      <Grid2>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, mx: 2, my: 1, color: "black" }}
          onClick={() => props.setCatStatus("shown")}
        >
          Show category!
        </Button>
      </Grid2>
    </Grid2>
  );
}

function Shown(props: {
  catStatus: CatStatus;
  setCatStatus: (status: CatStatus) => void;
}) {
  const ctx = useGameContext();
  // ToDo ctx
  return (
    <Grid2>
      <Grid2>
        <Typography> Your Category:</Typography>
      </Grid2>
      <Grid2>
        <Typography>Tap here to pass the turn onto the next player.</Typography>
      </Grid2>
      <Grid2>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, mx: 2, my: 1, color: "black" }}
          onClick={() => props.setCatStatus("hidden")}
          // ToDo cur++
        >
          Next Player!
        </Button>
      </Grid2>
    </Grid2>
  );
}
