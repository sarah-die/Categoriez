import Grid2 from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import ControlledAccordion from "./components/ControlledAccordion";

function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "scroll",
        backgroundColor: "background.paper",
      }}
    >
      <Grid2 container>
        <Grid2 xs={12} m={{ xs: 2, md: 9 }}>
          <ControlledAccordion></ControlledAccordion>
        </Grid2>
      </Grid2>
      <Box p={4}></Box>
    </Box>
  );
}

export default App;
