import { engravings } from '@pocket-ark/lost-ark-data';
import { createContext, Dispatch, useContext, useReducer } from 'react';
import { FC } from '../../../utils/react';
import { FiltersState } from '../models';
import { Action, reducer } from './reducer';

interface ContextResult {
  state: FiltersState;
  dispatch: Dispatch<Action>;
}

const initial: FiltersState = {
  critSamples: 10,
  minDamage: 100,
  maxDamage: 200,
  samples: 5,
  appliedEngravings: [
    {
      engraving: engravings.find((e) => e.type === 'grudge'),
      levelIndex: 2,
    },
    {
      engraving: engravings.find((e) => e.type === 'cursedDoll'),
      levelIndex: 2,
    },
  ],
};

const context = createContext<ContextResult>({
  state: initial,
  dispatch: () => null,
});

export const FiltersProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

export function useEngravingFilters() {
  const hook = useContext(context);
  return {
    ...hook,
  };
}
