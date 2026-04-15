import { ScrollArea } from "@base-ui/react";
import { GetPokemonSpeedsWithAbilities } from "../helpers/getPokemon";
import { ChangeEvent, useEffect, useState } from "react";
import SpeedModifierOptions from "./SpeedModifierOptions";
import { FormControl } from "@mui/material";

export default function PokemonSpeeds() {
  const [pokemonSpeedsWithAbilities, setPokemonSpeedWithAbilities] = useState(
    GetPokemonSpeedsWithAbilities(),
  );
  const [
    sortedPokemonSpeedsWithAbilities,
    setSortedPokemonSpeedsWithAbilities,
  ] = useState(pokemonSpeedsWithAbilities);

  const [evPoints, setEvPoints] = useState(0);
  const [natureMod, setNatureMod] = useState<string>("neutral");
  const [statMods, setStatMods] = useState(0);
  const [isTailwind, setIsTailwind] = useState(false);
  const [isChoiceScarf, setIsChoiceScarf] = useState(false);
  const [isParalyzed, setIsParalyzed] = useState(false);

  // sort pokemon by speed and then by name
  useEffect(() => {}, [pokemonSpeedsWithAbilities]);

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
      <ScrollArea.Root className={"w-1/2 h-full"}>
        <ScrollArea.Viewport className={"h-full border-r-1"}>
          <ScrollArea.Content>
            <p>nononononoonononono</p>
            <p>
              Vernacular architecture is building done outside any academic
              tradition, and without professional guidance. It is not a
              particular architectural movement or style, but rather a broad
              category, encompassing a wide range and variety of building types,
              with differing methods of construction, from around the world,
              both historical and extant and classical and modern. Vernacular
              architecture constitutes 95% of the world's built environment, as
              estimated in 1995 by Amos Rapoport, as measured against the small
              percentage of new buildings every year designed by architects and
              built by engineers.
            </p>
            <p>
              This type of architecture usually serves immediate, local needs,
              is constrained by the materials available in its particular region
              and reflects local traditions and cultural practices. The study of
              vernacular architecture does not examine formally schooled
              architects, but instead that of the design skills and tradition of
              local builders, who were rarely given any attribution for the
              work. More recently, vernacular architecture has been examined by
              designers and the building industry in an effort to be more energy
              conscious with contemporary design and construction—part of a
              broader interest in sustainable design.
            </p>
            <p>
              This type of architecture usually serves immediate, local needs,
              is constrained by the materials available in its particular region
              and reflects local traditions and cultural practices. The study of
              vernacular architecture does not examine formally schooled
              architects, but instead that of the design skills and tradition of
              local builders, who were rarely given any attribution for the
              work. More recently, vernacular architecture has been examined by
              designers and the building industry in an effort to be more energy
              conscious with contemporary design and construction—part of a
              broader interest in sustainable design.
            </p>
            <p>
              This type of architecture usually serves immediate, local needs,
              is constrained by the materials available in its particular region
              and reflects local traditions and cultural practices. The study of
              vernacular architecture does not examine formally schooled
              architects, but instead that of the design skills and tradition of
              local builders, who were rarely given any attribution for the
              work. More recently, vernacular architecture has been examined by
              designers and the building industry in an effort to be more energy
              conscious with contemporary design and construction—part of a
              broader interest in sustainable design.
            </p>
            <p>
              This type of architecture usually serves immediate, local needs,
              is constrained by the materials available in its particular region
              and reflects local traditions and cultural practices. The study of
              vernacular architecture does not examine formally schooled
              architects, but instead that of the design skills and tradition of
              local builders, who were rarely given any attribution for the
              work. More recently, vernacular architecture has been examined by
              designers and the building industry in an effort to be more energy
              conscious with contemporary design and construction—part of a
              broader interest in sustainable design.
            </p>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={"flex justify-center bg-gray-200 w-[0.25rem] m-[0.5rem]"}
        >
          <ScrollArea.Thumb className={"w-full bg-gray-500"} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
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
