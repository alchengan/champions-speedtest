import { PokemonSpeedWithAbility } from "../helpers/getPokemon";
import PokemonSpeedGroupItem from "./PokemonSpeedGroupItem";

interface PokemonSpeedGroupProps {
  speed: number;
  pokemon: PokemonSpeedWithAbility[];
  mainList: boolean;
  teamList: boolean;
  classTag: string;
  pinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  unpinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  removePokemonFromTeam?: (pokemon: PokemonSpeedWithAbility) => void;
  handleTeamPokemonClick?: (pokemon: PokemonSpeedWithAbility) => void;
  handleTeamPokemonEdit?: (pokemon: PokemonSpeedWithAbility) => void;
}

export default function PokemonSpeedGroup({
  speed,
  pokemon,
  mainList,
  teamList,
  classTag,
  pinPokemon,
  unpinPokemon,
  removePokemonFromTeam,
  handleTeamPokemonClick,
  handleTeamPokemonEdit,
}: PokemonSpeedGroupProps) {
  return (
    <div className="border-b-2 last:border-0">
      <div className="flex justify-between gap-4">
        <div className="grow">
          {pokemon.map((poke) => (
            <PokemonSpeedGroupItem
              key={`item-${poke.name}${poke.user ? "-user" : ""}${poke.team ? "-team" : ""}${poke.pin ? "-pin" : ""}${mainList ? "-main" : ""}${poke.mods ? `-${poke.mods.statPoints}-${poke.mods.nature}-${poke.mods.statChanges}-${poke.mods.tailwind}-${poke.mods.choiceScarf}-${poke.mods.paralyzed}` : ""}`}
              pokemon={poke}
              mainList={mainList}
              classTag={classTag}
              teamList={teamList}
              pinPokemon={pinPokemon}
              unpinPokemon={unpinPokemon}
              removePokemonFromTeam={removePokemonFromTeam}
              handleTeamPokemonClick={handleTeamPokemonClick}
              handleTeamPokemonEdit={handleTeamPokemonEdit}
            />
          ))}
        </div>
        <p className={`w-10 pr-2 text-lg font-bold`}>{speed}</p>
      </div>
    </div>
  );
}
