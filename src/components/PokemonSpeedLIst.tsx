import { PokemonSpeedWithAbility } from "../helpers/getPokemon";
import PokemonSpeedGroup from "./PokemonSpeedGroup";

type PokemonSpeedGroups = { [speed: number]: PokemonSpeedWithAbility[] };

interface PokemonSpeedListProps {
  pokemonList: PokemonSpeedWithAbility[];
  mainList?: boolean;
  bottomElements?: boolean;
  pinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  unpinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  removePokemonFromTeam?: (pokemon: PokemonSpeedWithAbility) => void;
  handleTeamPokemonClick?: (pokemon: PokemonSpeedWithAbility) => void;
}

export default function PokemonSpeedList({
  pokemonList,
  mainList,
  pinPokemon,
  unpinPokemon,
  removePokemonFromTeam,
  handleTeamPokemonClick,
}: PokemonSpeedListProps) {
  const sortBySpeed = pokemonList.reduce(
    (map: PokemonSpeedGroups, poke: PokemonSpeedWithAbility) => {
      if (!(poke.speed in map)) {
        map[poke.speed] = [];
      }
      map[poke.speed].push(poke);
      return map;
    },
    {} as PokemonSpeedGroups,
  );

  return (
    <>
      {Object.keys(sortBySpeed)
        .reverse()
        .map((speed) => (
          <PokemonSpeedGroup
            key={`speed-group-${speed}`}
            speed={+speed}
            pokemon={sortBySpeed[+speed]}
            mainList={mainList || false}
            pinPokemon={pinPokemon}
            unpinPokemon={unpinPokemon}
            removePokemonFromTeam={removePokemonFromTeam}
            handleTeamPokemonClick={handleTeamPokemonClick}
          />
        ))}
    </>
  );
}
