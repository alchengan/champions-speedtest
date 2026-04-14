import React, { ChangeEvent, MouseEventHandler, useState } from "react";
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

export default function PokemonBuild() {
  const [isTailwind, setIsTailwind] = useState(false);
  const [isChoiceScarf, setIsChoiceScarf] = useState(false);
  const [isParalyzed, setIsParalyzed] = useState(false);
  const [natureMod, setNatureMod] = useState<String>("neutral");
  const [evPoints, setEvPoints] = useState(0);

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

  // temp
  const pokemonList = [{ label: "Rotom-Wash", name: "Rotom-Wash" }];

  const handleNatureModChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNatureMod((e.target as HTMLInputElement).value);
  };

  const handleEVPointsChange = (e: Event, newValue: number) => {
    setEvPoints(newValue);
  };

  const handleEVFieldChange = (
    newValue: number | null,
    e: NumberFieldRootChangeEventDetails,
  ) => {
    if (newValue) {
      setEvPoints(newValue);
    }
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
              />
              <img
                src="https://archives.bulbagarden.net/media/upload/3/36/0479Rotom-Wash.png"
                className="w-48"
              />
            </div>
            <div className="grid content-between justify-items-start gap-y-2">
              <div className="grid justify-items-start">
                <p>Base Speed: 86</p>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Speed Ability"
                />
              </div>
              <div className="grid">
                <p className="text-2xl font-bold">Speed</p>
                <p className="text-8xl font-bold pb-4">106</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6">
            <NumberField
              label="EV Points"
              value={evPoints}
              step={1}
              min={0}
              max={32}
              size="small"
              onValueChange={handleEVFieldChange}
            />
            <Slider
              aria-label="EV Points"
              value={evPoints}
              shiftStep={1}
              step={1}
              min={0}
              max={32}
              onChange={handleEVPointsChange}
            />
          </div>
        </div>
        <div>
          <FormLabel>Stat Modifier</FormLabel>
          <Slider
            aria-label="Stat Modifier"
            defaultValue={0}
            valueLabelDisplay="auto"
            shiftStep={1}
            step={1}
            marks={statModMarks}
            min={-6}
            max={6}
            track={false}
          />
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
        <FormGroup row className="justify-between">
          <FormControlLabel control={<Checkbox />} label="Tailwind" />
          <FormControlLabel control={<Checkbox />} label="Choice Scarf" />
          <FormControlLabel control={<Checkbox />} label="Paralyzed" />
        </FormGroup>
      </FormControl>
    </>
  );
}
