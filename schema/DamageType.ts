import { z } from "zod";

export const DamageType = z.array(
  z.enum([
    "acid",
    "cold",
    "fire",
    "force",
    "lightning",
    "necrotic",
    "poison",
    "psychic",
    "radiant",
    "thunder",
    "none",
  ]),
);
