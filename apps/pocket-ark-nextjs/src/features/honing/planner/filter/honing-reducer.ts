import { Item } from './models';
import { Reducer } from 'react';
import { BodyItemSlot, Rarity } from '@pocket-ark/lost-ark-data';

interface State {
  avgChance: number;
  from: Item[];
  to: Item[];
}

type SetItemAction = {
  type: 'SET_ITEM';
  direction: 'from' | 'to';
  slot: BodyItemSlot;
  rarity?: Rarity;
  level?: number;
};

interface SetChanceAction {
  type: 'SET_CHANCE';
  avgChance: number | string;
}

interface SetHiddenAction {
  type: 'SET_HIDDEN';
  slot: BodyItemSlot;
  hidden: boolean;
}

export type Action = SetItemAction | SetChanceAction | SetHiddenAction;

export const reducer: Reducer<State, Action> = (
  state = { from: [], to: [], avgChance: 60 },
  action
) => {
  console.log('action', action);
  switch (action.type) {
    case 'SET_CHANCE':
      return {
        ...state,
        avgChance: Math.max(0, Math.min(99, getChanceValue(action.avgChance))),
      };
    case 'SET_ITEM':
      return {
        ...state,
        [action.direction]: state[action.direction].map((item) => {
          if (item.slot !== action.slot) return item;

          const newItem = { ...item, ...action };
          delete newItem.direction;
          delete newItem.type;

          const max = maxLevel(newItem.rarity);
          newItem.level = Math.min(newItem.level, max);
          return newItem;
        }),
      };
    case 'SET_HIDDEN':
      return {
        ...state,
        from: state.from.map((item) => {
          if (item.slot !== action.slot) return item;
          return { ...item, hidden: action.hidden };
        }),
        to: state.to.map((item) => {
          if (item.slot !== action.slot) return item;
          return { ...item, hidden: action.hidden };
        }),
      };
    default:
      return state;
  }
};

function maxLevel(rarity: Rarity) {
  switch (rarity) {
    case Rarity.Epic:
      return 15;
    case Rarity.Legendary:
      return 20;
    case Rarity.Relic:
      return 25;
  }
}

function getChanceValue(prop: string | number) {
  const parsed = parseInt(prop.toString(), 10);
  const value = isNaN(parsed) ? 0 : parsed;
  return value;
}
