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

type PokemonSpeedGroups = { [speed: number]: PokemonSpeedWithAbility[] };

interface PokemonSpeedsProps {
  userPokemon?: PokemonSpeedWithAbility;
}

export default function PokemonSpeeds({ userPokemon }: PokemonSpeedsProps) {
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
  sortByAlpha.sort((a: PokemonSpeedWithAbility, b: PokemonSpeedWithAbility) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

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

  const sortBySpeed = sortByAlphaCalculatedSpeeds.reduce(
    (map: PokemonSpeedGroups, poke: PokemonSpeedWithAbility) => {
      if (!(poke.speed in map)) {
        map[poke.speed] = [];
      }
      map[poke.speed].push(poke);
      return map;
    },
    {} as PokemonSpeedGroups,
  );

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
        <div className="row-span-1 border-2"></div>
        <ScrollArea.Root className={"row-span-3"}>
          <ScrollArea.Viewport className={"h-full border-r-1"}>
            <ScrollArea.Content className={"mr-6"}>
              {Object.keys(sortBySpeed)
                .reverse()
                .map((speed) => (
                  <PokemonSpeedGroup
                    key={`speed-group-${speed}`}
                    speed={+speed}
                    pokemon={sortBySpeed[+speed]}
                  />
                ))}
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className={"flex justify-center bg-gray-200 w-[0.25rem] m-[0.5rem]"}
          >
            <ScrollArea.Thumb className={"w-full bg-gray-500"} />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
        <div className="row-span-1 border-2"></div>
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
