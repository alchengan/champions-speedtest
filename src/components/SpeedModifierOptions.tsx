import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import NumberField from "./NumberField";
import { ChangeEvent } from "react";
import { PokemonSpeed } from "../helpers/getPokemon";

export interface SpeedModifierOptionsProps {
  testeePokemon?: PokemonSpeed;
  evPoints: number;
  natureMod: string;
  abilityMod?: string;
  statMods: number;
  isTailwind: boolean;
  isChoiceScarf: boolean;
  isParalyzed: boolean;
  handleEVFieldChange: (newValue: number | null, e: any) => void;
  handleEVPointsChange: (e: any, newValue: number) => void;
  handleNatureModChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAbilityChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStatModsChange: (e: any, newValue: number) => void;
  handleTailwindChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChoiceScarfChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleParalyzedChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SpeedModifierOptions({
  testeePokemon,
  evPoints,
  natureMod,
  abilityMod,
  statMods,
  isTailwind,
  isChoiceScarf,
  isParalyzed,
  handleEVFieldChange,
  handleEVPointsChange,
  handleNatureModChange,
  handleAbilityChange,
  handleStatModsChange,
  handleTailwindChange,
  handleChoiceScarfChange,
  handleParalyzedChange,
}: SpeedModifierOptionsProps) {
  const statModMarks = Array.from({ length: 13 }, (v, i) => i - 6).map(
    (num) => ({
      value: num,
      label: num > 0 ? `+${num}` : `${num}`,
    }),
  );

  return (
    <>
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
          handleAbilityChange &&
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
      <FormGroup>
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
      </FormGroup>
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
            <Checkbox checked={isParalyzed} onChange={handleParalyzedChange} />
          }
          label="Paralyzed"
        />
      </FormGroup>
    </>
  );
}
