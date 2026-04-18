import { useState, MouseEvent } from "react";
import { PokemonSpeedWithAbility } from "../helpers/getPokemon";
import PinIcon from "../icons/PinIcon";
import PokeballIcon from "../icons/PokeballIcon";
import { Popover } from "@mui/material";

interface PokemonSpeedGroupItemProps {
  pokemon: PokemonSpeedWithAbility;
  mainList: boolean;
  pinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  unpinPokemon?: (pokemon: PokemonSpeedWithAbility) => void;
  removePokemonFromTeam?: (pokemon: PokemonSpeedWithAbility) => void;
  handleTeamPokemonClick?: (pokemon: PokemonSpeedWithAbility) => void;
}

export default function PokemonSpeedGroupItem({
  pokemon,
  mainList,
  pinPokemon,
  unpinPokemon,
  removePokemonFromTeam,
  handleTeamPokemonClick,
}: PokemonSpeedGroupItemProps) {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

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

  const handlePinPopoverOpen = (e: MouseEvent<HTMLElement>) => {
    setPopoverAnchor(e.currentTarget);
  };

  const handlePinPopoverClose = () => {
    setPopoverAnchor(null);
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
    <div>
      <div
        className={`group flex gap-2 pl-2 transition-colors duration-100 ease-in-out ${bgColor} ${elementClassIdentifier}`}
        onClick={handleOnClick}
        onMouseEnter={handlePinPopoverOpen}
        onMouseLeave={handlePinPopoverClose}
      >
        <div className="size-6">
          {(pokemon.user || pokemon.team) && (
            <PokeballIcon handleRemoveFromTeam={handleRemoveFromTeam} />
          )}
          {!(pokemon.user || pokemon.team) && (
            <PinIcon isPinned={pokemon.pin || false} handlePin={handlePin} />
          )}
        </div>
        <p>{pokemon.name}</p>
      </div>
      {(pokemon.pin || pokemon.team) && pokemon.mods && (
        <Popover
          sx={{ pointerEvents: "none" }}
          open={!!popoverAnchor}
          anchorEl={popoverAnchor}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handlePinPopoverClose}
          disableRestoreFocus
        >
          <div className="p-2">
            <p>{pokemon.name}</p>
            <p>{pokemon.mods.statPoints} stat points</p>
            {pokemon.mods.nature !== "neutral" && (
              <p>{pokemon.mods.nature === "positive" ? "+" : "-"} nature</p>
            )}
            {pokemon.mods.statChanges !== 0 && (
              <p>
                {pokemon.mods.statChanges > 0 ? "+" : ""}
                {pokemon.mods.statChanges}
              </p>
            )}
            {pokemon.mods.tailwind && <p>Tailwind</p>}
            {pokemon.mods.choiceScarf && <p>Choice Scarf</p>}
            {pokemon.mods.paralyzed && <p>Paralyzed</p>}
          </div>
        </Popover>
      )}
    </div>
  );
}
