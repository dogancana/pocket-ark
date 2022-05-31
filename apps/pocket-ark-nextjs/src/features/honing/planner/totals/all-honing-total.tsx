import {
  addCraftingMaterials,
  CurrencyItemType,
  CurrencyType,
  MaterialsToCraft
} from '@pocket-ark/lost-ark-data';
import { flatten } from 'lodash';
import { Divider } from 'semantic-ui-react';
import { MaterialCount, usePricingSource } from '../../../../components';
import { Currency } from '../../../../ui/currency/currency';
import { FC, readableNumber } from '../../../../utils';
import { sortMaterials } from '../../utils';
import { useHoningData } from '../data';

interface SlotTotals {
  materials: MaterialsToCraft;
  gold: number;
  silver: number;
  shards: number;
}

export const AllHoningTotal: FC = () => {
  const honingData = useHoningData();
  const { addMaterials } = usePricingSource();

  const flattened = flatten(honingData.map((d) => d.costs));

  const totals = flattened.reduce(
    (acc: SlotTotals, curr) => {
      return {
        materials: addCraftingMaterials(
          acc.materials,
          curr.itemsNeededOnAverage
        ),
        gold:
          acc.gold +
          curr.upgrade.gold * (curr.averageAttemptIndexToSuccess + 1),
        silver:
          acc.silver +
          curr.feed.silver +
          curr.upgrade.silver +
          (curr.averageAttemptIndexToSuccess + 1),
        shards:
          acc.shards +
          curr.feed.shards +
          curr.upgrade.shards * (curr.averageAttemptIndexToSuccess + 1),
      };
    },
    {
      materials: [],
      gold: 0,
      silver: 0,
      shards: 0,
    }
  );

  const totalCost = addMaterials(totals.materials);

  return (
    <div>
      <Divider />
      <div className="flex pb-40">
        Need on average:
        <div className="flex flex-col items-end">
          <div className="flex">
            {sortMaterials(totals.materials).map((m) => (
              <MaterialCount
                key={m.type}
                type={m.type}
                value={readableNumber(m.amount)}
                className="ml-3"
              />
            ))}
          </div>
          <div className="flex mt-2">
            <Currency
              type={CurrencyType.Silver}
              value={readableNumber(totals.silver)}
              className="mr-3"
            />
            <Currency
              type={CurrencyItemType.HonorShard}
              value={readableNumber(totals.shards)}
              className="mr-3"
            />
            <Currency
              type={CurrencyType.Gold}
              value={readableNumber(totals.gold)}
            />
          </div>
        </div>
        <div className="w-0.5 bg-gray-300 mx-8 my-1"></div>
        <div>
          <div className="flex items-center">
            Mats. Cost:
            <div>
              <Currency
                type={CurrencyType.Gold}
                value={readableNumber(totalCost)}
                className="ml-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
