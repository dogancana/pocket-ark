import { pick } from 'lodash';
import { FormEventHandler, useEffect, useState } from 'react';
import { Dropdown, Icon, Modal } from 'semantic-ui-react';
import { FC } from '../../../utils/react';
import { useEngravingFilters } from './filters-provider';

interface State {
  open: boolean;
  critSamples: number;
  minDamage: number;
  maxDamage: number;
  samples: number;
  error?: string;
}

const STATE_STORAGE_KEY = 'engravingCalculatorState';
const critSamples = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const damageSamples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const Filters: FC = () => {
  const { state, dispatch } = useEngravingFilters();
  const [componentState, setState] = useState<State>({
    open: false,
    critSamples: state.critSamples,
    minDamage: state.minDamage,
    maxDamage: state.maxDamage,
    samples: state.samples,
  });

  const toggleOpen = () => setState((p) => ({ ...p, open: !p.open }));

  useEffect(() => {
    const saved = localStorage.getItem(STATE_STORAGE_KEY);
    const obj = saved ? JSON.parse(saved) : null;
    if (obj) dispatch({ type: 'SetState', state: obj });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: FormEventHandler = (e) => {
    console.log('asd', componentState);
    e.preventDefault();
    const error = validate(componentState);
    setState((p) => ({ ...p, error }));

    if (!error) {
      dispatch({
        type: 'SetStatePartial',
        state: pick(
          componentState,
          'critSamples',
          'minDamage',
          'maxDamage',
          'samples'
        ),
      });
    }
  };

  return (
    <>
      <Icon
        name="cog"
        size="large"
        onClick={toggleOpen}
        className="cursor-pointer"
      />
      <Modal open={componentState.open} onClose={toggleOpen} size="mini">
        <Modal.Header>Settings</Modal.Header>
        <Modal.Content>
          <form className="flex flex-col text-lg" onSubmit={onSubmit}>
            <div className="flex">
              <label htmlFor="critSamples" className="mr-1">
                Crit samples:{' '}
              </label>
              <Dropdown
                id="critSamples"
                inline
                search
                placeholder="Crit Samples"
                className="mr-auto"
                value={componentState.critSamples}
                options={critSamples.map((s) => ({ text: s, value: s }))}
                onChange={(_, data) =>
                  setState((p) => ({
                    ...p,
                    critSamples: data.value as number,
                  }))
                }
              />
            </div>
            <div className="mt-2">
              <label htmlFor="minDamage" className="mr-1">
                Damage from
              </label>
              <input
                id="minDamage"
                className="appearance-none p-1 ml-2 border-2 border-gray-200 rounded-sm w-32"
                placeholder="Damage from"
                defaultValue={state.minDamage}
                type="number"
                min={100}
                max={componentState.maxDamage}
                onChange={(e) =>
                  setState((p) => ({
                    ...p,
                    minDamage: parseInt(e.target.value, 10),
                  }))
                }
              />
            </div>
            <div className="mt-2">
              <label htmlFor="maxDamage" className="mr-1">
                Damage to
              </label>
              <input
                id="maxDamage"
                className="appearance-none p-1 ml-2 border-2 border-gray-200 rounded-sm w-32"
                placeholder="Damage to"
                defaultValue={state.maxDamage}
                type="number"
                max={componentState.maxDamage}
                onChange={(e) =>
                  setState((p) => ({
                    ...p,
                    maxDamage: parseInt(e.target.value, 10),
                  }))
                }
              />
            </div>
            <div className="mt-2">
              <label htmlFor="damageSamples" className="mr-1">
                Damage samples:{' '}
              </label>
              <Dropdown
                id="damageSamples"
                inline
                search
                placeholder="Damage Samples"
                className="mr-auto"
                value={componentState.samples}
                options={damageSamples.map((s) => ({ text: s + 1, value: s }))}
                onChange={(_, data) =>
                  setState((p) => ({
                    ...p,
                    samples: data.value as number,
                  }))
                }
              />
            </div>
            <div className="flex flex-col mt-8 items-end">
              <button
                className="px-4 py-2 bg-stone-300 cursor-pointer"
                type="submit"
              >
                Apply
              </button>
              {componentState.error && (
                <span className="text-red-500 mt-1">
                  {componentState.error}
                </span>
              )}
            </div>
          </form>
        </Modal.Content>
      </Modal>
    </>
  );
};

function validate(state: State) {
  if (
    !state.critSamples ||
    !state.maxDamage ||
    !state.minDamage ||
    !state.samples
  )
    return 'All values should be filled';
  if (state.minDamage < 100) return 'Minimum "Damage from" is 100';
  if (state.minDamage >= state.maxDamage)
    return '"Damage from" should be smaller than "Damage to"';
  return undefined;
}
