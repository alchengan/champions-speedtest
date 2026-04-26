import { PokemonSpeedWithAbility } from "./getPokemon";

export function FindPokemonInList(pokemon: PokemonSpeedWithAbility): number {
  const pokemonOnList = pokemon.user
    ? document.getElementsByClassName("user-mon")?.item(0)
    : pokemon.pin && pokemon.mods
      ? document
          .getElementsByClassName(
            `pin-mon-${`${pokemon.name.replace(/ /g, "-")}-${pokemon.speed}-${pokemon.mods.statPoints}-${pokemon.mods.nature}-${pokemon.mods.statChanges}-${pokemon.mods.tailwind}-${pokemon.mods.choiceScarf}-${pokemon.mods.paralyzed}`.toLowerCase()}`,
          )
          ?.item(0)
      : pokemon.team && pokemon.mods
        ? document
            .getElementsByClassName(
              `team-mon-${`${pokemon.name.replace(/ /g, "-")}-${pokemon.speed}-${pokemon.mods.statPoints}-${pokemon.mods.nature}-${pokemon.mods.statChanges}-${pokemon.mods.tailwind}-${pokemon.mods.choiceScarf}-${pokemon.mods.paralyzed}`.toLowerCase()}`,
            )
            ?.item(0)
        : null;
  const speedList = document.getElementById("speed-list");

  if (pokemonOnList && speedList) {
    var userMonRect = pokemonOnList.getBoundingClientRect();
    var listRect = speedList.getBoundingClientRect();

    if (userMonRect.top < listRect.top) {
      return 1;
    }

    if (userMonRect.bottom > listRect.bottom) {
      return -1;
    }
  }

  return 0;
}

export function OverSpeedListOverflow(): boolean {
  const overSpeedList = document.getElementById("over-speed-list");
  const overSpeedListContainer = document.getElementById(
    "over-speed-list-container",
  );

  if (overSpeedList && overSpeedListContainer) {
    var overSpeedListRect = overSpeedList.getBoundingClientRect();
    var overSpeedListRectContainer =
      overSpeedListContainer.getBoundingClientRect();

    if (overSpeedListRect.height > overSpeedListRectContainer.height) {
      return true;
    }
  }

  return false;
}
