import { useGameContext } from "./Context";
import React, { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { AccordionContinueGame } from "./components/AccordionContinueGame";
import { AccordionNewGame } from "./components/AccordionNewGame";
import { AccordionNewCategory } from "./components/AccordionNewCategory";

/** The main component, which is displayed in the root-route. */
export default function MainPage() {
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
