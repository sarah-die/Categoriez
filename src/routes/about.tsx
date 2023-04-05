import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

/** This component includes general information about the website. */
export default function About() {
  return (
    <Grid2
      container
      xs={12}
      sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
    >
      <Grid2 container p={3} gap={2} flexDirection={"column"}>
        <Typography color={"inherit"} variant={"body2"}>
          About
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Liebe Besucher! Ich habe diese Website als Übung für mich erstellt, um
          meine Kenntnisse der Frontend-Entwicklung zu vertiefen. Diese Website
          dient keinen kommerziellen Zwecken und ist ein privates Projekt, was
          zur privaten Nutzung gedacht ist.
        </Typography>
      </Grid2>
    </Grid2>
  );
}
