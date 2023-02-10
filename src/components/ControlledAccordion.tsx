import Grid2 from "@mui/material/Unstable_Grid2";
import { AccordionNewGame } from "./AccordionNewGame";
import { AccordionNewCategory } from "./AccordionNewCategory";
import React, { useState } from "react";

export default function ControlledAccordion() {
  const [expanded, setExpanded] = useState<String | false>(false);
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Grid2>
      <Grid2 xs={12} mb={3}>
        <AccordionNewGame
          expanded={expanded === "panel1"}
          onChange={handleAccordionChange("panel1")}
        ></AccordionNewGame>
      </Grid2>
      <Grid2 xs={12}>
        <AccordionNewCategory
          expanded={expanded === "panel2"}
          onChange={handleAccordionChange("panel2")}
        ></AccordionNewCategory>
      </Grid2>
    </Grid2>
  );
}
