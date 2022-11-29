import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useContext,
} from 'react';
import { FC } from '../../utils/react';
import { Action, initial, reducer, State } from './reducer';
import { headers, StrongholdColumnType } from './constants';

const STATE_STORAGE_KEY = 'strongHoldCraftingFilters';

export interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

const context = createContext<Context>({
  state: initial,
  dispatch: () => null,
});

export const StrongholdCraftingFiltersProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

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

export function useStrongholdCraftingFilters() {
  const result = useContext(context);

  const enabledMap: { [key in StrongholdColumnType]: boolean } = {} as any;
  headers.forEach((h) => {
    enabledMap[h.type] = result.state.columns.find(
      (c) => c.type === h.type
    ).enabled;
  });

  return {
    ...result,
    enabledMap,
  };
}
