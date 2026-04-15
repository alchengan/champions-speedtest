import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import NumberField from "./NumberField";
import { NumberFieldRootChangeEventDetails } from "@base-ui/react";
import {
  GetPokemonTesteeOptions,
  PokemonSpeed,
  PokemonTesteeOption,
} from "../helpers/getPokemon";

export default function PokemonBuild() {
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
  }, [testeePokemon]);

  // when any changes to stats are made
  // calculate speed
  useEffect(() => {
    const natureValue =
      natureMod === "negative" ? 0.9 : natureMod === "positive" ? 1.1 : 1;
    const preModSpeed = Math.floor((baseSpeed + evPoints + 20) * natureValue);

    // other speed changes in order (round down after each one):
    // stat changes
    const statMod =
      statMods > 0 ? (2 + statMods) / 2 : statMods < 0 ? 2 / (2 - statMods) : 1;
    const statModSpeed = Math.floor(preModSpeed * statMod);

    // tailwind
    const tailwindSpeed = isTailwind ? statModSpeed * 2 : statModSpeed;

    // ability
    //  x2: chlorophyll, sand rush, slush rush, surge surfer, swift swim, unburden
    //  x1.5: protosynthesis, quark drive, quick feet
    const abilityModifier = [
      "Chlorophyll",
      "Sand Rush",
      "Slush Rush",
      "Surge Surfer",
      "Swift Swim",
      "Unburden",
    ].includes(abilityMod)
      ? 2
      : ["Protosynthesis", "Quark Drive", "Quick Feet"].includes(abilityMod)
        ? 1.5
        : 1;
    const abilityModSpeed = Math.floor(tailwindSpeed * abilityModifier);

    // choice scarf
    const choiceScarfSpeed = isChoiceScarf
      ? abilityModSpeed * 1.5
      : abilityModSpeed;

    // para
    const paralyzedSpeed = isParalyzed
      ? Math.floor(choiceScarfSpeed * 0.5)
      : choiceScarfSpeed;

    setSpeedStat(paralyzedSpeed);
  }, [
    baseSpeed,
    evPoints,
    natureMod,
    statMods,
    abilityMod,
    isTailwind,
    isChoiceScarf,
    isParalyzed,
  ]);

  const statModMarks = [
    {
      value: -6,
      label: "-6",
    },
    {
      value: -5,
      label: "-5",
    },
    {
      value: -4,
      label: "-4",
    },
    {
      value: -3,
      label: "-3",
    },
    {
      value: -2,
      label: "-2",
    },
    {
      value: -1,
      label: "-1",
    },
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "+1",
    },
    {
      value: 2,
      label: "+2",
    },
    {
      value: 3,
      label: "+3",
    },
    {
      value: 4,
      label: "+4",
    },
    {
      value: 5,
      label: "+5",
    },
    {
      value: 6,
      label: "+6",
    },
  ];

  const pokemonList = GetPokemonTesteeOptions();

  const handlePokemonChange = (
    e: any,
    newPokemon: PokemonTesteeOption | null,
  ) => {
    if (newPokemon) {
      setTesteePokemon(newPokemon.pokemon);
    }
  };

  const handleEVFieldChange = (
    newValue: number | null,
    e: NumberFieldRootChangeEventDetails,
  ) => {
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
      <FormControl fullWidth>
        <div>
          <div className="flex gap-x-6">
            <div className="grid">
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
            <div className="grid content-between justify-items-start gap-y-2">
              <div className="grid justify-items-start">
                <p>{`Base Speed: ${baseSpeed === 0 ? "-" : baseSpeed}`}</p>
              </div>
              <div className="grid">
                <p className="text-2xl font-bold">Speed</p>
                <p className="text-8xl font-bold pb-4">
                  {baseSpeed === 0 ? "-" : speedStat}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6">
            <NumberField
              label="Stat Points"
              value={evPoints}
              step={1}
              min={0}
              max={32}
              size="small"
              onValueChange={handleEVFieldChange}
            />
            <Slider
              aria-label="Stat Points"
              value={evPoints}
              shiftStep={1}
              step={1}
              min={0}
              max={32}
              onChange={handleEVPointsChange}
            />
          </div>
        </div>
        <FormGroup row className="gap-6">
          <FormLabel className="mt-2">Nature</FormLabel>
          <RadioGroup
            name="nature-mod"
            value={natureMod}
            onChange={handleNatureModChange}
            row
            className="justify-between gap-4"
          >
            <FormControlLabel value="negative" control={<Radio />} label="-" />
            <FormControlLabel value="neutral" control={<Radio />} label="o" />
            <FormControlLabel value="positive" control={<Radio />} label="+" />
          </RadioGroup>
        </FormGroup>
        <FormGroup row className="gap-6">
          {testeePokemon?.abilities &&
            testeePokemon.abilities.map((ability) => (
              <FormControlLabel
                key={`${ability}-checkbox`}
                value={ability}
                control={
                  <Checkbox
                    checked={abilityMod === ability}
                    onChange={handleAbilityChange}
                  />
                }
                label={ability}
              />
            ))}
        </FormGroup>
        <div>
          <FormLabel>Stat Modifiers</FormLabel>
          <Slider
            aria-label="Stat Modifiers"
            value={statMods}
            onChange={handleStatModsChange}
            valueLabelDisplay="auto"
            shiftStep={1}
            step={1}
            marks={statModMarks}
            min={-6}
            max={6}
            track={false}
          />
        </div>
        <FormGroup row className="justify-between">
          <FormControlLabel
            control={
              <Checkbox checked={isTailwind} onChange={handleTailwindChange} />
            }
            label="Tailwind"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChoiceScarf}
                onChange={handleChoiceScarfChange}
              />
            }
            label="Choice Scarf"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isParalyzed}
                onChange={handleParalyzedChange}
              />
            }
            label="Paralyzed"
          />
        </FormGroup>
      </FormControl>
    </>
  );
}
