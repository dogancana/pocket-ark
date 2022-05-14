import { Engraving } from './model';

export const Adrenaline: Engraving = {
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
};

export const Barricade: Engraving = {
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
};

export const CursedDoll: Engraving = {
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
};

export const Grudge: Engraving = {
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
};

export const KeenBluntWeapon: Engraving = {
  name: 'Keen Blunt Weapon',
  damageModifier: [
    {
      critDamage: 10,
    },
    {
      critDamage: 25,
    },
    {
      critDamage: 50,
    },
  ],
};

export const MasterOfAmbush: Engraving = {
  name: 'Master of Ambush',
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
};

export const RaidCaptain: Engraving = {
  name: 'Raid Captain',
  damageModifier: [
    {
      attackPower: 4,
    },
    {
      attackPower: 8.8,
    },
    {
      attackPower: 18,
    },
  ],
};

export const SpiritAbsorption: Engraving = {
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
};

export const MastersTenacity: Engraving = {
  name: 'Masters Tenacity',
  damageModifier: [],
};
