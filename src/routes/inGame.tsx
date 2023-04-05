import Grid2 from "@mui/material/Unstable_Grid2";
import { useGameContext } from "../Context";
import StartGame from "../components/inGameComponents/StartGame";
import ShowCategory from "../components/inGameComponents/ShowCategory";
import CreateWords from "../components/inGameComponents/CreateWords";
import Reveal from "../components/inGameComponents/Reveal";
import StartNewRound from "../components/inGameComponents/StartNewRound";
import MainPage from "../MainPage";

/** What this component renders depends on the inGameStatus. According to this "StartGame", "ShowCategory", "CreateWords" or "Reveal" are shown. */
export default function InGame() {
  return (
    <Grid2
      container
      xs={12}
      sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
    >
      <Grid2
        container
        xs={12}
        p={3}
        gap={2}
        flexDirection={"column"}
      >
        <InnerInGame />
      </Grid2>
    </Grid2>
  );
}

const InnerInGame = () => {
  const ctx = useGameContext();

  if (ctx.gameStatus === "ongoing") {
    if (ctx.inGameStatus === "start") {
      return <StartGame />;
    } else if (ctx.inGameStatus === "hiddenCategory") {
      return <ShowCategory />;
    } else if (ctx.inGameStatus === "createWords") {
      return <CreateWords />;
    } else if (ctx.inGameStatus === "reveal") {
      return <Reveal />;
    } else {
      return <StartNewRound />;
    }
  } else {
    return <MainPage />;
  }
};
