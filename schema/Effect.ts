import { z } from "zod";
import { DamageType } from "./DamageType";

export const Duration = z.enum([
  "saveEnds",
  "endOfEncounter",
  "startOfEffectersTurn",
  "endOfEffectersTurn",
  "startOfEffectedTurn",
  "endOfEffectedTurn",
  //"permanent",
  "nextAttackRoll",
  "nextDamageRoll",
  "oneTime",
  // "enterZone",
  // "leaveZone",
]);

export const EffectName = z.enum([
  "Dazed",
  "Dominated",
  "Dying",
  "Grabbed",
  "Hidden",
  "Immobilized",
  "Deafened",
  "Helpless",
  "Blinded",
  "Petrified",
  "Removed from play",
  "Restrained",
  "Unconscious",
  "Weakened",
  "Prone",
  "Stunned",
  "Surprised",
  "Slowed",
  "Combat Advantage",
  "Marked",
  "Divine Challenge",
  "Divine Sanction",
  "Hunter's Quarry",
  "Warlock's Curse",
  "Immune",
  "Ongoing Damage",
  "Vulnerable",
  "Resist",
  "Regeneration",
  "Temporary Hit Points",
  "Healing",
  "Modify",
]);

export const EffectedAttribute = z.enum([
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
  "ac",
  "fortitude",
  "reflex",
  "attackRoll",
  "damage",
  "savingThrows",
  "deathSaves",
  "skillCheck",
  "abilityCheck",
  "speed",
]);

const EffectProperty = z.object({
  name: EffectName,
  effectedAttribute: EffectedAttribute.optional(),
  value: z.number().optional(),
  damageType: DamageType.optional(),
  additionalHealing: z.string().optional(),
});

const AfterEffectProperty = z.object({
  name: EffectName,
  effectedAttribute: EffectedAttribute.optional(),
  value: z.number().optional(),
  damageType: DamageType.optional(),
  additionalHealing: z.string().optional(),
  duration: Duration,
});

export const Effect = z.object({
  effectProperties: z.array(EffectProperty),
  duration: Duration,
  afterEffectProperties: z.array(AfterEffectProperty).optional(),
});
