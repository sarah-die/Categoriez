import Grid2 from "@mui/material/Unstable_Grid2";
import { AccordionNewGame } from "./AccordionNewGame";
import { AccordionNewCategory } from "./AccordionNewCategory";
import React, { useState } from "react";
import { useGameContext } from "../Context";
import { AccordionContinueGame } from "./AccordionContinueGame";

/** Component that includes three Accordions (Continue Game, Start new Game, Add new Category). Only one Accordion is open at a time. */
export default function ControlledAccordion() {
  const ctx = useGameContext();
  const [expanded, setExpanded] = useState<String | false>(false);
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Grid2 container rowGap={{ xs: 2, md: 4 }}>
      {ctx.gameStatus === "noCurrentGame" ? (
        <></>
      ) : (
        <AccordionContinueGame
          expanded={expanded === "panel1"}
          onChange={handleAccordionChange("panel1")}
        ></AccordionContinueGame>
      )}
      <AccordionNewGame
        expanded={expanded === "panel2"}
        onChange={handleAccordionChange("panel2")}
      ></AccordionNewGame>
      <AccordionNewCategory
        expanded={expanded === "panel3"}
        onChange={handleAccordionChange("panel3")}
      ></AccordionNewCategory>
    </Grid2>
  );
}
