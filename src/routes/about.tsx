import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function About() {
  return (
    <Grid2 container>
      <Grid2
        xs={12}
        m={{ xs: 2, md: 9 }}
        sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      >
        <Typography color={"inherit"} variant={"body1"} m={3}>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet.
        </Typography>
      </Grid2>
    </Grid2>
  );
}

// nicht zu kommerziellen Zwecken gedacht. Privates Projekt. Nur zur privaten Nutzung. Erstellt durch
