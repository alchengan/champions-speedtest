import React, { ChangeEvent, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  GetPokemonTesteeOptions,
  PokemonSpeed,
  PokemonTesteeOption,
} from "../helpers/getPokemon";
import { CalculateSpeed } from "../helpers/speedFunctions";
import SpeedModifierOptions from "./SpeedModifierOptions";

interface PokemonBuildProps {
  handleUserPokemonChange: (
    name: string,
    speed: number,
    pokeApiId: number,
  ) => void;
}

export default function PokemonBuild({
  handleUserPokemonChange,
}: PokemonBuildProps) {
  const [testeePokemon, setTesteePokemon] = useState<PokemonSpeed>();
  const [baseSpeed, setBaseSpeed] = useState(0);

  const [evPoints, setEvPoints] = useState(0);
  const [natureMod, setNatureMod] = useState<string>("neutral");
  const [abilityMod, setAbilityMod] = useState<string>("");
  const [statMods, setStatMods] = useState(0);
  const [isTailwind, setIsTailwind] = useState(false);
  const [isChoiceScarf, setIsChoiceScarf] = useState(false);
  const [isParalyzed, setIsParalyzed] = useState(false);

  const [speedStat, setSpeedStat] = useState(0);

  // when new pokemon is selected
  useEffect(() => {
    setBaseSpeed(testeePokemon ? testeePokemon.speed : 0);
    setAbilityMod("");
  }, [testeePokemon]);

  // when any changes to stats are made
  // calculate speed
  useEffect(() => {
    setSpeedStat(
      CalculateSpeed(
        baseSpeed,
        evPoints,
        natureMod,
        abilityMod,
        statMods,
        isTailwind,
        isChoiceScarf,
        isParalyzed,
      ),
    );
  }, [
    baseSpeed,
    evPoints,
    natureMod,
    abilityMod,
    statMods,
    isTailwind,
    isChoiceScarf,
    isParalyzed,
  ]);

  // update user pokemon
  useEffect(() => {
    testeePokemon &&
      handleUserPokemonChange(
        testeePokemon.name,
        speedStat,
        testeePokemon.pokeApiId,
      );
  }, [speedStat]);

  const pokemonList = GetPokemonTesteeOptions();

  const handlePokemonChange = (
    e: any,
    newPokemon: PokemonTesteeOption | null,
  ) => {
    if (newPokemon) {
      setTesteePokemon(newPokemon.pokemon);
    }
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

  const handleAbilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === abilityMod) {
      setAbilityMod("");
    } else {
      setAbilityMod(e.target.value);
    }
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
    <>
      <p className="text-xl font-bold pb-4">Your Pokémon</p>

      <FormControl fullWidth>
        <div className="flex gap-x-6">
          <div className="grid w-1/2">
            <Autocomplete
              disablePortal
              options={pokemonList}
              renderInput={(params) => (
                <TextField {...params} label="Choose Pokémon" />
              )}
              onChange={handlePokemonChange}
            />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${testeePokemon?.pokeApiId}.png`}
              className="w-48 py-4"
            />
          </div>
          <div className="grid w-1/2 gap-y-2">
            <p className="justify-self-start self-baseline mt-3 text-xl font-bold">{`Base Speed: ${baseSpeed === 0 ? "-" : baseSpeed}`}</p>
            <div className="grid justify-self-center-safe">
              <p className="text-2xl font-bold">Speed</p>
              <p className="text-8xl font-bold pb-4">
                {baseSpeed === 0 ? "-" : speedStat}
              </p>
            </div>
          </div>
        </div>
        <SpeedModifierOptions
          testeePokemon={testeePokemon}
          evPoints={evPoints}
          natureMod={natureMod}
          abilityMod={abilityMod}
          statMods={statMods}
          isTailwind={isTailwind}
          isChoiceScarf={isChoiceScarf}
          isParalyzed={isParalyzed}
          handleEVFieldChange={handleEVFieldChange}
          handleEVPointsChange={handleEVPointsChange}
          handleNatureModChange={handleNatureModChange}
          handleAbilityChange={handleAbilityChange}
          handleStatModsChange={handleStatModsChange}
          handleTailwindChange={handleTailwindChange}
          handleChoiceScarfChange={handleChoiceScarfChange}
          handleParalyzedChange={handleParalyzedChange}
        />
      </FormControl>
    </>
  );
}
