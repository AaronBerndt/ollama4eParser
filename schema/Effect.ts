import { z } from "zod";
import { DamageType } from "./DamageType";

const Duration = z.enum([
  "saveEnds",
  "endOfEncounter",
  "trigger",
  "startOfEffectersTurn",
  "endOfEffectersTurn",
  "startOfEffectedTurn",
  "endOfEffectedTurn",
  "permanent",
  "nextAttackRoll",
  "nextDamageRoll",
  "oneTime",
  "enterZone",
  "leaveZone",
]);

const EffectName = z.enum([
  "Marked",
  "Divine Challenge",
  "Divine Sanction",
  "Dazed",
  "Dominated",
  "Dying",
  "Buff",
  "Debuff",
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
  "Ongoing Damage",
]);

const EffectedAttribute = z.enum([
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
  "vulnerable",
  "resist",
  "immune",
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
  damageType: z.string().optional(),
});

export const Effect = z.object({
  effectProperties: z.array(EffectProperty),
  duration: Duration,
  afterEffectProperties: z.array(EffectProperty).optional(),
});
