import { Rarity } from '@pocket-ark/lost-ark-data';
import { capitalize, flatten } from 'lodash';
import { Dispatch } from 'react';
import { Icon } from 'semantic-ui-react';
import { useMediaSM } from '../../../../ui/breakpoints';
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

const levels = [
  { rarity: Rarity.Legendary, start: 1, end: 20 },
  { rarity: Rarity.Relic, start: 16, end: 25 },
].map((i) => ({
  ...i,
  options: new Array(i.end - i.start + 1)
    .fill(0)
    .map((_, index) => index + i.start),
}));

const options = flatten(
  levels.map((level) =>
    level.options.map((option) => ({
      rarity: level.rarity,
      level: option,
      id: optionKey(level.rarity, option),
    }))
  )
);

export const ItemLine: FC<ItemLineProps> = ({
  item,
  direction,
  disabled,
  dispatch,
}) => {
  const sm = useMediaSM();
  const name = sm === false ? item.slot.substr(0, 1) : item.slot;
  const value = optionKey(item.rarity, item.level);
  const rar = (r: Rarity) =>
    sm === false ? rarityString(r).substr(0, 3) : rarityString(r);

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
      <span className="grow text-center ">{capitalize(name)}</span>
      <div className=" text-right">
        <select
          value={value}
          onChange={(event) => {
            const { rarity, level } = idToOption(event.target.value);
            dispatch({
              type: 'SET_ITEM',
              slot: item.slot,
              rarity,
              level,
              direction,
            });
          }}
        >
          {options.map(({ rarity, level, id }) => (
            <option key={id} value={id}>
              {rar(rarity)} +{level}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

function idToOption(id: string) {
  return options.find((o) => o.id === id);
}

function optionKey(rarity: Rarity, level: number) {
  return `${rarity}_${level}`;
}
