import Grid2 from "@mui/material/Unstable_Grid2";
import { Box, Grid, Typography } from "@mui/material";
import { useGameContext } from "../Context";

/** Existing collections and their categories are displayed here. */
export default function Categoriez() {
  const ctx = useGameContext();
  return (
    <Grid2 container>
      <Grid2
        xs={12}
        m={{ xs: 2, md: 9 }}
        p={4}
        sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      >
        <Typography color={"inherit"} variant={"body2"} m={3}>
          Categoriez
        </Typography>
        <Typography color={"inherit"} variant={"body1"} mb={2}>
          Diese Seite gibt euch eine Übersicht über existierende Kollektionen
          und deren Categoriez.
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {ctx.collections.map((c) => {
            return (
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    px: 2,
                    py: 1,
                    border: 1,
                    borderColor: "black",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    color={"black"}
                    variant={"body1"}
                    my={1}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                  >
                    {c.name}
                  </Typography>
                  <Grid2 container>
                    {c.categoriez.map((cat) => {
                      return (
                        <Typography color={"inherit"} variant={"body1"} mr={2}>
                          {cat}
                        </Typography>
                      );
                    })}
                  </Grid2>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid2>
    </Grid2>
  );
}
