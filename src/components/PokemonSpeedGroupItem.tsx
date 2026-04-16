import { PokemonSpeedWithAbility } from "../helpers/getPokemon";

interface PokemonSpeedGroupItemProps {
  pokemon: PokemonSpeedWithAbility;
  mainList: boolean;
}

export default function PokemonSpeedGroupItem({
  pokemon,
  mainList,
}: PokemonSpeedGroupItemProps) {
  return (
    <div
      className={`flex pl-2${pokemon.user ? " bg-green-300" : ""}${mainList && pokemon.user ? " user-mon" : ""}`}
    >
      <p>{pokemon.name}</p>
    </div>
  );
}
