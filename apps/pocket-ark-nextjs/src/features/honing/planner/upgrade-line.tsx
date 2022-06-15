import { BodyItemSlot, SingleLevelHoning } from '@pocket-ark/lost-ark-data';
import { capitalize } from 'lodash';
import { FC } from '../../../utils/react';
import { useHoningData } from './data';
import { SingleHone } from './single-hone';
import { HoneTotal } from './totals';
import { useHorizontalScroll } from '../../../ui/wheel-scroll';

export interface UpgradeLineProps {
  itemSlot: BodyItemSlot;
}

export const UpgradeLine: FC<UpgradeLineProps> = ({ itemSlot }) => {
  const data = useHoningData();
  const singleLevelHoning = data.find((d) => d.slot === itemSlot);
  const wrapperRef = useHorizontalScroll();

  return (
    <>
      <div
        className="w-full overflow-x-auto flex h-32 relative select-none border-b-2 border-gray-300 pr-32"
        ref={wrapperRef}
      >
        <div className="flex items-center justify-center w-32 sticky left-0 bg-stone-200 shrink-0 z-10">
          <h3>{itemName(itemSlot)}</h3>
        </div>
        {singleLevelHoning.costs.map((cost) => (
          <SingleHone key={key(cost)} singleLevelHoning={cost} />
        ))}
      </div>
      <div className="ml-auto w-32 h-full absolute top-0 right-0 bg-stone-200 z-10 border-gray-300 border-b-2">
        <HoneTotal slot={itemSlot} />
      </div>
    </>
  );
};

function key(cost: SingleLevelHoning) {
  return `${cost.rarirty}:${cost.fromLevel}-${cost.toLevel}`;
}

function itemName(itemSlot: BodyItemSlot) {
  return capitalize(itemSlot);
}
