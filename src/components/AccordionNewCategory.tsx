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
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useGameContext } from "../Context";
import { CustomSnackbar } from "./utils/CustomSnackbar";
import { checkConditionsForNewCat } from "./utils/checkConditionsForNewCat";

/** This component is for adding a new category. The player can add it to an existing collection or create a new one. */
export const AccordionNewCategory = (props: {
  expanded: boolean;
  onChange: AccordionProps["onChange"];
}) => {
  const ctx = useGameContext();

  const [newCategory, setNewCategory] = useState<string>("");
  const [newCollection, setNewCollection] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string>("new");

  const saveNewCategoryLocal = () => {
    const trimmedCat: string = newCategory.trim();
    const trimmedCol: string = newCollection.trim();
    const check = checkConditionsForNewCat(
      trimmedCat,
      trimmedCol,
      selectedCollection,
      ctx
    );

    if (!check) {
      return;
    }

    ctx.saveCategoryToCollection(
      selectedCollection === "new" ? trimmedCol : selectedCollection,
      trimmedCat
    );
    setNewCategory(trimmedCat);
    setNewCollection(trimmedCol);
    ctx.setSnackbarMessage("Die neue Kategorie wurde gespeichert.");
    ctx.setSnackbarOpen(true);
    setNewCategory("");
    setNewCollection("");
    setSelectedCollection("new");
  };

  return (
    <Accordion sx={{ backgroundColor: "primary.dark" }} {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant={"h4"}>Neue Categoriez hinzufügen</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant={"body1"} sx={{ mb: 3 }}>
          Hier könnt ihr neue Categoriez hinzufügen, um mit euren eigenen Ideen
          zu spielen. Schreibt zuerst die neue Category in das Feld. Wählt dann
          die Kollektion, zur der ihr diese hinzufügen wollt oder erstellt eine
          neue Kollektion.
        </Typography>
        <TextField
          required
          id={"newCategory"}
          label="Neue Category"
          placeholder={"Neu entdeckte Käferart"}
          sx={{ mr: 3, mb: 3 }}
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        ></TextField>
        <Grid2 container alignContent={"flex-start"} rowSpacing={1}>
          <FormControl sx={{ mr: 3, mb: 3, minWidth: 150 }}>
            <InputLabel>Collections</InputLabel>
            <Select
              label="Kollektion"
              placeholder={"Alle"}
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              {ctx.collections.map((c) => {
                return (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                );
              })}
              <MenuItem value={"new"}>Neue Kollektion</MenuItem>
            </Select>
          </FormControl>
          {selectedCollection === "new" ? (
            <TextField
              required
              sx={{ mr: 3, mb: 3 }}
              label="Neue Kollektion"
              placeholder={"Tierisches"}
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
            ></TextField>
          ) : (
            <></>
          )}
        </Grid2>
      </AccordionDetails>
      <AccordionActions>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, m: 3 }}
          onClick={saveNewCategoryLocal}
        >
          Category hinzufügen
        </Button>
        <CustomSnackbar message={ctx.snackbarMessage}></CustomSnackbar>
      </AccordionActions>
    </Accordion>
  );
};
