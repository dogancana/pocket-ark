import { useState } from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import { FC } from '../../utils/react';
import { headers, StrongholdColumnType } from './constants';
import { useStrongholdCraftingFilters } from './stronghold-crafting-filters-provider';

interface State {
  open: boolean;
}

const headersToToggle: StrongholdColumnType[] = [
  'materials',
  'cost',
  'total',
  'sale',
  'profitPerAE',
  'profitPerH',
];

export const StrongholdCraftingTools: FC = () => {
  const [state, setState] = useState<State>({ open: false });
  const toggleOpen = () => setState((p) => ({ ...p, open: !p.open }));
  const { enabledMap, dispatch } = useStrongholdCraftingFilters();

  return (
    <>
      <Icon
        name="cog"
        size="large"
        onClick={toggleOpen}
        className="cursor-pointer"
      />
      <Modal open={state.open} onClose={toggleOpen} size="small" centered>
        <Modal.Header>Stronghold Crafting Table Options</Modal.Header>
        <Modal.Content>
          <div>
            <h2 className="font-bold text-l py-4">Show columns</h2>
            {headersToToggle.map((type) => (
              <div key={type}>
                <input
                  className="h-4 w-4 border rounded-sm mr-2 "
                  type="checkbox"
                  id={type}
                  checked={enabledMap[type]}
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_COLUMN',
                      columnType: type,
                      enabled: event.target.checked,
                    })
                  }
                />
                <label className="cursor-pointer " htmlFor={type}>
                  {headers.find((h) => h.type === type).label}
                </label>
              </div>
            ))}
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
