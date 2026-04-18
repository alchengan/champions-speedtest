import pokemon from "../data/pokemonSpeeds.json";
// import pokemon from "../data/testSpeeds.json";

export type PokemonSpeed = {
  name: string;
  speed: number;
  abilities?: string[];
  pokeApiId: number;
};

export type PokemonSpeedWithAbility = {
  name: string;
  speed: number;
  ability?: string;
  user: boolean;
  team?: boolean;
  pin?: boolean;
  mods?: {
    statPoints: number;
    nature: string;
    statChanges: number;
    tailwind: boolean;
    choiceScarf: boolean;
    paralyzed: boolean;
  };
  pokeApiId: number;
};

export type PokemonTesteeOption = {
  label: string;
  pokemon: PokemonSpeed;
};

export function GetPokemonSpeeds(): PokemonSpeed[] {
  return pokemon;
}

export function GetPokemonSpeedsWithAbilities(): PokemonSpeedWithAbility[] {
  const pokemonSpeeds = GetPokemonSpeeds();

  const pokemonSpeedsWithAbilities: PokemonSpeedWithAbility[] =
    pokemonSpeeds.map((pokemon) => ({
      name: pokemon.name,
      speed: pokemon.speed,
      user: false,
      pokeApiId: pokemon.pokeApiId,
    }));

  // create separate instance of pokemon with speed changing ability
  pokemonSpeeds.forEach((pokemon) => {
    if (pokemon.abilities) {
      pokemon.abilities.forEach((ability) => {
        pokemonSpeedsWithAbilities.push({
          name: pokemon.name + " w/ " + ability,
          speed: pokemon.speed,
          ability: ability,
          user: false,
          pokeApiId: pokemon.pokeApiId,
        });
      });
    }
  });

  return pokemonSpeedsWithAbilities;
}

export function GetPokemonTesteeOptions(): PokemonTesteeOption[] {
  const options: PokemonTesteeOption[] = pokemon.map((pokemonObject) => ({
    label: pokemonObject.name,
    pokemon: pokemonObject,
  }));

  return options;
}
