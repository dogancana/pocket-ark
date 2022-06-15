import {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import { FC } from '../../../../utils/react';
import { initalFromSet, initialToSet, STATE_STORAGE_KEY } from './constants';
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

  useEffect(() => {
    // client side
    try {
      const savedState = localStorage.getItem(STATE_STORAGE_KEY);
      if (savedState) {
        dispatch({ type: 'SET_STATE', state: JSON.parse(savedState) });
      }
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

export function useHoningFilter() {
  return useContext(context);
}
