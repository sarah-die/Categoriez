import Grid2 from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import ControlledAccordion from "./components/ControlledAccordion";

/** The main component, which is displayed in the root-route. */
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
      <Grid2 container justifyContent={"center"}>
        <Grid2 container width={{ xs: "100%", sm: "100%", md: "1400px" }}>
          <ControlledAccordion></ControlledAccordion>
        </Grid2>
      </Grid2>
      <Box p={4}></Box>
    </Box>
  );
}

export default App;
