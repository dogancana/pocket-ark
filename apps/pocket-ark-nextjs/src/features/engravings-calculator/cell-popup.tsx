import { Fragment } from 'react';
import { Divider, Popup } from 'semantic-ui-react';
import { FC } from '../../utils/react';
import { readableNumber } from '../honing/planner/single-hone';
import { DamageCalculationResult } from './utils';

export interface CellPopupProps {
  result: DamageCalculationResult;
}

export const CellPopup: FC<CellPopupProps> = ({ result, children }) => {
  const lines = [
    {
      text: 'Base Damage',
      value: result.baseDamage,
    },
    {
      text: 'Base Crit',
      value: result.critRate,
    },
    {},
    {
      text: 'Damage without engravings',
      value: result.witoutEngravings.damage,
    },
    { text: 'Damage with engravings', value: result.withEngravings.damage },
    { text: 'Damage Increase', value: result.damageIncrease },
    {
      text: 'Damage increase Perc',
      value: result.damageIncreasePerc,
      perc: true,
    },
  ];

  return (
    <Popup trigger={children} flowing hoverable mouseEnterDelay={200}>
      <Popup.Content>
        <div className="flex flex-col">
          {lines.map((line, index) => (
            <Fragment key={line.text || `divider-${index}`}>
              {!line.text && <Divider />}
              {line.text && (
                <div>
                  <strong className="mr-2">{line.text}:</strong>
                  {readableNumber(line.value)}
                  {line.perc && '%'}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Popup.Content>
    </Popup>
  );
};
