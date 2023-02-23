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
import React, { ChangeEvent, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useGameContext } from "../Context";

/** This component is for adding a new category. The player can add it to an existing collection or create a new one. */
export const AccordionNewCategory = (props: {
  expanded: boolean;
  onChange: AccordionProps["onChange"];
}) => {
  const ctx = useGameContext();
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
        <Grid2>
          <Typography variant={"body1"} sx={{ mb: 3 }}>
            You can enter new categoriez here. First write down your category -
            than choose if you want to add them to an existing collection or if
            you like to create a new collection of categoriez.
          </Typography>
          <Grid2>
            <TextField
              required
              label="New Category"
              placeholder={"Neu entdeckte Käferart"}
              sx={{ mr: 3, mb: 3 }}
              // value={ctx.collections}
              // onChange={}
            ></TextField>
          </Grid2>
          <Grid2>
            <FormControl>
              <InputLabel>Categoriez</InputLabel>
              <Select
                value={ctx.collections}
                label="Collection"
                placeholder={"Standard"}
                // onChange={} ToDo
              >
                {ctx.collections.map((c) => {
                  return (
                      <MenuItem value={c.name}>{c.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
      </AccordionDetails>
      <AccordionActions>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{ height: 50, fontSize: 22, m: 3, color: "black" }}
        >
          Add Category
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
