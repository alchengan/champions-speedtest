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
