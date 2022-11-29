import { Reducer } from 'react';
import { headers, StrongholdColumnType } from './constants';

export type Action =
  | {
      type: 'SET_COLUMN';
      columnType: StrongholdColumnType;
      enabled: boolean;
    }
  | { type: 'SET_STATE'; state: State };

export interface State {
  columns: { type: StrongholdColumnType; enabled: boolean }[];
}

export const initial: State = {
  columns: headers
    .map((h) => ({ type: h.type, enabled: true }))
    .map((c) => {
      if (c.type === 'materials') return { ...c, enabled: false };
      return c;
    }),
};

export const reducer: Reducer<State, Action> = (state = initial, action) => {
  switch (action.type) {
    case 'SET_COLUMN':
      return {
        ...state,
        columns: state.columns.map((c) => {
          if (c.type === action.columnType)
            return { ...c, enabled: action.enabled };
          return c;
        }),
      };
    case 'SET_STATE':
      return {
        ...action.state,
        columns: initial.columns.map((ic) => ({
          ...ic,
          enabled:
            action.state.columns.find((ac) => ac.type === ic.type)?.enabled ??
            ic.enabled,
        })),
      };
    default:
      return state;
  }
};
