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

  const handleOnClick = () => {
    if (mainList) return;

    if (pokemon.user) {
      const userMonOnList = document.getElementsByClassName("user-mon");
      userMonOnList?.item(0)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    if (pokemon.pin && pokemon.mods) {
      const pinMonOnList = document.getElementsByClassName(
        `pin-mon-${`${pokemon.name.replace(/ /g, "-")}-${pokemon.speed}-${pokemon.mods.statPoints}-${pokemon.mods.nature}-${pokemon.mods.statChanges}-${pokemon.mods.tailwind}-${pokemon.mods.choiceScarf}-${pokemon.mods.paralyzed}`.toLowerCase()}`,
      );
      pinMonOnList?.item(0)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const bgColor = pokemon.user
    ? "bg-green-300 hover:bg-green-400"
    : pokemon.pin
      ? "bg-yellow-400 hover:bg-yellow-500"
      : "hover:bg-slate-300";

  const elementClassIdentifier = mainList
    ? pokemon.user
      ? "user-mon"
      : pokemon.pin && pokemon.mods
        ? `pin-mon-${`${pokemon.name.replace(/ /g, "-")}-${pokemon.speed}-${pokemon.mods.statPoints}-${pokemon.mods.nature}-${pokemon.mods.statChanges}-${pokemon.mods.tailwind}-${pokemon.mods.choiceScarf}-${pokemon.mods.paralyzed}`.toLowerCase()}`
        : ""
    : "";

  return (
    <div
      className={`flex gap-2 pl-2 transition-colors duration-100 ease-in-out ${bgColor} ${elementClassIdentifier}`}
      onClick={handleOnClick}
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
