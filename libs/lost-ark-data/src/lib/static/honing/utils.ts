import { MaterialType } from '../materials/models';
import { MaterialsToCraft } from '../models/index';
import { BodyItemType, SingleLevelHoning } from './models';

export function feed(p: {
  silver: number;
  shards: number;
}): SingleLevelHoning['feed'] {
  const { silver, shards } = p;
  return {
    silver,
    shards,
  };
}

export interface UpgradeProps {
  gold: number;
  silver: number;
  shards: number;
  materials: MaterialsToCraft;
}

export function upgrade(p: UpgradeProps): SingleLevelHoning['upgrade'] {
  const { gold, silver, shards, materials } = p;
  if (materials.find((m) => m.type === MaterialType.HarmonyShardPouchMedium)) {
    throw new Error('Harmony shard pouch is added already');
  }

  return {
    gold,
    silver,
    shards,
    materials,
  };
}

export interface UpgradeEpicProps extends Omit<UpgradeProps, 'materials'> {
  simpleOreha: number;
  crystals: number;
  leapStone: number;
}

export function upgradeEpic(itemType: BodyItemType, p: UpgradeEpicProps) {
  return upgrade({
    ...p,
    materials: [
      {
        type: MaterialType.SimpleOrehaFusionMaterial,
        amount: p.simpleOreha,
      },
      {
        type:
          itemType === 'armor'
            ? MaterialType.GuardianStoneCrystal
            : MaterialType.DestructionStoneCrystal,
        amount: p.crystals,
      },
      {
        type: MaterialType.HonorLeapstone,
        amount: p.leapStone,
      },
    ],
  });
}

export interface UpgradeLegendaryProps extends Omit<UpgradeProps, 'materials'> {
  basicOreha: number;
  crystals: number;
  greatLeapStone: number;
}

export function upgradeLegendary(
  itemType: BodyItemType,
  p: UpgradeLegendaryProps
) {
  return upgrade({
    ...p,
    materials: [
      {
        type: MaterialType.BasicOrehaFusionMaterial,
        amount: p.basicOreha,
      },
      {
        type:
          itemType === 'armor'
            ? MaterialType.GuardianStoneCrystal
            : MaterialType.DestructionStoneCrystal,
        amount: p.crystals,
      },
      {
        type: MaterialType.GreatHonorLeapstone,
        amount: p.greatLeapStone,
      },
    ],
  });
}

export const upgradeRelic = upgradeLegendary;
