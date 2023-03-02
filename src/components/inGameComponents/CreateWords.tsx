import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useGameContext } from "../../Context";
import React, { useState } from "react";

type CategoryShown = "hidden" | "shown";

/** This component gives the players time to create their words. There is a button to continue. If one player has forgotten their category there is the possibility to reveal it again. */
export default function CreateWords() {
  const ctx = useGameContext();
  const [categoryShown, setCategoryShown] = useState<CategoryShown>("hidden");
  const [chosenPlayer, setChosenPlayer] = useState<number>(0);

  return (
    <Grid2
      container
      rowSpacing={1}
      xs={12}
      m={{ xs: 2, md: 9 }}
      p={4}
      sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      flexDirection={"column"}
    >
      <Typography color={"inherit"} variant={"body1"} my={1}>
        You now have time to create your krazy wordz. Click the button below
        when all players are finished.
      </Typography>
      <Grid2 container justifyContent={"center"}>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, my: 2, color: "black" }}
          onClick={() => ctx.setInGameStatus("reveal")}
        >
          Reveal categoriez
        </Button>
      </Grid2>

      <Grid2 container my={3}>
        <Typography color={"inherit"} variant={"body1"} my={3} mr={5}>
          Category forgotten? Click here to show the category from
        </Typography>
        <FormControl>
          <InputLabel>Players</InputLabel>
          <Select
            value={chosenPlayer.toString()}
            label="Players"
            placeholder={ctx.currentPlayers[0]}
            onChange={(e) => setChosenPlayer(Number(e.target.value))}
          >
            {ctx.currentPlayers.map((p, index) => {
              return (
                <MenuItem value={index} key={index}>
                  {p}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid2>
      {categoryShown === "hidden" ? (
        <Grid2 container justifyContent={"center"}>
          <Button
            variant={"contained"}
            size={"large"}
            sx={{ height: 50, fontSize: 22, my: 2, color: "black" }}
            onClick={() => setCategoryShown("shown")}
          >
            Show category
          </Button>
        </Grid2>
      ) : (
        <Grid2 container flexDirection={"column"}>
          <Typography color={"inherit"} variant={"body1"} my={1}>
            Your category is
          </Typography>
          <Typography color={"inherit"} variant={"body2"} my={1}>
            {ctx.assignedCategoriez[chosenPlayer]}
          </Typography>
          <Grid2 container justifyContent={"center"}>
            <Button
              variant={"contained"}
              size={"large"}
              sx={{ height: 50, fontSize: 22, my: 2, color: "black" }}
              onClick={() => setCategoryShown("hidden")}
            >
              Hide category
            </Button>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
}
