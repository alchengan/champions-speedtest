import { PokemonSpeedWithAbility } from "../helpers/getPokemon";

interface PokemonSpeedGroupItemProps {
  pokemon: PokemonSpeedWithAbility;
}

export default function PokemonSpeedGroupItem({
  pokemon,
}: PokemonSpeedGroupItemProps) {
  return (
    <div className={`flex pl-2 ${pokemon.user && "bg-green-300 user-mon"}`}>
      <p>{pokemon.name}</p>
    </div>
  );
}
