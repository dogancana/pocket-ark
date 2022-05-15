import { MaterialType } from '../materials';

export interface CraftingRecipe {
  requiredMaterials: Array<{
    type: MaterialType;
    amount: number;
  }>;
  requiredGold: number;
  requiredActionEnergy: number;
  outputMaterial: MaterialType;
  amount: number;
  seconds: number;
}
