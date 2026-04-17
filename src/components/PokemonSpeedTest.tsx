import { Card, CardContent, Grid } from "@mui/material";
import PokemonBuild from "./PokemonBuild";
import PokemonSpeeds from "./PokemonSpeeds";
import { useEffect, useState } from "react";
import { PokemonSpeedWithAbility } from "../helpers/getPokemon";

export default function PokemonSpeedTest() {
  const [userPokemon, setUserPokemon] = useState<PokemonSpeedWithAbility>();

  // keep user mon in view when changing user mon stats
  useEffect(() => {
    const userMonOnList = document.getElementsByClassName("user-mon");
    userMonOnList?.item(0)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [userPokemon]);

  const handleUserPokemonChange = (
    name: string,
    speed: number,
    pokeApiId: number,
  ) => {
    setUserPokemon({
      name: name,
      speed: speed,
      user: true,
      pokeApiId: pokeApiId,
    });
  };

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
              <PokemonSpeeds userPokemon={userPokemon} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
