import Grid2 from "@mui/material/Unstable_Grid2";
import { AccordionNewGame } from "./AccordionNewGame";
import { AccordionNewCategory } from "./AccordionNewCategory";
import React, { useState } from "react";
import { useGameContext } from "../Context";
import { AccordionContinueGame } from "./AccordionContinueGame";

export default function ControlledAccordion() {
  const ctx = useGameContext();
  const [expanded, setExpanded] = useState<String | false>(false);
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Grid2 container spacing={4}>
      <Grid2>
        <Grid2 xs={12}>
          {ctx.gameStatus === "noCurrentGame" ? (
            <></>
          ) : (
            <AccordionContinueGame
              expanded={expanded === "panel1"}
              onChange={handleAccordionChange("panel1")}
            ></AccordionContinueGame>
          )}
        </Grid2>
        <Grid2 xs={12}>
          <AccordionNewGame
            expanded={expanded === "panel2"}
            onChange={handleAccordionChange("panel2")}
          ></AccordionNewGame>
        </Grid2>
        <Grid2 xs={12}>
          <AccordionNewCategory
            expanded={expanded === "panel3"}
            onChange={handleAccordionChange("panel3")}
          ></AccordionNewCategory>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
//
// function NoCurrentGame() {
//   const [expanded, setExpanded] = useState<String | false>(false);
//   const handleAccordionChange =
//     (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//       setExpanded(isExpanded ? panel : false);
//     };
//   return (
//     <Grid2>
//       <Grid2 xs={12}>
//         {ctx.gameStatus === "noCurrentGame" ? <></> : <OngoingGame />}
//       </Grid2>
//       <Grid2 xs={12}>
//         <AccordionNewGame
//           expanded={expanded === "panel1"}
//           onChange={handleAccordionChange("panel1")}
//         ></AccordionNewGame>
//       </Grid2>
//       <Grid2 xs={12}>
//         <AccordionNewCategory
//           expanded={expanded === "panel2"}
//           onChange={handleAccordionChange("panel2")}
//         ></AccordionNewCategory>
//       </Grid2>
//     </Grid2>
//   );
// }
//
// function OngoingGame() {
//   const [expanded, setExpanded] = useState<String | false>(false);
//   const handleAccordionChange =
//     (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//       setExpanded(isExpanded ? panel : false);
//     };
//   return (
//     <Grid2>
//       <Grid2 xs={12} mb={3}>
//         <AccordionContinueGame
//           expanded={expanded === "panel2"}
//           onChange={handleAccordionChange("panel2")}
//         ></AccordionContinueGame>
//       </Grid2>
//     </Grid2>
//   );
// }
