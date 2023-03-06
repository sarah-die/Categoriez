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

  // shuffle the catgeoriez before the reveal
  const fisherYates = (arr: string[]) => {
    let currentIndex: number = arr.length;
    let randomIndex: number = 0;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr;
  };

  // add more categoriez according to the gamerules
  const drawExtraCategoriez = () => {
    const assignedCatPlusExtraCat: string[] = [...ctx.assignedCategoriez];
    const chosenColIndex: number = ctx.collections.findIndex(
      (c) => c.id === ctx.chosenCollection
    );
    const whiteList: number[] = [...ctx.categoriezWhitelist];

    let n: number = 0;
    if (ctx.currentPlayers.length <= 5) {
      // 6 categoriez for <= 5 players
      n = 6 - ctx.currentPlayers.length;
    } else if (ctx.currentPlayers.length <= 7) {
      // 7 categoriez for <= 7 players
      n = 7 - ctx.currentPlayers.length;
    } else {
      // 8 categoriez for 8 players
      n = 8 - ctx.currentPlayers.length;
    }
    for (let i = 0; i < n; i++) {
      const random = Math.floor(Math.random() * whiteList.length);
      assignedCatPlusExtraCat.push(
        ctx.collections[chosenColIndex].categoriez[whiteList[random]]
      );
      whiteList.splice(random, 1);
    }
    const shuffledCat: string[] = fisherYates(assignedCatPlusExtraCat);
    ctx.setCategoriezWhitelist(whiteList);
    ctx.setAssignedCategoriez(shuffledCat);
  };

  const revealCategoriez = () => {
    drawExtraCategoriez();
    ctx.setInGameStatus("reveal");
  };

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
        Ihr habt nun Zeit eure "Krazy Wordz" zu legen. Wenn alle Spieler damit
        fertig sind, drückt den Knopf.
      </Typography>
      <Grid2 container justifyContent={"center"}>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, my: 2, color: "black" }}
          onClick={() => revealCategoriez()}
        >
          Categoriez anzeigen
        </Button>
      </Grid2>

      <Grid2 container my={3}>
        <Typography color={"inherit"} variant={"body1"} my={3} mr={5}>
          Category vergessen? Wähle deinen Spielernamen aus, um sie erneut anzeigen zu lassen.
        </Typography>
        <FormControl>
          <InputLabel>Spieler</InputLabel>
          <Select
            value={chosenPlayer.toString()}
            label="Spieler"
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
            Category anzeigen
          </Button>
        </Grid2>
      ) : (
        <Grid2 container flexDirection={"column"}>
          <Typography color={"inherit"} variant={"body1"} my={1}>
            Deine Category ist
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
              Category verbergen
            </Button>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
}
