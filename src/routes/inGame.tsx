import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { GameProvider, useGameContext } from "../Context";
import StartGame from "../components/inGameComponents/StartGame";
import HiddenCategory from "../components/inGameComponents/HiddenCategory";
import CreateWords from "../components/inGameComponents/CreateWords";
import Reveal from "../components/inGameComponents/Reveal";

export default function InGame() {
  return (
    <GameProvider>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          overflowY: "scroll",
          backgroundColor: "background.paper",
        }}
      >
        <Grid2 container>
          <InnerInGame />
        </Grid2>
      </Box>
    </GameProvider>
  );
}

const InnerInGame = () => {
  const ctx = useGameContext();

  if (ctx.currentGameStatus === "start") {
    return <StartGame />;
  } else if (ctx.currentGameStatus === "hiddenCategory") {
    return <HiddenCategory />;
  } else if (ctx.currentGameStatus === "createWords") {
    return <CreateWords />;
  } else {
    return <Reveal />;
  }
};
