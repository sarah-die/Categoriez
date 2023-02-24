import Grid2 from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

/** Existing collections and their categories are displayed here. */
export default function Categoriez() {
  return (
    <Grid2 container>
      <Grid2
        xs={12}
        m={{ xs: 2, md: 9 }}
        sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      >
        <Typography color={"inherit"} variant={"body1"} m={3}>
          This is an overview over existing collections and their categoriez.
        </Typography>
        <Typography color={"inherit"} variant={"body1"} m={3}>
          {localStorage.getItem("collections")}
        </Typography>
      </Grid2>
    </Grid2>
  );
}
