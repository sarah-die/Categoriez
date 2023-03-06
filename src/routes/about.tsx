import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

/** This component includes general information about the website. */
export default function About() {
  return (
    <Grid2 container>
      <Grid2
        xs={12}
        m={{ xs: 2, md: 9 }}
        sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
      >
        <Typography color={"inherit"} variant={"body1"} m={3}>
          Liebe Besucher! Ich habe diese Website als Übung für mich erstellt, um
          meine Kenntnisse der Frontend-Entwicklung zu vertiefen. Diese Website
          dient keinen kommerziellen Zwecken und ist ein privates Projekt, was
          zur privaten Nutzung gedacht ist.
        </Typography>
      </Grid2>
    </Grid2>
  );
}
