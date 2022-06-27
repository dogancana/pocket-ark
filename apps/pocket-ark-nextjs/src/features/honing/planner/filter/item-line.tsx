import { Rarity } from '@pocket-ark/lost-ark-data';
import { capitalize } from 'lodash';
import { Dispatch } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { rarityString } from '../../../../utils/rarity';
import { FC } from '../../../../utils/react';
import { Action } from './honing-reducer';
import { Item } from './models';

interface ItemLineProps {
  item: Item;
  direction: 'from' | 'to';
  disabled?: boolean;
  dispatch: Dispatch<Action>;
}

const rarity: Rarity[] = [Rarity.Legendary, Rarity.Relic];

export const ItemLine: FC<ItemLineProps> = ({
  item,
  direction,
  disabled,
  dispatch,
}) => {
  return (
    <fieldset
      disabled={disabled}
      className="mt-2 rounded-sm bg-gray-300 flex items-center p-2"
      style={{ opacity: disabled ? 0.5 : undefined }}
    >
      {direction === 'from' && (
        <div
          className="mr-2 cursor-pointer"
          onClick={() =>
            dispatch({
              type: 'SET_HIDDEN',
              slot: item.slot,
              hidden: !item.hidden,
            })
          }
        >
          <Icon name={item.hidden ? 'eye slash' : 'eye'} />
        </div>
      )}
      <Dropdown
        className="w-1/3"
        compact
        value={item.rarity}
        options={rarity.map((r) => ({
          text: rarityString(r),
          key: r,
          value: r,
        }))}
        disabled={disabled}
        onChange={(_, data) =>
          dispatch({
            type: 'SET_ITEM',
            rarity: data.value as Rarity,
            slot: item.slot,
            direction,
          })
        }
      />
      <span className="grow text-center ">{capitalize(item.slot)}</span>
      <div className="w-1/4 text-right">
        <input
          value={item.level}
          className="appearance-none p-2 w-14"
          type="number"
          onChange={(e) => {
            dispatch({
              type: 'SET_ITEM',
              level: parseInt(e.target.value),
              slot: item.slot,
              direction,
            });
          }}
        />
      </div>
    </fieldset>
  );
};
