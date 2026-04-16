import { PokemonSpeedWithAbility } from "./getPokemon";

export function alphaSortPokemonSpeeds(
  a: PokemonSpeedWithAbility,
  b: PokemonSpeedWithAbility,
) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
