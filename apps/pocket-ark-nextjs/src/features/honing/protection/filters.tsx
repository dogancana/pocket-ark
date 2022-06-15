import { BodyItemType, Rarity } from '@pocket-ark/lost-ark-data';
import { Dispatch } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import { FC } from '../../../utils/react';
import { Action } from './protection.reducer';

const rarities: Rarity[] = [Rarity.Legendary, Rarity.Relic];

interface HoningProtectionFiltersProps {
  toLevel: number;
  artisan: number;
  rarity: Rarity;
  itemType: BodyItemType;
  dispatch: Dispatch<Action>;
}

export const HoningProtectionFilters: FC<HoningProtectionFiltersProps> = ({
  toLevel,
  artisan,
  rarity,
  itemType,
  dispatch,
}) => {
  return (
    <>
      <Input
        value={toLevel || ''}
        placeholder="To level"
        label="To level"
        fluid
        type="number"
        onChange={(e) => dispatch({ type: 'SET_LEVEL', level: e.target.value })}
      />
      <Input
        value={artisan || ''}
        placeholder="Artisan %"
        label="Artisan"
        type="number"
        fluid
        onChange={(e) =>
          dispatch({ type: 'SET_ARTISAN', artisan: e.target.value })
        }
      />
      <div className="flex items-center">
        <Dropdown
          compact
          className="px-1"
          value={rarity}
          options={rarities.map((r) => ({ text: r, key: r, value: r }))}
          onChange={(_, data) =>
            dispatch({
              type: 'SET_RARITY',
              rarity: data.value as Rarity,
            })
          }
        />
      </div>
      <div className="flex items-center">
        <Dropdown
          compact
          className="px-1"
          value={itemType}
          options={[
            { text: 'Armor', value: 'armor' },
            { text: 'Weapon', value: 'weapon' },
          ]}
          onChange={(_, data) =>
            dispatch({
              type: 'SET_ITEM_TYPE',
              bodyItemType: data.value as BodyItemType,
            })
          }
        />
      </div>
    </>
  );
};
