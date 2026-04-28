import { PokemonSpeedWithAbility } from "../helpers/getPokemon";
import PinIcon from "../icons/PinIcon";
import PokeballIcon from "../icons/PokeballIcon";
import WindIcon from "../icons/WindIcon";
import LightningIcon from "../icons/LightningIcon";
import EditIcon from "../icons/EditIcon";

interface PokemonSpeedGroupItemProps {
  pokemon: PokemonSpeedWithAbility;
  mainList: boolean;
  teamList: boolean;
  classTag: string;
  pinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  unpinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  removePokemonFromTeam?: (pokemon: PokemonSpeedWithAbility) => void;
  handleTeamPokemonClick?: (pokemon: PokemonSpeedWithAbility) => void;
  handleTeamPokemonEdit?: (pokemon: PokemonSpeedWithAbility) => void;
}

export default function PokemonSpeedGroupItem({
  pokemon,
  mainList,
  teamList,
  classTag,
  pinPokemon,
  unpinPokemon,
  removePokemonFromTeam,
  handleTeamPokemonClick,
  handleTeamPokemonEdit,
}: PokemonSpeedGroupItemProps) {
  const handlePin = () => {
    if (!pinPokemon || !unpinPokemon) return;

    if (pokemon.pin) {
      unpinPokemon(pokemon);
    } else {
      pinPokemon(pokemon);
    }
  };

  const handleRemoveFromTeam = () => {
    if (!removePokemonFromTeam) return;
    removePokemonFromTeam(pokemon);
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

    if (pokemon.team && pokemon.mods) {
      if (handleTeamPokemonClick) {
        handleTeamPokemonClick(pokemon);
      } else {
        const teamMonOnList = document.getElementsByClassName(
          `team-mon-${`${pokemon.name.replace(/ /g, "-")}-${pokemon.speed}-${pokemon.mods.statPoints}-${pokemon.mods.nature}-${pokemon.mods.statChanges}-${pokemon.mods.tailwind}-${pokemon.mods.choiceScarf}-${pokemon.mods.paralyzed}`.toLowerCase()}`,
        );
        teamMonOnList?.item(0)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
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

  const handleEditOnClick = (e: any) => {
    if (handleTeamPokemonEdit) {
      handleTeamPokemonEdit(pokemon);
      e.stopPropagation();
    }
  };

  const bgColor = pokemon.user
    ? "bg-green-300 hover:bg-green-400"
    : pokemon.pin
      ? "bg-yellow-400 hover:bg-yellow-500"
      : pokemon.team
        ? "bg-blue-300 hover:bg-blue-400"
        : "hover:bg-slate-300";

  const elementClassIdentifier = mainList
    ? pokemon.user // user pokemon
      ? "user-mon"
      : pokemon.pin && pokemon.mods // pinned pokemon
        ? `pin-mon-${`${pokemon.name.replace(/ /g, "-")}-${pokemon.speed}-${pokemon.mods.statPoints}-${pokemon.mods.nature}-${pokemon.mods.statChanges}-${pokemon.mods.tailwind}-${pokemon.mods.choiceScarf}-${pokemon.mods.paralyzed}`.toLowerCase()}`
        : pokemon.team && pokemon.mods // team pokemon
          ? `team-mon-${`${pokemon.name.replace(/ /g, "-")}-${pokemon.speed}-${pokemon.mods.statPoints}-${pokemon.mods.nature}-${pokemon.mods.statChanges}-${pokemon.mods.tailwind}-${pokemon.mods.choiceScarf}-${pokemon.mods.paralyzed}`.toLowerCase()}`
          : `search-mon-${pokemon.name.replace(/ /g, "-").toLowerCase()}` // non-user non-pinned searchable pokemon
    : ""; // not in main list

  return (
    <div
      className={`${classTag} group flex justify-between px-2 transition-colors duration-100 ease-in-out ${bgColor} ${elementClassIdentifier}`}
      onClick={handleOnClick}
    >
      <div className="flex gap-2">
        <div className="size-6">
          {(pokemon.user || pokemon.team) && (
            <PokeballIcon
              team={pokemon.team || false}
              handleRemoveFromTeam={handleRemoveFromTeam}
            />
          )}
          {!(pokemon.user || pokemon.team) && (
            <PinIcon isPinned={pokemon.pin || false} handlePin={handlePin} />
          )}
        </div>
        <p>{pokemon.name}</p>
        {pokemon.mods && (
          <>
            <p className="text-neutral-600">{`${(pokemon.mods.statChanges < 0 ? pokemon.mods.statChanges : pokemon.mods.statChanges > 0 ? "+" + pokemon.mods.statChanges : "") + " "}${pokemon.mods.statPoints}${pokemon.mods.nature === "positive" ? "+" : pokemon.mods.nature === "negative" ? "-" : ""} Spe`}</p>
            {pokemon.mods.tailwind && <WindIcon />}
            {pokemon.mods.choiceScarf && (
              <img
                src={require("./../icons/Bag_Choice_Scarf_Sprite.png")}
                alt="Choice Scarf icon"
                className="size-6"
              />
            )}
            {pokemon.mods.paralyzed && <LightningIcon />}
          </>
        )}
      </div>
      {teamList && <EditIcon handleEditOnClick={handleEditOnClick} />}
    </div>
  );
}
