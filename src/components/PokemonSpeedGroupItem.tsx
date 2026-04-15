import { PokemonSpeedWithAbility } from "../helpers/getPokemon";

interface PokemonSpeedGroupItemProps {
  pokemon: PokemonSpeedWithAbility;
}

export default function PokemonSpeedGroupItem({
  pokemon,
}: PokemonSpeedGroupItemProps) {
  return (
    <div className="flex">
      <p>{pokemon.name}</p>
    </div>
  );
}
