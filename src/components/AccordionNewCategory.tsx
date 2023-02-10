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

export const AccordionNewCategory = (props: {
  expanded: boolean;
  onChange: AccordionProps["onChange"];
}) => {
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
              // value={}
              // onChange={}
            ></TextField>
          </Grid2>
          <Grid2>
            <FormControl>
              <InputLabel>Categriez</InputLabel>
              <Select
                // value={} ToDo
                label="Category"
                placeholder={"Standard"}
                // onChange={} ToDo
              >
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={4}>Four</MenuItem>
                <MenuItem value={5}>Five</MenuItem>
                <MenuItem value={6}>Six</MenuItem>
                <MenuItem value={7}>Seven</MenuItem>
                <MenuItem value={8}>Eight</MenuItem>
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
