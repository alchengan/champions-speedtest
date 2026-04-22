import { Card, CardContent, Grid } from "@mui/material";
import PokemonBuild from "./PokemonBuild";
import PokemonSpeeds from "./PokemonSpeeds";
import { useEffect, useState } from "react";
import { PokemonSpeedWithAbility } from "../helpers/getPokemon";

export default function PokemonSpeedTest() {
  const [userPokemon, setUserPokemon] = useState<PokemonSpeedWithAbility>();
  const [teamPokemon, setTeamPokemon] = useState<PokemonSpeedWithAbility[]>([]);

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
    mods: {
      statPoints: number;
      nature: string;
      statChanges: number;
      tailwind: boolean;
      choiceScarf: boolean;
      paralyzed: boolean;
    },
    pokeApiId: number,
  ) => {
    setUserPokemon({
      name: name,
      speed: speed,
      user: true,
      mods: { ...mods },
      pokeApiId: pokeApiId,
    });
  };

  const handleTeamPokemonChange = (teamPokemon: PokemonSpeedWithAbility[]) => {
    setTeamPokemon(teamPokemon);
  };

  return (
    <div className="p-4">
      <Grid container spacing={2}>
        <Grid size={4}>
          <Card className="p-2">
            <CardContent>
              <PokemonBuild
                handleUserPokemonChange={handleUserPokemonChange}
                handleTeamPokemonChange={handleTeamPokemonChange}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={8}>
          <Card className="p-2 h-[calc(100vh-32px)]">
            <CardContent className="h-full">
              <PokemonSpeeds
                userPokemon={userPokemon}
                teamPokemon={teamPokemon}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
