import { DamageModifier, Engraving } from '@pocket-ark/lost-ark-data';
import { useState } from 'react';
import { Divider, Icon, Popup } from 'semantic-ui-react';
import { EngravingIcon } from '../../../ui/icons';
import { FC } from '../../../utils/react';
import { useEngravingFilters } from '../filters/filters-provider';
import { useMediaSM } from '../../../ui/breakpoints';

export interface AppliedEngravingPopupProps {
  engraving: Engraving;
  levelIndex: number;
}

const damageModifierNameMap: { [key in keyof DamageModifier]: string } = {
  attackPower: 'Attack Power',
  attackSpeed: 'Attack Speed',
  critRatePerc: 'Crit Rate',
  critDamage: 'Crit Damage',
  damageMultiplier: 'Damage Multiplier',
  damageAddition: 'Damage Addition',
};

export const AppliedEngravingPopup: FC<AppliedEngravingPopupProps> = ({
  engraving,
  levelIndex,
}) => {
  const [hovered, setHovered] = useState(false);
  const { dispatch } = useEngravingFilters();
  const appliedModifier = engraving.damageModifier[levelIndex];
  const info = Object.entries(appliedModifier).map(([key, value]) => ({
    label: damageModifierNameMap[key],
    value,
  }));

  return (
    <Popup
      hoverable
      trigger={
        <div
          className="flex flex-col items-center mr-4 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setHovered(true);
            dispatch({
              type: 'ChangeEngraving',
              engravingType: engraving.type,
              levelIndex: (levelIndex + 1) % 3,
            });
          }}
        >
          <div
            className={`flex relative z-0 transition-all bg-stone-300 rounded-l-full rounded-r-full ${
              hovered ? 'pr-12' : ''
            }`}
          >
            <EngravingIcon
              type={engraving.type}
              overrides={{ width: 50, height: 50 }}
            />
            <div
              className="absolute right-2 h-full flex items-center -z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch({
                  type: 'RemoveEngraving',
                  engravingType: engraving.type,
                });
              }}
            >
              <Icon name="trash" size="large" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">lvl {levelIndex + 1}</span>
        </div>
      }
    >
      <Popup.Header>
        {engraving.name}
        <span className="text-sm text-gray-500 ml-1">lvl.{levelIndex + 1}</span>
      </Popup.Header>
      <Popup.Content>
        <Divider />
        {info.map((i) => (
          <div key={i.label} className="flex items-center">
            <span className="mr-2">{i.label}</span>
            {i.value}
          </div>
        ))}
      </Popup.Content>
    </Popup>
  );
};
