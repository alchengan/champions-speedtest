export function GetAbilitySpeedModifier(ability: string): number {
  const abilityModifier = [
    "Chlorophyll",
    "Sand Rush",
    "Slush Rush",
    "Surge Surfer",
    "Swift Swim",
    "Unburden",
  ].includes(ability)
    ? 2
    : ["Protosynthesis", "Quark Drive", "Quick Feet"].includes(ability)
      ? 1.5
      : 1;
  return abilityModifier;
}

export function CalculateSpeed(
  baseSpeed: number,
  evPoints: number,
  natureMod: string,
  abilityMod: string,
  statMods: number,
  isTailwind: boolean,
  isChoiceScarf: boolean,
  isParalyzed: boolean,
): number {
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
  const abilityModSpeed = Math.floor(
    tailwindSpeed * GetAbilitySpeedModifier(abilityMod),
  );

  // choice scarf
  const choiceScarfSpeed = isChoiceScarf
    ? Math.floor(abilityModSpeed * 1.5)
    : abilityModSpeed;

  // para
  const paralyzedSpeed = isParalyzed
    ? Math.floor(choiceScarfSpeed * 0.5)
    : choiceScarfSpeed;

  return paralyzedSpeed;
}
