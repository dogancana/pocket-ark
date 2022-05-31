import { FC } from '../../../utils';
import { useHoningData } from './data';
import { useHoningFilter } from './filter/honing-filter-provider';
import { AllHoningTotal } from './totals';
import { UpgradeLine } from './upgrade-line';

export const ItemsContainer: FC = () => {
  const {
    state: { from },
  } = useHoningFilter();

  const honingData = useHoningData();

  console.log('d', honingData);

  return (
    <>
      <div className="grow border-2 border-stone-300">
        {honingData
          .filter((i) => !from.find((f) => f.slot === i.slot).hidden)
          .map((data) => (
            <div key={data.slot} className="w-full relative">
              <UpgradeLine itemSlot={data.slot} />
            </div>
          ))}
      </div>
      <div className="flex">
        <div className="ml-auto mt-3">
          <AllHoningTotal />
        </div>
      </div>
    </>
  );
};
