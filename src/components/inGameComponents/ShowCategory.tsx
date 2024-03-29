import Grid2 from "@mui/material/Unstable_Grid2";
import { useGameContext } from "../../Context";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

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
    <Grid2>
      {catStatus === "hidden" ? <Hidden {...props} /> : <Shown {...props} />}
    </Grid2>
  );
}

function Hidden(props: { nextPlayer: (next: CatStatus) => void; cur: number }) {
  const ctx = useGameContext();
  return (
    <Grid2 container flexDirection={"column"}>
      <Grid2>
        <Typography color={"inherit"} variant={"body1"} my={1}>
          Hey {ctx.currentPlayers[props.cur]}, bist du bereit für deine
          Kategorie?
        </Typography>
      </Grid2>
      <Grid2 container justifyContent={"center"}>
        <Grid2>
          <Button
            variant={"contained"}
            size={"large"}
            sx={{ height: 50, fontSize: 22, my: 1 }}
            onClick={() => props.nextPlayer("shown")}
          >
            Kategorie anzeigen
          </Button>
        </Grid2>
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
    <Grid2 flexDirection={"column"}>
      <Typography color={"inherit"} variant={"body1"} my={1}>
        Deine Category ist:
      </Typography>
      <Box
        p={1}
        my={1}
        border={2}
        borderColor={"#869bc7"}
        borderRadius={2}
        // component="span"
        display={"inline-block"}
      >
        <Typography color={"inherit"} variant={"body2"}>
          {ctx.assignedCategoriez[props.cur]}
        </Typography>
      </Box>

      {/*<div style={{ borderRadius: 2, border: 2, borderColor: "black", display: "inline" }}>*/}
      {/*  <p>{ctx.assignedCategoriez[props.cur]}</p>*/}
      {/*</div>*/}

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
          sx={{ height: 50, fontSize: 22, my: 1 }}
          onClick={() =>
            props.cur === ctx.currentPlayers.length - 1
              ? changeGameStatus()
              : props.nextPlayer("hidden")
          }
        >
          {props.cur === ctx.currentPlayers.length - 1
            ? "Let's go"
            : "Nächster Spieler"}
        </Button>
      </Grid2>
    </Grid2>
  );
}
