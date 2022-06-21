import { Engraving } from '@pocket-ark/lost-ark-data';

export interface AppliedEngraving {
  engraving: Engraving;
  levelIndex: number;
}

export interface FiltersState {
  critSamples: number;
  minDamage: number;
  maxDamage: number;
  samples: number;
  appliedEngravings: AppliedEngraving[];
}
