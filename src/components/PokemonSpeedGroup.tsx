import { PokemonSpeedWithAbility } from "../helpers/getPokemon";
import PokemonSpeedGroupItem from "./PokemonSpeedGroupItem";

interface PokemonSpeedGroupProps {
  speed: number;
  pokemon: PokemonSpeedWithAbility[];
  mainList: boolean;
  pinPokemon: (pokemon: PokemonSpeedWithAbility) => void;
  unpinPokemon: (pokemon: PokemonSpeedWithAbility) => void;
}

export default function PokemonSpeedGroup({
  speed,
  pokemon,
  mainList,
  pinPokemon,
  unpinPokemon,
}: PokemonSpeedGroupProps) {
  return (
    <div className="border-b-2 last:border-0">
      <div className="flex justify-between gap-4">
        <div className="grow">
          {pokemon.map((poke) => (
            <PokemonSpeedGroupItem
              key={`pokemon-${poke.name}${poke.user && "-user"}${poke.pin && "-pin"}`}
              pokemon={poke}
              mainList={mainList}
              pinPokemon={pinPokemon}
              unpinPokemon={unpinPokemon}
            />
          ))}
        </div>
        <p className={`w-10 pr-2 text-lg font-bold ${!mainList ? "mr-6" : ""}`}>
          {speed}
        </p>
      </div>
    </div>
  );
}
