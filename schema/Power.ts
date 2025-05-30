import { z } from "zod";
import { Effect, EffectName } from "./Effect";

const keywords = z.enum([
  "Range",
  "Melee",
  "Acid",
  "Arcane",
  "Augmentable",
  "Aura",
  "Beast",
  "Beast Form",
  "Bladespell",
  "Channel Divinity",
  "Charm",
  "Cold",
  "Conjuration",
  "Divine",
  "Elemental",
  "Enchantment",
  "Evocation",
  "Fear",
  "Fire",
  "Force",
  "Full Discipline",
  "Healing",
  "Illusion",
  "Implement",
  "Invigorating",
  "Lightning",
  "Martial",
  "Necromancy",
  "Necrotic",
  "Nethermancy",
  "Poison",
  "Polymorph",
  "Primal",
  "Psionic",
  "Psychic",
  "Radiant",
  "Rage",
  "Rattling",
  "Reliable",
  "Runic",
  "Shadow",
  "Sleep",
  "Spirit",
  "Stance",
  "Summoning",
  "Teleportation",
  "Thunder",
  "Transmutation",
  "Varies",
  "Weapon",
  "Zone",
]);

export const Power = z.object({
  name: z.string(),
  flavor: z.string(),
  type: z.enum(["daily", "at-will", "encounter"]),
  action: z.enum([
    "standard",
    "move",
    "minor",
    "free",
    "noAction",
    "immediateInterrupt",
    "immediateReaction",
  ]),
  target: z.string(),
  keywords: z.array(keywords),
  attack: z.string().optional(),
  damage: z.string().optional(),
  damageLevel21: z.string().optional(),
  missDamage: z.string().optional(),
  onHitEffects: z.array(Effect),
  onMissEffects: z.array(Effect),
  onEffects: z.array(Effect),
});
