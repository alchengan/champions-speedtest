import React, { ChangeEvent, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  GetPokemonTesteeOptions,
  PokemonSpeed,
  PokemonSpeedWithAbility,
  PokemonTesteeOption,
} from "../helpers/getPokemon";
import { CalculateSpeed } from "../helpers/speedFunctions";
import SpeedModifierOptions from "./SpeedModifierOptions";
import PokemonSpeedList from "./PokemonSpeedList";
import { Button } from "@mui/material";

interface PokemonBuildProps {
  handleUserPokemonChange: (
    name: string,
    speed: number,
    mods: {
      statPoints: number;
      nature: string;
      statChanges: number;
      tailwind: boolean;
      choiceScarf: boolean;
      paralyzed: boolean;
    },

    pokeApiId: number,
  ) => void;
  handleTeamPokemonChange: (teamPokemon: PokemonSpeedWithAbility[]) => void;
}

export default function PokemonBuild({
  handleUserPokemonChange,
  handleTeamPokemonChange,
}: PokemonBuildProps) {
  const [pokemonOption, setPokemonOption] =
    useState<PokemonTesteeOption | null>(null);

  const [testeePokemon, setTesteePokemon] = useState<PokemonSpeed>();
  const [baseSpeed, setBaseSpeed] = useState(0);

  const [evPoints, setEvPoints] = useState(0);
  const [natureMod, setNatureMod] = useState("neutral");
  const [abilityMod, setAbilityMod] = useState("");
  const [statMods, setStatMods] = useState(0);
  const [isTailwind, setIsTailwind] = useState(false);
  const [isChoiceScarf, setIsChoiceScarf] = useState(false);
  const [isParalyzed, setIsParalyzed] = useState(false);

  const [speedStat, setSpeedStat] = useState(0);

  const [teamPokemon, setTeamPokemon] = useState<PokemonSpeedWithAbility[]>([]);
  const [abilityLimbo, setAbilityLimbo] = useState("");

  useEffect(() => {
    if (pokemonOption) {
      setTesteePokemon(pokemonOption.pokemon);
    }
  }, [pokemonOption]);

  // when new pokemon is selected
  useEffect(() => {
    setBaseSpeed(testeePokemon ? testeePokemon.speed : 0);
    setAbilityMod(abilityLimbo);
    setAbilityLimbo("");
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
        {
          statPoints: evPoints,
          nature: natureMod,
          statChanges: statMods,
          tailwind: isTailwind,
          choiceScarf: isChoiceScarf,
          paralyzed: isParalyzed,
        },
        testeePokemon.pokeApiId,
      );
  }, [speedStat, testeePokemon]);

  // send team pokemon to main list
  useEffect(() => {
    handleTeamPokemonChange(teamPokemon);
  }, [teamPokemon]);

  const pokemonList = GetPokemonTesteeOptions();

  const handlePokemonChange = (
    e: any,
    newPokemon: PokemonTesteeOption | null,
  ) => {
    if (newPokemon) {
      setPokemonOption(newPokemon);
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

  const handleAddToTeam = () => {
    if (!testeePokemon) return;

    const _teamPokemon = [...teamPokemon];
    const pokemonToAdd = {
      name:
        abilityMod === ""
          ? testeePokemon.name
          : testeePokemon.name + " w/ " + abilityMod,
      speed: CalculateSpeed(
        baseSpeed,
        evPoints,
        natureMod,
        abilityMod,
        statMods,
        isTailwind,
        isChoiceScarf,
        isParalyzed,
      ),
      ...(abilityMod !== "" && { ability: abilityMod }),
      user: false,
      team: true,
      mods: {
        statPoints: evPoints,
        nature: natureMod,
        statChanges: statMods,
        tailwind: isTailwind,
        choiceScarf: isChoiceScarf,
        paralyzed: isParalyzed,
      },
      pokeApiId: testeePokemon.pokeApiId,
    };

    if (
      !_teamPokemon.some(
        (pokemon) =>
          pokemon.name === pokemonToAdd.name &&
          pokemon.speed === pokemonToAdd.speed &&
          pokemon.mods?.statPoints === pokemonToAdd.mods?.statPoints &&
          pokemon.mods.nature === pokemonToAdd.mods.nature &&
          pokemon.mods.statChanges === pokemonToAdd.mods.statChanges &&
          pokemon.mods.tailwind === pokemonToAdd.mods.tailwind &&
          pokemon.mods.choiceScarf === pokemonToAdd.mods.choiceScarf &&
          pokemon.mods.paralyzed === pokemonToAdd.mods.paralyzed,
      )
    ) {
      _teamPokemon.push(pokemonToAdd);
      setTeamPokemon(_teamPokemon);
    }
  };

  const handleRemoveFromTeam = (pokemon: PokemonSpeedWithAbility) => {
    const _teamPokemon = [...teamPokemon];
    const index = _teamPokemon.indexOf(pokemon);
    if (index > -1) {
      _teamPokemon.splice(index, 1);
      setTeamPokemon(_teamPokemon);
    }
  };

  const handleTeamClick = (pokemon: PokemonSpeedWithAbility) => {
    const teamPokemonName = pokemon.name.split(" w/ ")[0];
    const teamPokemonOption = pokemonList.find(
      (poke) => poke.label === teamPokemonName,
    );
    setPokemonOption(teamPokemonOption || null);

    if (pokemon.mods) {
      setEvPoints(pokemon.mods.statPoints);
      setNatureMod(pokemon.mods.nature);
      setStatMods(pokemon.mods.statChanges);
      setIsTailwind(pokemon.mods.tailwind);
      setIsChoiceScarf(pokemon.mods.choiceScarf);
      setIsParalyzed(pokemon.mods.paralyzed);
    }

    // wack ass limbo thing so changing the testee won't set ability to "" after setting it correctly
    setAbilityLimbo(pokemon.ability || "");
  };

  return (
    <div className="grid gap-4">
      <p className="text-2xl font-bold italic">Champions Speedtest</p>
      <p className="text-xl font-bold">Your Pokémon</p>
      <FormControl fullWidth>
        <div className="flex gap-x-6">
          <div className="grid w-1/2">
            <Autocomplete
              disablePortal
              value={pokemonOption}
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
        <Button variant="contained" onClick={handleAddToTeam}>
          Add to team
        </Button>
      </FormControl>
      <div>
        <p className="text-xl font-bold border-2">Your Team</p>
        <PokemonSpeedList
          pokemonList={teamPokemon}
          removePokemonFromTeam={handleRemoveFromTeam}
          handleTeamPokemonClick={handleTeamClick}
        />
      </div>
    </div>
  );
}
