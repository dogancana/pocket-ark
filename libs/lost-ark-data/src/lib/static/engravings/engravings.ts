import { Engraving } from './model';

export const engravings: Engraving[] = [
  {
    type: 'adrenaline',
    name: 'Adrenaline',
    damageModifier: [
      {
        attackPower: 1.8,
        critRatePerc: 5,
      },
      {
        attackPower: 3.6,
        critRatePerc: 10,
      },
      {
        attackPower: 6,
        critRatePerc: 15,
      },
    ],
  },
  {
    type: 'allOutAttack',
    name: 'Al-Out Attack',
    damageModifier: [
      {
        attackSpeed: 5,
        damageMultiplier: 4,
      },
      {
        attackSpeed: 10,
        damageMultiplier: 10,
      },
      {
        attackSpeed: 20,
        damageMultiplier: 20,
      },
    ],
  },
  {
    type: 'ambushMaster',
    name: 'Ambush Master',
    damageModifier: [
      {
        attackPower: 5,
      },
      {
        attackPower: 12,
      },
      {
        attackPower: 25,
      },
    ],
  },
  {
    type: 'barricade',
    name: 'Barricade',
    requires: 'shield',
    damageModifier: [
      {
        attackPower: 3,
      },
      {
        attackPower: 8,
      },
      {
        attackPower: 16,
      },
    ],
  },
  {
    type: 'cursedDoll',
    name: 'Cursed Doll',
    damageModifier: [
      {
        attackPower: 3,
      },
      {
        attackPower: 8,
      },
      {
        attackPower: 16,
      },
    ],
  },
  {
    type: 'disrespect',
    name: 'Disrespect',
    damageModifier: [
      {
        damageMultiplier: 9,
      },
      {
        damageMultiplier: 22,
      },
      {
        damageMultiplier: 36,
      },
    ],
  },
  {
    type: 'grudge',
    name: 'Grudge',
    damageModifier: [
      {
        damageMultiplier: 4,
      },
      {
        damageMultiplier: 10,
      },
      {
        damageMultiplier: 20,
      },
    ],
  },
  {
    type: 'hitMaster',
    name: 'Hit Master',
    damageModifier: [
      {
        damageMultiplier: 3,
      },
      {
        damageMultiplier: 8,
      },
      {
        damageMultiplier: 16,
      },
    ],
  },
  {
    type: 'increaseMass',
    name: 'Increases Mass',
    damageModifier: [
      {
        attackPower: 4,
        attackSpeed: -10,
      },
      {
        attackPower: 10,
        attackSpeed: -10,
      },
      {
        attackPower: 18,
        attackSpeed: -10,
      },
    ],
  },
  {
    type: 'keenBluntWeapon',
    name: 'Keen Blunt Weapon',
    damageModifier: [
      {
        critDamage: 10,
        damageMultiplier: -2,
      },
      {
        critDamage: 25,
        damageMultiplier: -2,
      },
      {
        critDamage: 50,
        damageMultiplier: -2,
      },
    ],
  },
  {
    type: 'masterBrawler',
    name: 'Master Brawler',
    damageModifier: [
      {
        attackPower: 5,
      },
      {
        attackPower: 12,
      },
      {
        attackPower: 25,
      },
    ],
  },
  {
    type: 'mastersTenacity',
    name: "Master's Tenacity",
    damageModifier: [
      {
        damageMultiplier: 3,
      },
      {
        damageMultiplier: 8,
      },
      {
        damageMultiplier: 16,
      },
    ],
  },
  {
    type: 'preciseDagger',
    name: 'Precise Dagger',
    damageModifier: [
      {
        critRatePerc: 4,
        critDamage: -12,
      },
      {
        critRatePerc: 10,
        critDamage: -12,
      },
      {
        critRatePerc: 20,
        critDamage: -12,
      },
    ],
  },
  {
    type: 'propulsion',
    name: 'Propulsion',
    damageModifier: [
      {
        damageMultiplier: 3,
      },
      {
        damageMultiplier: 8,
      },
      {
        damageMultiplier: 16,
      },
    ],
  },
  {
    type: 'spiritAbsorption',
    name: 'Spirit Absorption',
    damageModifier: [
      {
        attackSpeed: 3,
      },
      {
        attackSpeed: 8,
      },
      {
        attackSpeed: 15,
      },
    ],
  },
  {
    type: 'stabilizedStatus',
    name: 'Stabilized Status',
    damageModifier: [
      {
        damageMultiplier: 3,
      },
      {
        damageMultiplier: 8,
      },
      {
        damageMultiplier: 16,
      },
    ],
  },
  {
    type: 'superCharge',
    name: 'Super Charge',
    damageModifier: [
      {
        attackSpeed: 8,
        damageMultiplier: 4,
      },
      {
        attackSpeed: 20,
        damageMultiplier: 10,
      },
      {
        attackSpeed: 40,
        damageMultiplier: 20,
      },
    ],
  },
];
