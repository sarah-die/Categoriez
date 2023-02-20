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
import React, { ChangeEvent } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGameContext } from "../Context";
import { Link } from "react-router-dom";

export const AccordionNewGame = (props: {
  expanded: boolean;
  onChange: AccordionProps["onChange"];
}) => {
  // ToDo use context for current players
  const { currentPlayers, setPlayers } = useGameContext();

  // places text-fields to enter player names dependent on the number of players.
  // makes sure existing players are preserved when number of players is changed
  const placeNameFields = (e: SelectChangeEvent) => {
    const newPlayers = [...currentPlayers, ...new Array(5).fill("")];
    setPlayers(newPlayers.slice(0, Number(e.target.value)));
  };

  // adds the new name of a player to the existing list of players
  const setPlayerNames = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newPlayers = [...currentPlayers];
    newPlayers[i] = e.target.value;
    setPlayers(newPlayers);
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
            value={currentPlayers.length.toString()}
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
          Set names for {currentPlayers.length} Players:
        </Typography>
        <Grid2
          container
          // spacing={9}
          // justifyContent={"flex-start"}
        >
          {currentPlayers.map((p, i) => {
            return (
              <TextField
                required
                label="Name"
                placeholder={"Player " + (i + 1)}
                sx={{ mr: 3, mb: 3 }}
                value={currentPlayers[i]}
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
          // onClick={} ToDo
          component={Link}
          to={"/inGame"}
        >
          Start game
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
