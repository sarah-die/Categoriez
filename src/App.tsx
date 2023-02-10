import Grid2 from "@mui/material/Unstable_Grid2";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ControlledAccordion from "./components/ControlledAccordion";

function App() {
  const [accStatus, setAccStatus] = useState<number>(0);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "background.paper",
      }}
    >
      <Grid2 container>
        <Grid2 container xs={12} textAlign="center">
          <Grid2 xs={12} md={6} xl={4}>
            <Typography mt={3} variant={"h1"}>
              Categoriez
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 xs={12} mt={6} ml={12} mr={12}>
          <ControlledAccordion></ControlledAccordion>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default App;
