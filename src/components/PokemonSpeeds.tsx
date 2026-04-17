import { ScrollArea } from "@base-ui/react";
import {
  GetPokemonSpeedsWithAbilities,
  PokemonSpeedWithAbility,
} from "../helpers/getPokemon";
import { ChangeEvent, useEffect, useState } from "react";
import SpeedModifierOptions from "./SpeedModifierOptions";
import { FormControl } from "@mui/material";
import PokemonSpeedGroup from "./PokemonSpeedGroup";
import { CalculateSpeed } from "../helpers/speedFunctions";
import { FindPokemonInList } from "../helpers/checkMonVisibility";
import PokemonSpeedList from "./PokemonSpeedList";
import { alphaSortPokemonSpeeds } from "../helpers/otherHelpers";

interface PokemonSpeedsProps {
  userPokemon?: PokemonSpeedWithAbility;
}

export default function PokemonSpeeds({ userPokemon }: PokemonSpeedsProps) {
  const [fasterPokemon, setFasterPokemon] = useState<PokemonSpeedWithAbility[]>(
    [],
  );
  const [slowerPokemon, setSlowerPokemon] = useState<PokemonSpeedWithAbility[]>(
    [],
  );
  const [pinnedPokemon, setPinnedPokemon] = useState<PokemonSpeedWithAbility[]>(
    [],
  );

  const [evPoints, setEvPoints] = useState(0);
  const [natureMod, setNatureMod] = useState<string>("neutral");
  const [statMods, setStatMods] = useState(0);
  const [isTailwind, setIsTailwind] = useState(false);
  const [isChoiceScarf, setIsChoiceScarf] = useState(false);
  const [isParalyzed, setIsParalyzed] = useState(false);

  // keep user mon in view when changing list stats
  useEffect(() => {
    const userMonOnList = document.getElementsByClassName("user-mon");
    userMonOnList?.item(0)?.scrollIntoView({
      behavior: "auto",
      block: "center",
    });
  }, [evPoints, natureMod, statMods, isTailwind, isChoiceScarf, isParalyzed]);

  useEffect(() => {
    updateOutOfViewPokemon();
  }, [pinnedPokemon]);

  const everyPokemon = userPokemon
    ? [...GetPokemonSpeedsWithAbilities(), userPokemon]
    : [...GetPokemonSpeedsWithAbilities()];

  // calculate effective speeds
  const everyPokemonCalculatedSpeeds: PokemonSpeedWithAbility[] =
    everyPokemon.map((pokemon) => ({
      ...pokemon,
      speed: pokemon.user
        ? pokemon.speed
        : CalculateSpeed(
            pokemon.speed,
            evPoints,
            natureMod,
            pokemon.ability ? pokemon.ability : "",
            statMods,
            isTailwind,
            isChoiceScarf,
            isParalyzed,
          ),
    }));

  // add pinned pokemon into list, filtering out any that are already on list
  pinnedPokemon.forEach((pokemon) => {
    if (!pokemon.mods) return;

    if (
      pokemon.mods.statPoints === evPoints &&
      pokemon.mods.nature === natureMod &&
      pokemon.mods.statChanges === statMods &&
      pokemon.mods.tailwind === isTailwind &&
      pokemon.mods.choiceScarf === isChoiceScarf &&
      pokemon.mods.paralyzed === isParalyzed
    ) {
      const foundPinnedPokemon = everyPokemonCalculatedSpeeds.findIndex(
        (poke) =>
          pokemon.name === poke.name &&
          pokemon.speed === poke.speed &&
          !poke.user,
      );
      everyPokemonCalculatedSpeeds.splice(foundPinnedPokemon, 1);
    }

    everyPokemonCalculatedSpeeds.push(pokemon);
  });

  everyPokemonCalculatedSpeeds.sort(alphaSortPokemonSpeeds);
  fasterPokemon.sort(alphaSortPokemonSpeeds);
  slowerPokemon.sort(alphaSortPokemonSpeeds);

  const pinPokemon = (pokemon: PokemonSpeedWithAbility) => {
    const _pinnedPokemon = [...pinnedPokemon];
    const pokemonToPin = {
      ...pokemon,
      pin: true,
      mods: {
        statPoints: evPoints,
        nature: natureMod,
        statChanges: statMods,
        tailwind: isTailwind,
        choiceScarf: isChoiceScarf,
        paralyzed: isParalyzed,
      },
    };

    if (!_pinnedPokemon.includes(pokemonToPin)) {
      _pinnedPokemon.push(pokemonToPin);
      setPinnedPokemon(_pinnedPokemon);
    }
  };

  const unpinPokemon = (pokemon: PokemonSpeedWithAbility) => {
    const _pinnedPokemon = [...pinnedPokemon];
    const index = _pinnedPokemon.indexOf(pokemon);
    if (index > -1) {
      _pinnedPokemon.splice(index, 1);
      setPinnedPokemon(_pinnedPokemon);
    }
  };

  const updateOutOfViewPokemon = () => {
    const userAndPinnedMods = userPokemon
      ? [...pinnedPokemon, userPokemon]
      : pinnedPokemon;
    const abovePokemon: PokemonSpeedWithAbility[] = [];
    const belowPokemon: PokemonSpeedWithAbility[] = [];

    userAndPinnedMods.forEach((pokemon) => {
      const pokemonPosition = FindPokemonInList(pokemon);
      if (pokemonPosition === 1) abovePokemon.push(pokemon);
      if (pokemonPosition === -1) belowPokemon.push(pokemon);
      // else pokemon is visible on main list
    });

    setFasterPokemon(abovePokemon);
    setSlowerPokemon(belowPokemon);
  };

  const handleListScroll = (e: any) => {
    updateOutOfViewPokemon();
  };

  const handleEVFieldChange = (newValue: number | null, e: any) => {
    if (newValue) {
      setEvPoints(newValue);
    }
  };

  const handleEVPointsChange = (e: any, newValue: number) => {
    setEvPoints(newValue);
  };

  const handleNatureModChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNatureMod((e.target as HTMLInputElement).value);
  };

  const handleStatModsChange = (e: any, newValue: number) => {
    setStatMods(newValue);
  };

  const handleTailwindChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTailwind(e.target.checked);
  };

  const handleChoiceScarfChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChoiceScarf(e.target.checked);
  };

  const handleParalyzedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsParalyzed(e.target.checked);
  };

  return (
    <div className="flex h-full gap-x-6">
      <div className="w-1/2 h-full grid grid-rows-5">
        <div className="relative row-span-1 border-2">
          <div className="absolute w-full bottom-0">
            <PokemonSpeedList
              pokemonList={fasterPokemon}
              bottomElements
              pinPokemon={pinPokemon}
              unpinPokemon={unpinPokemon}
            />
          </div>
        </div>
        <ScrollArea.Root id="speed-list" className={"row-span-3"}>
          <ScrollArea.Viewport
            className={"h-full border-r-1"}
            onScroll={handleListScroll}
          >
            <ScrollArea.Content className={"mr-6"}>
              <PokemonSpeedList
                pokemonList={everyPokemonCalculatedSpeeds}
                mainList
                pinPokemon={pinPokemon}
                unpinPokemon={unpinPokemon}
              />
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className={"flex justify-center bg-gray-200 w-[0.25rem] m-[0.5rem]"}
          >
            <ScrollArea.Thumb className={"w-full bg-gray-500"} />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
        <div className="row-span-1 border-2">
          <PokemonSpeedList
            pokemonList={slowerPokemon}
            pinPokemon={pinPokemon}
            unpinPokemon={unpinPokemon}
          />
        </div>
      </div>
      <div className="w-1/2">
        <div className="grid gap-4">
          <FormControl fullWidth>
            <SpeedModifierOptions
              evPoints={evPoints}
              natureMod={natureMod}
              statMods={statMods}
              isTailwind={isTailwind}
              isChoiceScarf={isChoiceScarf}
              isParalyzed={isParalyzed}
              handleEVFieldChange={handleEVFieldChange}
              handleEVPointsChange={handleEVPointsChange}
              handleNatureModChange={handleNatureModChange}
              handleStatModsChange={handleStatModsChange}
              handleTailwindChange={handleTailwindChange}
              handleChoiceScarfChange={handleChoiceScarfChange}
              handleParalyzedChange={handleParalyzedChange}
            />
          </FormControl>
          <div className="border-2">
            <p className="text-xl font-bold">Pins</p>
            <PokemonSpeedList
              pokemonList={pinnedPokemon}
              pinPokemon={pinPokemon}
              unpinPokemon={unpinPokemon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
