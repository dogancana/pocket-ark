import { DamageModifier } from '@pocket-ark/lost-ark-data';
import { AppliedEngraving } from './models';

export function calculateResults(
  critRates: number[],
  baseDamage: number[],
  engravings: AppliedEngraving[]
) {
  const results = baseDamage.map((damage) =>
    critRates.map((critRate) => {
      const withEngravings = calculateDamageOfEngravings(
        damage,
        critRate,
        engravings
      );
      const witoutEngravings = calculateDamageOfEngravings(
        damage,
        critRate,
        []
      );
      const damageIncrease = withEngravings.damage - witoutEngravings.damage;

      return {
        baseDamage: damage,
        critRate,
        withEngravings,
        witoutEngravings,
        damageIncrease,
        damageIncreasePerc: (damageIncrease / witoutEngravings.damage) * 100,
        score: withEngravings.damage / witoutEngravings.damage,
      };
    })
  );

  const maxIncrease =
    results[baseDamage.length - 1][critRates.length - 1].damageIncrease;

  return results.map((row) =>
    row.map((result) => ({
      ...result,
      impact: result.damageIncrease / maxIncrease,
    }))
  );
}

export type DamageCalculationResult = ReturnType<
  typeof calculateResults
>[number][number];

export function calculateDamageOfEngravings(
  baseDamage: number,
  critRate: number,
  appliedEngravings: AppliedEngraving[]
) {
  const damageModifier: DamageModifier = appliedEngravings.reduce(
    (prev, curr) => {
      const { engraving, levelIndex } = curr;
      const damageModifierForLevel = engraving.damageModifier[levelIndex];
      const dmgMultiplierPerc = damageModifierForLevel.damageMultiplier || 0;
      const dmgMultiplier = dmgMultiplierPerc
        ? (100 + dmgMultiplierPerc) / 100
        : 1;
      return {
        attackPower:
          prev.attackPower + (damageModifierForLevel.attackPower || 0),
        attackSpeed:
          prev.attackSpeed + (damageModifierForLevel.attackSpeed || 0),
        critRatePerc:
          prev.critRatePerc + (damageModifierForLevel.critRatePerc || 0),
        critDamage: prev.critDamage + (damageModifierForLevel.critDamage || 0),
        damageMultiplier: prev.damageMultiplier * dmgMultiplier,
        damageAddition:
          prev.damageAddition + (damageModifierForLevel.damageAddition || 0),
      };
    },
    {
      attackPower: 0,
      attackSpeed: 0,
      critRatePerc: 0,
      critDamage: 0,
      damageMultiplier: 1,
      damageAddition: 0,
    } as DamageModifier
  );

  return calculateDamage(baseDamage, critRate, damageModifier);
}

export function calculateDamage(
  baseDamage: number,
  critRate: number,
  damageModifier: DamageModifier
) {
  const attackPower =
    baseDamage *
    (1 + (damageModifier.attackPower || 0) / 100) *
    (1 + (damageModifier.attackSpeed || 0) / 100);

  const critPerc = Math.min(critRate + (damageModifier.critRatePerc || 0), 100);
  const critDamageMultiplier = 200 + (damageModifier.critDamage || 0);
  const dmgAddition = (damageModifier.damageAddition || 0) / 100;
  const dmgMultiplier = damageModifier.damageMultiplier || 1;

  const critDamage = attackPower * (critDamageMultiplier / 100);
  const critNumber = (critPerc / 100) * critDamage * dmgMultiplier;
  const nonCritNumber = (1 - critPerc / 100) * attackPower * dmgMultiplier;
  const damage = critNumber + nonCritNumber;

  return {
    baseDamage,
    critRate,
    damageModifier,
    attackPower,
    critPerc,
    critDamageMultiplier,
    dmgAddition,
    dmgMultiplier,
    critDamage,
    damage,
    critNumber,
    nonCritNumber,
  };
}
