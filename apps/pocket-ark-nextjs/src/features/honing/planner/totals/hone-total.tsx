import { BodyItemSlot, CurrencyType } from '@pocket-ark/lost-ark-data';
import { Currency } from '../../../../ui';
import { FC } from '../../../../utils/react';
import { useHoningData } from '../data/use-honing-data';

export interface HoneTotalProps {
  className?: string;
  slot: BodyItemSlot;
}

export const HoneTotal: FC<HoneTotalProps> = ({ slot, className }) => {
  const honingCostsWithTotals = useHoningData();
  const costs = honingCostsWithTotals.find((c) => c.slot === slot)?.costs;

  if (!costs) return null;

  const expectedCost = costs.reduce(
    (acc, curr) => acc + curr.expectedCostProtected,
    0
  );

  return (
    <div className="h-full flex justify-center items-center">
      <Currency
        className={`text-center ${className || ''}`}
        size={15}
        type={CurrencyType.Gold}
        arround
        value={expectedCost}
      />
    </div>
  );
};
