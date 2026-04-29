import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";

interface AboutDialogProps {
  aboutOpen: boolean;
  handleAboutClose: () => void;
}

export default function AboutDialog({
  aboutOpen,
  handleAboutClose,
}: AboutDialogProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={aboutOpen}
      onClose={handleAboutClose}
      aria-labelledby="about-dialog-title"
      aria-describedby="about-dialog"
      role="dialog"
    >
      <DialogTitle>About</DialogTitle>
      <DialogContent className="grid gap-y-4">
        <DialogContentText>
          Champions Speedtest created by Alan Cheng
        </DialogContentText>
        <DialogContentText>
          Source code for Champions Speedtest can be viewed on{" "}
          <Link href="https://github.com/alchengan/champions-speedtest">
            Github
          </Link>
        </DialogContentText>
        <DialogContentText>
          Pokémon Home sprites retrieved from{" "}
          <Link href="https://pokeapi.co/">PokéAPI</Link>
        </DialogContentText>
        <div>
          <DialogContentText>
            Pokémon © 2002–{new Date().getFullYear()} Pokémon. © 1995–
            {new Date().getFullYear()} Nintendo/Creatures Inc./GAME FREAK inc.
            ™, ® and Pokémon character names are trademarks of Nintendo.
          </DialogContentText>
          <DialogContentText>
            No copyright or trademark infringement intended
          </DialogContentText>
        </div>
      </DialogContent>
    </Dialog>
  );
}
