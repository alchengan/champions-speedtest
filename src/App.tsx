import React from "react";
import "./App.css";
import { Grid } from "@mui/material";
import PokemonBuild from "./components/PokemonBuild";

function App() {
  return (
    <div className="App">
      <header>FASTFASTFASTFASTFAST</header>
      <Grid container>
        <Grid size={4}>
          <p>yuhyuhuyuhuyuh</p>
          <PokemonBuild />
        </Grid>
        <Grid size={8}>
          <p>nononononononono</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
