import pokemon from "../data/pokemonSpeeds.json";

export type PokemonSpeed = {
  name: string;
  speed: number;
  abilities?: string[];
  pokeApiId: number;
};

export type PokemonTesteeOption = {
  label: string;
  pokemon: PokemonSpeed;
};

export function GetPokemonTesteeOptions(): PokemonTesteeOption[] {
  const options: PokemonTesteeOption[] = pokemon.map((pokemonObject) => ({
    label: pokemonObject.name,
    pokemon: pokemonObject,
  }));

  return options;
}
