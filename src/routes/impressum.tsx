import Grid2 from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

export default function Impressum() {
  return (
    <Grid2
      container
      xs={12}
      sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
    >
      <Grid2 container p={3} gap={2} flexDirection={"column"}>
        <Typography color={"inherit"} variant={"body2"}>
          Impressum
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Impressum gem. § 5 TMG
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Sarah Diethert
        </Typography>
        <Typography color={"inherit"} variant={"body1"} fontWeight={600}>
          Kontakt:
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          https://github.com/sarah-die
        </Typography>
      </Grid2>
    </Grid2>
  );
}
