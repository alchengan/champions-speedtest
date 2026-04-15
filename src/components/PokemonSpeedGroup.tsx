import { PokemonSpeedWithAbility } from "../helpers/getPokemon";
import PokemonSpeedGroupItem from "./PokemonSpeedGroupItem";

interface PokemonSpeedGroupProps {
  speed: number;
  pokemon: PokemonSpeedWithAbility[];
}

export default function PokemonSpeedGroup({
  speed,
  pokemon,
}: PokemonSpeedGroupProps) {
  return (
    <div className="border-b-2">
      <div className="flex justify-between">
        <div>
          {pokemon.map((poke) => (
            <PokemonSpeedGroupItem
              key={`pokemon-${poke.name}`}
              pokemon={poke}
            />
          ))}
        </div>
        <p className="text-lg font-bold">{speed}</p>
      </div>
    </div>
  );
}
