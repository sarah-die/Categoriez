import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collection, useGameContext } from "../Context";
import { Link } from "react-router-dom";
import { CustomSnackbar } from "./utils/CustomSnackbar";

/** This component is for starting a new game. For this purpose, the number of players is set, as well as the names of the players. */
export const AccordionNewGame = (props: {
  expanded: boolean;
  onChange: AccordionProps["onChange"];
}) => {
  const ctx = useGameContext();

  // places text-fields to enter player names dependent on the number of players.
  // makes sure existing players are preserved when number of players is changed
  const placeNameFields = (e: SelectChangeEvent) => {
    const newPlayers = [...ctx.currentPlayers, ...new Array(5).fill("")];
    ctx.setPlayers(newPlayers.slice(0, Number(e.target.value)));
  };

  const [playernameConditions, setPlayernameConditions] =
    useState<boolean>(false);

  const [snackbarMessage, setSnackbarMessage] = useState<string>("Error");

  const checkForEmptyNameFields = () => {
    if (ctx.currentPlayers.some((p) => p === "")) {
      setSnackbarMessage("Bitte tragt für jeden Spieler einen Namen ein.");
      ctx.setSnackbarOpen(true);
      return false;
    } else if (ctx.currentPlayers.some((p) => p === " ")) {
      setSnackbarMessage(
        "Bitte stellt sicher, dass jeder Spielername mindestens ein Schriftzeichen enthält."
      );
      ctx.setSnackbarOpen(true);
    } else {
      return true;
    }
  };

  const checkForNameDuplicates = () => {
    const array: string[] = ctx.currentPlayers
      .filter((p) => p !== "")
      .map((p) => p.toLowerCase());

    const setFromArray = new Set(array);
    if (array.length !== setFromArray.size) {
      setSnackbarMessage(
        "Die Spielernamen müssen sich voneinander unterscheiden."
      );
      ctx.setSnackbarOpen(true);
      return false;
    } else {
      return true;
    }
  };

  const checkPlayerNames = () => {
    if (checkForEmptyNameFields() && checkForNameDuplicates()) {
      setPlayernameConditions(true);
    } else {
      setPlayernameConditions(false);
    }
  };

  // adds the new name of a player to the existing list of players
  const setPlayerNames = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newPlayers = [...ctx.currentPlayers];
    newPlayers[i] = e.target.value;
    ctx.setPlayers(newPlayers);
  };

  const checkAmountOfCategoriez = () => {
    const numberOfCategoriez: number = ctx.chosenCollections
      .map(
        (colID) =>
          ctx.collections.find((col) => col.id === colID)!.categoriez.length
      )
      .reduce((acc, cur) => acc + cur);
    const numberOfPlayers: number = ctx.currentPlayers.length;
    const numberOfRounds: number = ctx.roundStatus.length;
    let necessaryNumberOfCategoriez: number;

    if (numberOfPlayers <= 6) {
      necessaryNumberOfCategoriez = 6;
    } else if (numberOfPlayers <= 7) {
      necessaryNumberOfCategoriez = 7;
    } else {
      necessaryNumberOfCategoriez = 8;
    }

    if (numberOfCategoriez < necessaryNumberOfCategoriez * numberOfRounds) {
      setSnackbarMessage(
        "Die Kollektion, die ihr gewählt habt, enthält leider nicht genug Categoriez. Wählt eine andere oder reduziert die Anzahl an Spielern oder Runden."
      );
      ctx.setSnackbarOpen(true);
      return true;
    } else {
      return false;
    }
  };

  const setStatus = () => {
    if (playernameConditions) {
      if (checkAmountOfCategoriez()) {
        return;
      }
      ctx.setGameStatus("ongoing");
      ctx.setInGameStatus("start");
    } else {
      checkForNameDuplicates();
      checkForEmptyNameFields();
    }
  };

  useEffect(() => {
    checkPlayerNames();
  }, [ctx.currentPlayers, checkPlayerNames]);


  return (
    <Accordion sx={{ backgroundColor: "primary.dark" }} {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant={"h4"}>Neues Spiel starten</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant={"body1"} sx={{ mb: 3 }}>
          Bitte wählt die Anzahl Spieler (3 - 8).
        </Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Spieler</InputLabel>
          <Select
            value={ctx.currentPlayers.length.toString()}
            label="Spieler"
            onChange={placeNameFields}
          >
            <MenuItem value={3}>Drei</MenuItem>
            <MenuItem value={4}>Vier</MenuItem>
            <MenuItem value={5}>Fünf</MenuItem>
            <MenuItem value={6}>Sechs</MenuItem>
            <MenuItem value={7}>Sieben</MenuItem>
            <MenuItem value={8}>Acht</MenuItem>
          </Select>
        </FormControl>
        <Typography variant={"body1"} sx={{ mt: 3, mb: 3 }}>
          Tragt nun die Spielernamen für alle {ctx.currentPlayers.length}{" "}
          Spieler in die folgenden Felder ein:
        </Typography>
        <Grid2 container>
          {ctx.currentPlayers.map((p, i) => {
            return (
              <TextField
                key={i}
                required
                label="Name"
                placeholder={"Spieler " + (i + 1)}
                sx={{ mr: 3, mb: 3 }}
                value={ctx.currentPlayers[i]}
                onChange={setPlayerNames(i)}
              ></TextField>
            );
          })}
        </Grid2>
        <Typography variant={"body1"} mb={3}>
          Wählt eine Kollektion aus Categoriez aus, mit der ihr spielen wollt.
          Wenn euch eine Kollektion nicht genug ist oder diese nicht genug
          Categoriez enthält, könnt ihr über den Multi-Select mehrere
          Kollektionen auswählen.
        </Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Kollektionen</InputLabel>
          <Select
            label="Kollektionen"
            value={ctx.chosenCollections}
            onChange={(e) => {
              ctx.setChosenCollections(e.target.value as Collection["id"][]);
            }}
            multiple
          >
            {ctx.collections.map((col) => {
              return (
                <MenuItem value={col.id} key={col.id}>
                  {col.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Typography variant={"body1"} sx={{ mt: 3, mb: 3 }}>
          Setzt nun die Anzahl an Runden, die ihr spielen wollt. Das Maximum
          sind 10 Runden. Standardmäßig werden 6 Runden gespielt.
        </Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Runden</InputLabel>
          <Select
            value={ctx.roundStatus.length.toString()}
            label="Runden"
            onChange={(e) => {
              ctx.setRoundStatus(new Array(Number(e.target.value)).fill(0));
            }}
          >
            <MenuItem value={1}>Eine</MenuItem>
            <MenuItem value={2}>Zwei</MenuItem>
            <MenuItem value={3}>Drei</MenuItem>
            <MenuItem value={4}>Vier</MenuItem>
            <MenuItem value={5}>Fünf</MenuItem>
            <MenuItem value={6}>Sechs</MenuItem>
            <MenuItem value={7}>Sieben</MenuItem>
            <MenuItem value={8}>Acht</MenuItem>
            <MenuItem value={9}>Neun</MenuItem>
            <MenuItem value={10}>Zehn</MenuItem>
          </Select>
        </FormControl>
      </AccordionDetails>
      <AccordionActions>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, m: 3 }}
          disabled={!playernameConditions}
          component={Link}
          to={"/inGame"}
          onClick={() => {
            setStatus();
          }}
        >
          Let's go!
        </Button>
        <CustomSnackbar message={snackbarMessage}></CustomSnackbar>
      </AccordionActions>
    </Accordion>
  );
};
