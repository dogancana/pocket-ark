import {
  BodyItemSlot,
  itemLevelLimits,
  Rarity
} from '@pocket-ark/lost-ark-data';
import { Reducer } from 'react';
import { Item } from './models';

interface State {
  avgChance: number;
  from: Item[];
  to: Item[];
  research1370: boolean;
}

export type Action =
  | {
      type: 'SET_ITEM';
      direction: 'from' | 'to';
      slot: BodyItemSlot;
      rarity?: Rarity;
      level?: number;
    }
  | {
      type: 'SET_CHANCE';
      avgChance: number | string;
    }
  | {
      type: 'SET_HIDDEN';
      slot: BodyItemSlot;
      hidden: boolean;
    }
  | {
      type: 'SET_1370_RESEARCH';
      value: boolean;
    }
  | {
      type: 'SET_STATE';
      state: State;
    };

export const reducer: Reducer<State, Action> = (
  state = { from: [], to: [], avgChance: 60, research1370: true },
  action
) => {
  switch (action.type) {
    case 'SET_STATE':
      return action.state;
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

          const { max } = itemLevelLimits(newItem.rarity);
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
    case 'SET_1370_RESEARCH':
      return {
        ...state,
        research1370: action.value,
      };
    default:
      return state;
  }
};

function getChanceValue(prop: string | number) {
  const parsed = parseInt(prop.toString(), 10);
  const value = isNaN(parsed) ? 0 : parsed;
  return value;
}
