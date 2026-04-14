import React from "react";
import "./App.css";
import { Grid } from "@mui/material";
import PokemonBuild from "./components/PokemonBuild";

function App() {
  return (
    <div className="App">
      <header>FASTFASTFASTFASTFAST</header>
      <div className="p-8">
        <Grid container spacing={2}>
          <Grid size={4}>
            <div className="p-4 border-2">
              <p className="text-3xl font-bold underline">yuhyuhuyuhuyuh</p>
              <PokemonBuild />
            </div>
          </Grid>
          <Grid size={8}>
            <div className="p-4 border-2">
              <p>nononononononono</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
