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
import React, { ChangeEvent, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGameContext } from "../Context";
import { Link } from "react-router-dom";
import { SnackbarError } from "./utils/SnackbarError";

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
  const [errorMessage, setErrorMessage] = useState<string>("Error");

  const checkForEmptyNameFields = () => {
    if (ctx.currentPlayers.some((p) => p === "")) {
      setErrorMessage("Please enter a name for every player.");
      ctx.setSnackbarOpen(true);
      return false;
    } else if (ctx.currentPlayers.some((p) => p === " ")) {
      setErrorMessage(
        "Please make sure that every name contains at least one character."
      );
      ctx.setSnackbarOpen(true);
    } else {
      return true;
    }
  };

  const checkForNameDuplicates = () => {
    const array: string[] = ctx.currentPlayers.filter((p) => p !== "");
    const setFromArray = new Set(array);
    if (array.length !== setFromArray.size) {
      setErrorMessage("Please choose a different name for every player.");
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

  const setStatus = () => {
    if (playernameConditions) {
      ctx.setGameStatus("ongoing");
      ctx.setInGameStatus("start");
    } else {
      checkForNameDuplicates();
      checkForEmptyNameFields();
    }
  };

  return (
    <Accordion sx={{ backgroundColor: "primary.dark" }} {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant={"h4"}>Start a new Game</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant={"body1"} sx={{ mb: 3 }}>
          Please select the number of players (3 - 8).
        </Typography>
        <FormControl>
          <InputLabel>Player</InputLabel>
          <Select
            value={ctx.currentPlayers.length.toString()}
            label="Player"
            onChange={placeNameFields}
          >
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
            <MenuItem value={6}>Six</MenuItem>
            <MenuItem value={7}>Seven</MenuItem>
            <MenuItem value={8}>Eight</MenuItem>
          </Select>
        </FormControl>
        <Typography variant={"body1"} sx={{ mt: 3, mb: 3 }}>
          Please set a name for all of the {ctx.currentPlayers.length} players:
        </Typography>
        <Grid2 container p={2}>
          {ctx.currentPlayers.map((p, i) => {
            return (
              <TextField
                required
                label="Name"
                placeholder={"Player " + (i + 1)}
                sx={{ mr: 3, mb: 3 }}
                value={ctx.currentPlayers[i]}
                onChange={setPlayerNames(i)}
                onBlur={checkPlayerNames}
              ></TextField>
            );
          })}
        </Grid2>
      </AccordionDetails>
      <AccordionActions>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, m: 3, color: "black" }}
          disabled={!playernameConditions}
          component={Link}
          to={"/inGame"}
          onClick={() => {
            setStatus();
          }}
        >
          Start game
        </Button>
        <SnackbarError message={errorMessage}></SnackbarError>
      </AccordionActions>
    </Accordion>
  );
};
