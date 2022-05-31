import { MaterialsToCraft, SingleLevelHoning } from '@pocket-ark/lost-ark-data';
import { RecommendedProtections } from '../utils';

export interface HoningCosts {
  expectedCost: number;
  flattenChances: number[];
}

export interface SingleLevelHoningWithAttempts extends SingleLevelHoning {
  attempts: {
    attemptNumber: number;
    cost: number;
    chance: number;
    protection: RecommendedProtections[];
    protectionCost: number;
    protectionChance: number;
    flattenChanceProtected: number;
    flattenChanceUnprotected: number;
  }[];
  expectedCostUnprotected: number;
  expectedCostProtected: number;
}

export interface SingleLevelHoningWithTotals
  extends SingleLevelHoningWithAttempts {
  averageAttemptIndexToSuccess: number;
  itemsNeededOnAverage: MaterialsToCraft;
}
