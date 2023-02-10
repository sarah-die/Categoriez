import React, { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { TextField, Typography } from "@mui/material";

export const Scream = () => {
  const [val, setVal] = useState<string>("");
  return (
    <Grid2 xs={3} justifyContent={"center"} textAlign={"right"}>
      <TextField value={val} onChange={(e) => setVal(e.target.value)} />
      <Typography>{val.toUpperCase()}</Typography>
    </Grid2>
  );
};
