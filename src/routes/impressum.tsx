import Grid2 from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

export default function Impressum() {
  return (
    <Grid2 container>
      <Grid2
        xs={12}
        m={{ xs: 2, md: 9 }}
        sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      >
        <Typography color={"inherit"} variant={"body2"} m={3}>
          Impressum
        </Typography>
        <Typography color={"inherit"} variant={"body1"} m={3}>
          Impressum gem. § 5 TMG
        </Typography>
        <Typography color={"inherit"} variant={"body1"} m={3}>
          Sarah Diethert
        </Typography>
        <Typography color={"inherit"} variant={"body1"} m={3} fontWeight={600}>
          Kontakt:
        </Typography>
        <Typography color={"inherit"} variant={"body1"} m={3}>
          https://github.com/sarah-die
        </Typography>
      </Grid2>
    </Grid2>
  );
}
