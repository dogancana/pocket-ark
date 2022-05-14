export enum MaterialType {
  HonorLeapstone = 'HonorLeapstone',
  GreatHonorLeapstone = 'GreatHonorLeapstone',
  HonorShardPouchLarge = 'HonorShardPouchLarge',
  SolarGrace = 'SolarGrace',
  SolarBlessing = 'SolarBlessing',
  SolarProtection = 'SolarProtection',
  DestructionStoneCrystal = 'DestructionStoneCrystal',
  GuardianStoneCrystal = 'GuardianStoneCrystal',
  PowderOfSage = 'PowderOfSage',
}

export interface Material {
  type: MaterialType;
  name: string;
  chaosDungeonShards: number;
}
