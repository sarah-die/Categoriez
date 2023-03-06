import Grid2 from "@mui/material/Unstable_Grid2";
import { useGameContext } from "../../Context";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

type CatStatus = "hidden" | "shown";
let cur: number = 0;

/** This component reveals each players' category. */
export default function ShowCategory() {
  const [catStatus, setCatStatus] = useState<CatStatus>("hidden");

  const nextPlayer = (next: CatStatus) => {
    if (next === "shown") {
      setCatStatus("shown");
    } else {
      setCatStatus("hidden");
      cur++;
    }
  };

  const props = { nextPlayer, cur };
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
      {catStatus === "hidden" ? <Hidden {...props} /> : <Shown {...props} />}
    </Grid2>
  );
}

function Hidden(props: { nextPlayer: (next: CatStatus) => void; cur: number }) {
  const ctx = useGameContext();
  return (
    <Grid2 container flexDirection={"column"}>
      <Typography color={"inherit"} variant={"body1"} my={1}>
        Hey {ctx.currentPlayers[props.cur]}, bist du bereit für deine Kategorie?
      </Typography>
      <Grid2 container justifyContent={"center"}>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, my: 1, color: "black" }}
          onClick={() => props.nextPlayer("shown")}
        >
          Kategorie anzeigen
        </Button>
      </Grid2>
    </Grid2>
  );
}

function Shown(props: { nextPlayer: (next: CatStatus) => void; cur: number }) {
  const ctx = useGameContext();
  const changeGameStatus = () => {
    cur = 0;
    ctx.setInGameStatus("createWords");
  };
  return (
    <Grid2 container flexDirection={"column"}>
      <Typography color={"inherit"} variant={"body1"} my={1}>
        Deine Category ist:
      </Typography>
      <Typography color={"inherit"} variant={"body2"} my={1}>
        {ctx.assignedCategoriez[props.cur]}
      </Typography>
      {props.cur === ctx.currentPlayers.length - 1 ? (
        <></>
      ) : (
        <Typography color={"inherit"} variant={"body1"} my={1}>
          Drücke hier, um die Runde an den nächsten Spieler weiterzugeben.
        </Typography>
      )}
      <Grid2 container justifyContent={"center"}>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, my: 1, color: "black" }}
          onClick={() =>
            props.cur === ctx.currentPlayers.length - 1
              ? changeGameStatus()
              : props.nextPlayer("hidden")
          }
        >
          {props.cur === ctx.currentPlayers.length - 1
            ? "Let's create some Krazy Wordz"
            : "Nächster Spieler"}
        </Button>
      </Grid2>
    </Grid2>
  );
}
