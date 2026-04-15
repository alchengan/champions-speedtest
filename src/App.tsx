import React from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import PokemonBuild from "./components/PokemonBuild";
import { Card, CardContent, Paper } from "@mui/material";
import PokemonSpeeds from "./components/PokemonSpeeds";

function App() {
  return (
    <div className="App">
      <div className="p-4">
        <Grid container spacing={2}>
          <Grid size={4}>
            <Card className="p-2">
              <CardContent>
                <PokemonBuild />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={8}>
            <Card className="p-2 h-[calc(100vh-32px)]">
              <CardContent className="h-full">
                <PokemonSpeeds />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
