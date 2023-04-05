import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

/** This component gives an overview of the rules of the game. */
export default function RuleBook() {
  return (
    <Grid2
      container
      xs={12}
      sx={{ backgroundColor: "primary.dark", borderRadius: 2 }}
    >
      <Grid2 container p={3} gap={2} flexDirection={"column"}>
        <Typography color={"inherit"} variant={"body2"}>
          Spielvorbereitung
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Zunächst benötigt ihr eine Version des Brettspiels "Krazy Wordz".
          Jeder von euch erhält in der Farbe seiner Wahl die Tippkarten und das
          Tableau.
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Dann kommt diese Website ins Spiel. Startet ein neues Spiel und legt
          zunächst fest, wie viele Spieler ihr seid und mit welcher Kollektion
          aus Kategorien ihr spielen wollt. Ihr könnt außerdem die Anzahl der
          gespielten Runden anpassen - standardmäßig werden 6 Runden gespielt.
        </Typography>
        <Typography color={"inherit"} variant={"body2"}>
          Spielverlauf
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Zunächst mischt ihr die Buchstabenplättchen aus dem Brettspiel "Krazy
          Wordz" verdeckt in der Tischmitte. Jeder nimmt sich 9 verdeckte
          Buchstabenplättchen aus der Mitte: Genau 6 Konsonanten (dunklere
          Rückseite) und 3 Vokale (hellere Rückseite). Legt eure 9 Buchstaben
          offen neben euer Tableau. Anschließend könnt ihr das Spiel starten.
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Nach Spielstart bekommt jeder Spieler in einer festgelegten
          Reihenfolge eine Kategorie zugewiesen. Achtet darauf, dass nur der
          genannte Spieler die Kategorie sehen kann.
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Nun bildet mit euren gezogenen Buchstaben auf eurem Tableau ein Wort,
          das es nicht wirklich gibt, das aber zu eurer Kategorie so gut wie
          möglich passen sollte.
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Beispiel: Lautet deine Kategorie "Fernsehzeitung", könntest du z.B.
          "Gux" oder "Shau ma" legen, aber nicht "Hör zu" oder "TV Heute".
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Wer fertig ist dreht sein Tableau um 180°, damit die Mitspieler das
          Wort besser lesen können. Achtung! Ihr dürft eure Wörter bis zur
          Auswertung weder laut vorlesen noch andere Hinweise geben, denn
          hierdurch würdet ihr möglicherweise zu viel verraten.
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Sind alle Spieler fertig, drückt ihr auf den Button "Kategorien
          anzeigen". Hinweis: Euren Kategorien wurden noch ein paar weitere
          hinzugefügt, die kein Spieler gelegt hat. Die den Kategorien
          zugeordneten Nummern könnt ihr nun nutzen, um euren Mitspielern auf
          die Schliche zu kommen. Sobald ihr eine Vermutung habt, welches Wort
          zu einer Kategorie gehört, legt eure entsprechende Tippkarte verdeckt
          vor diesem Spieler/ Tableau ab. Das könnt ihr alle gleichzeitig und
          kreuz und quer tun, so lange, bis jeder vor jedem Mitspieler genau
          eine Tippkarte abgelegt hat.
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Nun kommt es zur Auswertung der Startspieler beginnt: Er liest sein
          Wort so vor, wie er meint, dass es ausgesprochen wird. Dann deckt er
          die Tippkarten der Mitspieler vor seinem Tableau, eine nach der
          anderen, auf. Als letztes verrät er, welches seine Kategorie war.
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Es werden Siegpunkte vergeben: Der Wort-Erfinder erhält für jeden
          richtigen Tipp seiner Mitspieler 1 Punkt. Jeder Mitspieler, der
          richtig geraten hat, erhält ebenfalls 1 Punkt.
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Jetzt liest der reihum nächste Spieler sein Wort laut vor, deckt die
          Tippkarten seiner Mitspieler auf und legt offen, welches seine
          Kategorie war. Wieder werden Siegpunkte verteilt. Dies geht reihum
          weiter, bis jeder sein Wort vorgelesen und ausgewertet hat. Wenn ihr
          fertig seid, könnt ihr mit einem Klick auf "Nächste Runde" die neue
          Runde starten.
        </Typography>
        <Typography color={"inherit"} variant={"body1"}>
          Bereitet die nächste Runde vor: Jeder nimmt seine Tippkarten wieder an
          sich und legt alle Buchstaben verdeckt zurück in die Tischmitte. Der
          reihum nächste Spieler wird Startspieler. Nehmt euch wieder 3 Vokale,
          6 Konsonanten aus der Tischmitte und macht euch bereit für die neuen
          Kategorien.
        </Typography>
      </Grid2>
    </Grid2>
  );
}
