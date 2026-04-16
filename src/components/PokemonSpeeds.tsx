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
import PokemonSpeedList from "./PokemonSpeedLIst";
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
  const [evPoints, setEvPoints] = useState(0);
  const [natureMod, setNatureMod] = useState<string>("neutral");
  const [statMods, setStatMods] = useState(0);
  const [isTailwind, setIsTailwind] = useState(false);
  const [isChoiceScarf, setIsChoiceScarf] = useState(false);
  const [isParalyzed, setIsParalyzed] = useState(false);

  useEffect(() => {
    const userMonOnList = document.getElementsByClassName("user-mon");
    userMonOnList?.item(0)?.scrollIntoView({
      behavior: "auto",
      block: "center",
    });
  }, [evPoints, natureMod, statMods, isTailwind, isChoiceScarf, isParalyzed]);

  // sort pokemon by name and then by speed
  const sortByAlpha = userPokemon
    ? [...GetPokemonSpeedsWithAbilities(), userPokemon]
    : [...GetPokemonSpeedsWithAbilities()];
  sortByAlpha.sort(alphaSortPokemonSpeeds);

  // calculate effective speeds
  const sortByAlphaCalculatedSpeeds = sortByAlpha.map((pokemon) => ({
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

  fasterPokemon.sort(alphaSortPokemonSpeeds);
  slowerPokemon.sort(alphaSortPokemonSpeeds);

  const handleListScroll = (e: any) => {
    if (!userPokemon) return;
    const userMonPosition = FindPokemonInList();
    const abovePokemon: PokemonSpeedWithAbility[] = [];
    const belowPokemon: PokemonSpeedWithAbility[] = [];

    if (userMonPosition === 1) abovePokemon.push(userPokemon);
    if (userMonPosition === -1) belowPokemon.push(userPokemon);

    setFasterPokemon(abovePokemon);
    setSlowerPokemon(belowPokemon);
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
        <div className="relative row-span-1 border-2 mr-6">
          <div className="absolute w-full bottom-0">
            <PokemonSpeedList pokemonList={fasterPokemon} bottomElements />
          </div>
        </div>
        <ScrollArea.Root id="speed-list" className={"row-span-3"}>
          <ScrollArea.Viewport
            className={"h-full border-r-1"}
            onScroll={handleListScroll}
          >
            <ScrollArea.Content className={"mr-6"}>
              <PokemonSpeedList
                pokemonList={sortByAlphaCalculatedSpeeds}
                mainList={true}
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
        <div className="row-span-1 border-2 mr-6">
          <PokemonSpeedList pokemonList={slowerPokemon} />
        </div>
      </div>
      <div className="w-1/2">
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
      </div>
    </div>
  );
}
