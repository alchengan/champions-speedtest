import { PokemonSpeedWithAbility } from "../helpers/getPokemon";
import PinIcon from "../icons/PinIcon";
import PokeballIcon from "../icons/PokeballIcon";

interface PokemonSpeedGroupItemProps {
  pokemon: PokemonSpeedWithAbility;
  mainList: boolean;
  pinPokemon: (pokemon: PokemonSpeedWithAbility) => void;
  unpinPokemon: (pokemon: PokemonSpeedWithAbility) => void;
}

export default function PokemonSpeedGroupItem({
  pokemon,
  mainList,
  pinPokemon,
  unpinPokemon,
}: PokemonSpeedGroupItemProps) {
  const handlePin = () => {
    if (pokemon.pin) {
      unpinPokemon(pokemon);
    } else {
      pinPokemon(pokemon);
    }
  };

  return (
    <div
      className={`flex gap-2 pl-2 transition-colors duration-100 ease-in-out ${pokemon.user ? " bg-green-300 hover:bg-green-400" : " hover:bg-slate-300"}${mainList && pokemon.user ? " user-mon" : ""}`}
    >
      <div className="size-6">
        {pokemon.user && <PokeballIcon />}
        {!pokemon.user && (
          <PinIcon isPinned={pokemon.pin || false} handlePin={handlePin} />
        )}
      </div>
      <p>{pokemon.name}</p>
    </div>
  );
}
