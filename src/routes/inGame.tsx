import Grid2 from "@mui/material/Unstable_Grid2";
import {  useGameContext } from "../Context";
import StartGame from "../components/inGameComponents/StartGame";
import ShowCategory from "../components/inGameComponents/ShowCategory";
import CreateWords from "../components/inGameComponents/CreateWords";
import Reveal from "../components/inGameComponents/Reveal";

export default function InGame() {
  return (
      <Grid2 container>
        <InnerInGame />
      </Grid2>
  );
}

const InnerInGame = () => {
  const ctx = useGameContext();

  if (ctx.currentGameStatus === "start") {
    return <StartGame />;
  } else if (ctx.currentGameStatus === "hiddenCategory") {
    return <ShowCategory />;
  } else if (ctx.currentGameStatus === "createWords") {
    return <CreateWords />;
  } else {
    return <Reveal />;
  }
};