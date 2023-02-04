import {
  Accordion,
  AccordionActions,
  AccordionDetails,
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

export const AccordionNewGame = () => {
  const [players, setPlayers] = useState<string[]>(new Array(3).fill(""));

  // places text-fields to enter player names dependent on the number of players.
  // makes sure existing players are preserved when number of players is changed
  const placeNameFields = (e: SelectChangeEvent) => {
    const newPlayers = [...players, ...new Array(5).fill("")];
    setPlayers(newPlayers.slice(0, Number(e.target.value)));
  };

  // adds the new name of a player to the existing list of players
  const setPlayerNames = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newPlayers = [...players];
    newPlayers[i] = e.target.value;
    setPlayers(newPlayers);
  };

  return (
    <Accordion sx={{ backgroundColor: "primary.dark" }}>
      <AccordionSummary
        // ToDo
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant={"h4"}>Click to play</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant={"body1"} sx={{ mb: 3 }}>
          Please select the number of players (3 - 8).
        </Typography>
        <FormControl>
          <InputLabel>Player</InputLabel>
          <Select
            value={players.length.toString()}
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
          Set names for {players.length} Players:
        </Typography>
        <Grid2
          container
          // spacing={9}
          // justifyContent={"flex-start"}
        >
          {players.map((p, i) => {
            return (
              <TextField
                required
                label="Name"
                placeholder={"Player " + (i + 1)}
                sx={{ mr: 3, mb: 3 }}
                value={players[i]}
                onChange={setPlayerNames(i)}
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
        >
          Start game
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
