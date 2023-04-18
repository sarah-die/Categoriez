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
import { Collection, useGameContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { CustomSnackbar } from "./utils/CustomSnackbar";
import { useCheckGameConditions } from "./utils/useCheckGameConditions";

/** This component is for starting a new game. For this purpose, the number of players is set, as well as the names of the players. */
export const AccordionNewGame = (props: {
  expanded: boolean;
  onChange: AccordionProps["onChange"];
}) => {
  // deconstructed ctx to have dependencies like "currentPlayer" and not the dependency on the context. So it does not always trigger, when the context changes
  const ctx = useGameContext();
  const { checkGameConditions } = useCheckGameConditions();
  const navigate = useNavigate();

  // places text-fields to enter player names dependent on the number of players.
  // makes sure existing players are preserved when number of players is changed
  const placeNameFields = (e: SelectChangeEvent) => {
    const newPlayers = [...ctx.currentPlayers, ...new Array(5).fill("")];
    ctx.setPlayers(newPlayers.slice(0, Number(e.target.value)));
  };

  // adds the new name of a player to the existing list of players
  const setPlayerNames = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newPlayers = [...ctx.currentPlayers];
    newPlayers[i] = e.target.value;
    ctx.setPlayers(newPlayers);
  };

  return (
    <Accordion
      sx={{ backgroundColor: "primary.dark", width: "100%", borderRadius: 1 }}
      {...props}
    >
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
          onClick={() => {
            if (checkGameConditions()) {
              ctx.setGameStatus("ongoing");
              ctx.setInGameStatus("start");
              navigate("/inGame");
            }
          }}
        >
          Let's go!
        </Button>
        <CustomSnackbar message={ctx.snackbarMessage}></CustomSnackbar>
      </AccordionActions>
    </Accordion>
  );
};
