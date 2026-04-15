import { Card, CardContent, Grid } from "@mui/material";
import PokemonBuild from "./PokemonBuild";
import PokemonSpeeds from "./PokemonSpeeds";
import { useEffect, useState } from "react";

export type UserPokemon = {
  name: string;
  speed: number;
};

export default function PokemonSpeedTest() {
  const [userPokemon, setUserPokemon] = useState<UserPokemon>();

  const handleUserPokemonChange = (name: string, speed: number) => {
    setUserPokemon({ name: name, speed: speed });
  };

  useEffect(() => {
    userPokemon && console.log(userPokemon);
  }, [userPokemon]);

  return (
    <div className="p-4">
      <Grid container spacing={2}>
        <Grid size={4}>
          <Card className="p-2">
            <CardContent>
              <PokemonBuild handleUserPokemonChange={handleUserPokemonChange} />
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
  );
}
