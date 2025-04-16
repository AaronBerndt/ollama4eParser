import { generateMock } from "@anatine/zod-mock";
import { Power } from "./schema/Power";
import { effect, z } from "zod";
import { Duration, EffectedAttribute, EffectName } from "./schema/Effect";
import { DamageType } from "./schema/DamageType";

const abilityScore = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];

function returnRandomDuration() {
  const options = Duration.options;
  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex];
}

function getRandomNumber(): number {
  return Math.floor(Math.random() * 21) - 10;
}

function returnRandomDiceFormula(): string {
  // Generate a random number between 1 and 12
  const number = Math.floor(Math.random() * 12) + 1;

  // List of dice types
  const diceTypes = ["d4", "d6", "d8", "d10", "d12", "d20"];

  // Randomly select a dice type
  const dice = diceTypes[Math.floor(Math.random() * diceTypes.length)];

  // Return the result as a concatenated string
  return `${number}${dice}`;
}

function returnRandomWeaponAttack(): () => string {
  return function (): string {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    return `${randomNumber}[W]`;
  };
}

const returnAttack = () => {
  const defenseType = ["AC", "Fortitude", "RefleX", "Will"];
  const extraNumber = getRandomNumber();

  return `${abilityScore[Math.floor(Math.random() * abilityScore.length)]} ${Math.random() < 0.5 ? `${Math.sign(extraNumber) === 1 ? "+" : ""}${extraNumber}` : ""} vs. ${defenseType[Math.floor(Math.random() * defenseType.length)]}`;
};

const returnDamage = () => {
  return `${Math.random() < 0.5 ? returnRandomWeaponAttack()() : returnRandomDiceFormula()} ${Math.random() < 0.5 ? `+ ${abilityScore[Math.floor(Math.random() * abilityScore.length)]} modifier damage` : ""}`;
};

const returnEffect = () => {
  const effectsWithNoProperties = [
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
  ];

  const effectsWithDamageType = ["Immune"];
  const effectsWithDamageTypeAndValue = [
    "Ongoing Damage",
    "Vulnerable",
    "Resist",
  ];

  const effectsWithValue = ["Regeneration"];
  const effectsWithValueAndExtraDice = ["Temporary Hit Points", "Healing"];

  const effectsWithValueAndAttributes = ["Modify"];
  function returnRandomEffectName() {
    const options = EffectName.options;
    const randomIndex = Math.floor(Math.random() * options.length);

    return options[randomIndex];
  }

  function getRandomAttributes(): string[] {
    const attributes = EffectedAttribute.options; // Get all enum values
    const shuffled = attributes.sort(() => Math.random() - 0.5); // Shuffle the array
    const count = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
    return shuffled.slice(0, count); // Return the first 'count' attributes
  }

  function getRandomDamageTypes(): string[] {
    const attributes = EffectedAttribute.options; // Get all enum values
    const shuffled = attributes.sort(() => Math.random() - 0.5); // Shuffle the array
    const count = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
    const result = shuffled.slice(0, count); // Return the first 'count' attributes

    return result.includes("none") ? ["none"] : result;
  }

  let name = returnRandomEffectName() as string;

  if (effectsWithNoProperties.includes(name)) {
    return { name };
  }

  if (effectsWithDamageType.includes(name)) {
    return {
      name,
      damageType: getRandomDamageTypes(),
    };
  }

  if (effectsWithDamageTypeAndValue.includes(name)) {
    return {
      name,
      damageType: getRandomDamageTypes(),
      value: getRandomNumber(),
    };
  }

  if (effectsWithValue.includes(name)) {
    return {
      name,
      value: getRandomNumber(),
    };
  }

  if (effectsWithValueAndAttributes.includes(name)) {
    return {
      name,
      value: getRandomNumber(),
      effectedAttribute: getRandomAttributes(),
    };
  }

  if (effectsWithValueAndExtraDice.includes(name)) {
    return {
      name,
      value: getRandomNumber(),
      extraDice: returnRandomDiceFormula(),
    };
  }
};

const returnEffectList = () => {
  return Math.random() < 0.5
    ? []
    : Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
        effectProperties: Array.from({
          length: Math.floor(Math.random() * 5) + 1,
        }).map(() => returnEffect()),
        duration: returnRandomDuration(),
        afterEffectProperties:
          Math.random() < 0.5
            ? []
            : Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(
                () => returnEffect(),
              ),
      }));
};

export function generatePower() {
  const { attack, damage, damageLevel21, onHitEffects, ...rest } =
    generateMock(Power);

  return Object.assign(rest, {
    attack: returnAttack(),
    damage: returnDamage(),
    missDamage:
      Math.random() < 0.5
        ? ""
        : Math.random() < 0.5
          ? "Half Damage"
          : returnDamage(),
    damageLevel21: returnDamage(),
    onHitEffects: returnEffectList(),
    onMissEffects: returnEffectList(),
    onEffects: returnEffectList(),
  });
}
console.log(generatePower());

function generateTestData() {
  return {};
}
