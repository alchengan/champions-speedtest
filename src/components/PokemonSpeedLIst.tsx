import { PokemonSpeedWithAbility } from "../helpers/getPokemon";
import PokemonSpeedGroup from "./PokemonSpeedGroup";

type PokemonSpeedGroups = { [speed: number]: PokemonSpeedWithAbility[] };

interface PokemonSpeedListProps {
  pokemonList: PokemonSpeedWithAbility[];
  mainList?: boolean;
  teamList?: boolean;
  classTag: string;
  pinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  unpinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  removePokemonFromTeam?: (pokemon: PokemonSpeedWithAbility) => void;
  handleTeamPokemonClick?: (pokemon: PokemonSpeedWithAbility) => void;
  handleTeamPokemonEdit?: (pokemon: PokemonSpeedWithAbility) => void;
}

export default function PokemonSpeedList({
  pokemonList,
  mainList,
  teamList,
  classTag,
  pinPokemon,
  unpinPokemon,
  removePokemonFromTeam,
  handleTeamPokemonClick,
  handleTeamPokemonEdit,
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
            teamList={teamList || false}
            classTag={classTag}
            pinPokemon={pinPokemon}
            unpinPokemon={unpinPokemon}
            removePokemonFromTeam={removePokemonFromTeam}
            handleTeamPokemonClick={handleTeamPokemonClick}
            handleTeamPokemonEdit={handleTeamPokemonEdit}
          />
        ))}
    </>
  );
}
