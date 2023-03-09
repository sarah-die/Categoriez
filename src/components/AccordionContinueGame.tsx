import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useGameContext } from "../Context";

/** This accordion informs the player about a running game and gives the possibility to continue it. */
export const AccordionContinueGame = (props: {
  expanded: boolean;
  onChange: AccordionProps["onChange"];
}) => {
  const ctx = useGameContext();

  return (
    <Accordion sx={{ backgroundColor: "primary.dark" }} {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant={"h4"}>Spiel fortsetzen</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant={"body1"} sx={{ mb: 3 }}>
          Euer Spiel läuft noch. Möchtet ihr weiterspielen?
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <Grid2 container>
          <Button
            variant={"contained"}
            size={"large"}
            sx={{ height: 50, fontSize: 22, my: 3, color: "black" }}
            component={Link}
            to={"/inGame"}
          >
            Spiel fortsetzen
          </Button>
          <Button
            variant={"contained"}
            size={"large"}
            sx={{ height: 50, fontSize: 22, m: 3, color: "black" }}
            component={Link}
            to={"/"}
            onClick={() => {
              ctx.setGameStatus("noCurrentGame");
            }}
          >
            Kein Interesse
          </Button>
        </Grid2>
      </AccordionActions>
    </Accordion>
  );
};
