import { engravings, EngravingType } from '@pocket-ark/lost-ark-data';
import { sortBy } from 'lodash';
import { Reducer } from 'react';
import { FiltersState } from '../models';

export type Action =
  | {
      type: 'ChangeEngraving';
      engravingType: EngravingType;
      levelIndex: number;
    }
  | {
      type: 'ChangeEngraving';
      engravingType: EngravingType;
      levelIndex: number;
    }
  | {
      type: 'SetCritSamples';
      critSamples: number;
    }
  | { type: 'SetMinDamage'; minDamage: number }
  | { type: 'SetMaxDamage'; maxDamage: number }
  | { type: 'SetSamples'; samples: number }
  | { type: 'RemoveEngraving'; engravingType: EngravingType }
  | { type: 'SetState'; state: FiltersState }
  | { type: 'SetStatePartial'; state: Partial<FiltersState> };

export const reducer: Reducer<FiltersState, Action> = (state, action) => {
  switch (action.type) {
    case 'ChangeEngraving':
      return {
        ...state,
        appliedEngravings: sortBy(
          [
            ...state.appliedEngravings.filter(
              (a) => a.engraving.type !== action.engravingType
            ),
            {
              engraving: engravings.find(
                (e) => e.type === action.engravingType
              ),
              levelIndex: action.levelIndex,
            },
          ],
          (a) => a.engraving.type
        ),
      };
    case 'SetCritSamples':
      return { ...state, critSamples: action.critSamples };
    case 'SetMinDamage':
      return { ...state, minDamage: action.minDamage };
    case 'SetMaxDamage':
      return { ...state, maxDamage: action.maxDamage };
    case 'SetSamples':
      return { ...state, samples: action.samples };
    case 'RemoveEngraving':
      return {
        ...state,
        appliedEngravings: state.appliedEngravings.filter(
          (e) => e.engraving.type !== action.engravingType
        ),
      };
    case 'SetState':
      return action.state;
    case 'SetStatePartial':
      return { ...state, ...action.state };
    default:
      return state;
  }
};
