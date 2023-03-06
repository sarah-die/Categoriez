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

/** This component is for adding a new category. The player can add it to an existing collection or create a new one. */
export const AccordionNewCategory = (props: {
  expanded: boolean;
  onChange: AccordionProps["onChange"];
}) => {
  const ctx = useGameContext();

  const [catVal, setCatVal] = useState<string>("");

  const [selectedCollection, setSelectedCollection] = useState<string>("new");

  const [newCollection, setNewCollection] = useState<string>("");

  const [snackbarMessage, setSnackbarMessage] = useState<string>("Error");

  const saveNewCategoryLocal = () => {
    ctx.saveCategoryToCollection(
      selectedCollection === "new" ? newCollection : selectedCollection,
      catVal
    );
    setSnackbarMessage("Die neue Kategorie wurde gespeichert.");
    ctx.setSnackbarOpen(true);
    setCatVal("");
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
        <Typography variant={"h4"}>Add new categoriez</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant={"body1"} sx={{ mb: 3 }}>
          You can enter new categoriez here. First write down your category -
          than choose if you want to add them to an existing collection or if
          you like to create a new collection of categoriez.
        </Typography>
        <TextField
          required
          id={"newCategory"}
          label="New Category"
          placeholder={"Neu entdeckte Käferart"}
          sx={{ mr: 3, mb: 3 }}
          value={catVal}
          onChange={(e) => setCatVal(e.target.value)}
        ></TextField>
        <Grid2 container px={2} alignContent={"flex-start"} rowSpacing={1}>
          <FormControl sx={{ mr: 3, mb: 3, minWidth: 150 }}>
            <InputLabel>Collections</InputLabel>
            <Select
              label="Collection"
              placeholder={"All"}
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              {ctx.collections.map((c) => {
                return <MenuItem value={c.name}>{c.name}</MenuItem>;
              })}
              <MenuItem value={"new"}>New Collection</MenuItem>
            </Select>
          </FormControl>
          {selectedCollection === "new" ? (
            <TextField
              required
              sx={{ mr: 3, mb: 3 }}
              label="New Collection"
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
          sx={{ height: 50, fontSize: 22, m: 3, color: "black" }}
          onClick={saveNewCategoryLocal}
        >
          Add Category
        </Button>
        <CustomSnackbar message={snackbarMessage}></CustomSnackbar>
      </AccordionActions>
    </Accordion>
  );
};
