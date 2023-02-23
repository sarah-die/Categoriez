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

/** This accordion informs the player about a running game and gives the possibility to continue it. */
export const AccordionContinueGame = (props: {
  expanded: boolean;
  onChange: AccordionProps["onChange"];
}) => {
  return (
    <Accordion sx={{ backgroundColor: "primary.dark" }} {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant={"h4"}>Continue Game</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant={"body1"} sx={{ mb: 3 }}>
          You still have an ongoing game. Do you want to continue?
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, m: 3, color: "black" }}
          component={Link}
          to={"/inGame"}
        >
          Continue game
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
