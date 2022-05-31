import { createContext, Dispatch, useContext, useReducer } from 'react';
import { FC } from '../../../../utils';
import { initalFromSet, initialToSet } from './constants';
import { Action, reducer } from './honing-reducer';
import { Item } from './models';

interface State {
  avgChance: number;
  from: Item[];
  to: Item[];
}

interface HoningFilterContext {
  state: State;
  dispatch: Dispatch<Action>;
}

const context = createContext<HoningFilterContext>({
  state: {
    avgChance: 60,
    from: [],
    to: [],
  },
  dispatch: () => null,
});

export const HoningFilterProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    avgChance: 60,
    from: initalFromSet,
    to: initialToSet,
  });
  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

export function useHoningFilter() {
  return useContext(context);
}
