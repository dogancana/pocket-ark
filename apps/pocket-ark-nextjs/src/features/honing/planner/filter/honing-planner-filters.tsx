import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { useEffect, useState } from 'react';
import { Divider, Icon, Modal, Popup } from 'semantic-ui-react';
import { Currency } from '../../../../ui/currency/currency';
import { FC } from '../../../../utils/react';
import { STATE_STORAGE_KEY } from './constants';
import { useHoningFilter } from './honing-filter-provider';
import { ItemLine } from './item-line';

interface State {
  open: boolean;
}

export const HoningPlannerFilters: FC = () => {
  const [state, setState] = useState<State>({ open: false });
  const {
    state: { from, to, avgChance, research1370 },
    dispatch,
  } = useHoningFilter();
  const { open } = state;

  const toggleOpen = () => setState((p) => ({ ...p, open: !p.open }));

  useEffect(() => {
    if (!localStorage.getItem(STATE_STORAGE_KEY)) {
      setState((s) => ({ ...s, open: true }));
    }
  }, []);

  return (
    <>
      <Icon
        name="cog"
        size="large"
        onClick={toggleOpen}
        className="cursor-pointer"
      />
      <Modal open={open} onClose={toggleOpen} size="small" centered>
        <Modal.Header>Honing Planner Filters</Modal.Header>
        <Modal.Content>
          <div className="pb-4 flex">
            <Popup
              flowing
              trigger={
                <label htmlFor="avgChance" className="inline-flex flex-col">
                  <span>Average expected probability:</span>
                  <span className="text-xs text-gray-500 font-thin">
                    0: Lucky, 99: Unlucky. [40-60] is a realistic
                  </span>
                </label>
              }
            >
              <p className="max-w-2xl">
                To calculate on expected honing number, we simply expect you to
                pass through enough honing attempts to reach this number.
                <br />
                If there are 6 attempts with 20% success rate each, <br />
                <ul>
                  <li>
                    with probability of 30, you'll be successful on 2nd attempt.
                  </li>
                  <li>
                    with probability of 40, you'll be successful on 2nd attempt.
                  </li>
                  <li>
                    with probability of 50, you'll be successful on 3rd attempt.
                  </li>
                </ul>
                <span className="text-sm font-thing text-gray-500">
                  The actual calculation is much more complex, but this is a
                  good example to simplfy things.
                </span>
                <Divider />
                This value affects required materials but it does not affect
                average cost in gold. Average cost in gold is calculated based
                on probablity of each attempt individualy. <br />
                <span className="flex items-center">
                  Average cost is the one you see with this symbol "~":{' '}
                  <Currency type={CurrencyType.Gold} value={10} arround />
                </span>
              </p>
            </Popup>
            <input
              className="appearance-none p-1 ml-2 border-2 border-gray-200 rounded-sm w-32"
              placeholder="0 - 99"
              type="number"
              id="avgChance"
              value={avgChance || ''}
              onChange={(e) =>
                dispatch({
                  type: 'SET_CHANCE',
                  avgChance: e.currentTarget.value,
                })
              }
            />
            <div className="ml-auto flex items-center">
              <input
                className="h-4 w-4 border rounded-sm mr-2 "
                type="checkbox"
                id="research1370"
                checked={research1370}
                onChange={(event) =>
                  dispatch({
                    type: 'SET_1370_RESEARCH',
                    value: event.target.checked,
                  })
                }
              />
              <label className="cursor-pointer " htmlFor="research1370">
                1370 Stronghold Research
              </label>
            </div>
          </div>
          <div className="relative flex">
            <div className="w-1/2 pr-8">
              <div className="flex flex-col">
                {from?.map((item) => (
                  <ItemLine
                    key={item.slot}
                    disabled={item.hidden}
                    {...{ item, direction: 'from', dispatch }}
                  />
                ))}
              </div>
            </div>
            <Divider vertical>
              <span>TO</span>
            </Divider>
            <div className="w-1/2 pl-8">
              <div className="flex flex-col">
                {to?.map((item) => (
                  <ItemLine
                    key={item.slot}
                    disabled={item.hidden}
                    {...{ item, direction: 'to', dispatch }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
