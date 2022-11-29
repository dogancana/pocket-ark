import { CraftingRecipe } from '@pocket-ark/lost-ark-data';
import { SortableTableItem } from '../../ui';

export interface TableRecipe extends CraftingRecipe {
  totalPrice?: number;
  totalCost?: number;
  profit?: number;
  profitPerHour?: number;
  profitPerHourRealistic?: number;
  profitPerActionEnergy?: number;
  perc?: number;
  materialsTotal?: number;
}

export type StrongholdColumnType =
  | 'recipe'
  | 'materials'
  | 'cost'
  | 'total'
  | 'sale'
  | 'profit'
  | 'perc'
  | 'profitPerAE'
  | 'profitPerH';

export type StrongHoldTableItem = SortableTableItem<keyof TableRecipe> & {
  type: StrongholdColumnType;
};

export const headers: StrongHoldTableItem[] = [
  {
    type: 'recipe',
    label: 'Recipe',
    column: 'outputMaterial',
    notSortable: true,
  },
  { type: 'materials', label: 'Materials', column: 'materialsTotal' },
  {
    type: 'cost',
    label: 'Cost',
    column: 'requiredGold',
    tooltip: 'Cost of the recipe.',
  },
  {
    type: 'total',
    label: 'Total',
    column: 'totalCost',
    tooltip: 'Cost of materials.',
  },
  { type: 'sale', label: 'Sale', column: 'totalPrice' },
  { type: 'profit', label: 'Profit', column: 'profit' },
  {
    type: 'perc',
    label: 'Perc.',
    column: 'perc',
    tooltip: 'Profit divided by total cost.',
  },
  {
    type: 'profitPerAE',
    label: 'Profit/d',
    column: 'profitPerActionEnergy',
    tooltip:
      'Profit per day (10000 action energy). It limits maximum amount of items relative to recipe duration. (3 parallel slots)',
  },
  {
    type: 'profitPerH',
    label: 'Profit/hr',
    column: 'profitPerHour',
    tooltip:
      'Profit per hour. It calculates profit per hour with also action energy limit of 10000 a day. (3 parallel slots)',
  },
];
