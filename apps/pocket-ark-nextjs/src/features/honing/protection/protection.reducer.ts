import {
  armorHoningCosts,
  BodyItemType,
  itemLevelLimits,
  MaterialsToCraft,
  Rarity,
  SingleLevelHoning,
  weaponHoningCosts,
} from '@pocket-ark/lost-ark-data';
import { Reducer } from 'react';

export interface State {
  itemType: BodyItemType;
  toLevel?: number;
  rarity?: Rarity;
  artisan: number;
  honingMaterials: MaterialsToCraft;
  costs?: SingleLevelHoning;
}

export type Action =
  | { type: 'SET_LEVEL'; level: string }
  | { type: 'SET_ITEM_TYPE'; bodyItemType: BodyItemType }
  | { type: 'SET_RARITY'; rarity: Rarity }
  | { type: 'SET_ARTISAN'; artisan: string }
  | { type: 'SET_STATE'; state: State };

const _initial: State = {
  itemType: 'weapon',
  honingMaterials:
    weaponHoningCosts.find((c) => c.toLevel === 15).upgrade.materials || [],
  toLevel: 15,
  rarity: Rarity.Legendary,
  artisan: 0,
};

export const initial = mapStateWIthHoning(_initial);

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_LEVEL':
      return mapStateWIthHoning({
        ...state,
        toLevel: toItemNumber(action.level, state.rarity),
      });
    case 'SET_ITEM_TYPE':
      return mapStateWIthHoning({
        ...state,
        itemType: action.bodyItemType,
      });
    case 'SET_RARITY':
      return mapStateWIthHoning({
        ...state,
        toLevel: toItemNumber(state.toLevel?.toString() || '', action.rarity),
        rarity: action.rarity,
      });
    case 'SET_ARTISAN':
      return mapStateWIthHoning({
        ...state,
        artisan: toNumber(action.artisan, 0, 99),
      });
    case 'SET_STATE':
      return action.state;
    default:
      return state;
  }
};

function toItemNumber(value: string, rarity: Rarity): number {
  const { min, max } = itemLevelLimits(rarity);
  return toNumber(value, min, max);
}

function toNumber(value: string, min: number, max: number): number {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return undefined;

  return Math.max(min, Math.min(max, parsed));
}

function mapStateWIthHoning(state: State): State {
  const { itemType, toLevel } = state;
  const costs = (
    itemType === 'armor' ? armorHoningCosts : weaponHoningCosts
  ).find((c) => c.toLevel === toLevel);

  return {
    ...state,
    honingMaterials: costs?.upgrade.materials,
    costs,
  };
}
