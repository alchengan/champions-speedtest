import { PokemonSpeedWithAbility } from "../helpers/getPokemon";
import PokemonSpeedGroupItem from "./PokemonSpeedGroupItem";

interface PokemonSpeedGroupProps {
  speed: number;
  pokemon: PokemonSpeedWithAbility[];
  mainList: boolean;
}

export default function PokemonSpeedGroup({
  speed,
  pokemon,
  mainList,
}: PokemonSpeedGroupProps) {
  return (
    <div className="border-b-2">
      <div className="flex justify-between gap-4">
        <div className="grow">
          {pokemon.map((poke) => (
            <PokemonSpeedGroupItem
              key={`pokemon-${poke.name}${poke.user && "-user"}`}
              pokemon={poke}
              mainList={mainList}
            />
          ))}
        </div>
        <p className="w-10 pr-2 text-lg font-bold">{speed}</p>
      </div>
    </div>
  );
}
