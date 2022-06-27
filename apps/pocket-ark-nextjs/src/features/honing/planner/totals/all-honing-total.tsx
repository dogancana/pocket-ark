import {
  addCraftingMaterials,
  CurrencyItemType,
  CurrencyType, MaterialsToCraft
} from '@pocket-ark/lost-ark-data';
import { flatten } from 'lodash';
import { useState } from 'react';
import { Divider } from 'semantic-ui-react';
import { useMaterials } from '../../../../components';
import { MaterialsLine } from '../../../../components/materials';
import { Currency } from '../../../../ui/currency/currency';
import { FC } from '../../../../utils/react';
import { sortMaterials } from '../../utils';
import { useHoningData } from '../data';
import { ExcludedMaterials } from './excluded-materials';

interface SlotTotals {
  materials: MaterialsToCraft;
  gold: number;
  silver: number;
  shards: number;
}

interface State {
  excludedMaterials: MaterialsToCraft;
}

export const AllHoningTotal: FC = () => {
  const honingData = useHoningData();
  const { materials, addMaterials } = useMaterials();
  const [{ excludedMaterials }, setState] = useState<State>({
    excludedMaterials: [],
  });

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

  const totalCost = addMaterials(
    totals.materials.map((m) => {
      const alreadyHave = excludedMaterials.find((e) => e.type === m.type);
      const amount = alreadyHave
        ? Math.max(0, m.amount - alreadyHave.amount)
        : m.amount;
      return { type: m.type, amount };
    })
  );

  const honingMaterials = sortMaterials(totals.materials).map((m) => ({
    ...materials[m.type],
    count: m.amount,
  }));

  if (totals.gold === 0) {
    return <span className="text-gray-500">Nothing to calculate</span>;
  }

  return (
    <div>
      <Divider />
      <div className="flex pb-40">
        Need on average:
        <div className="flex flex-col items-end">
          <div className="flex pl-3">
            <MaterialsLine materials={honingMaterials} />
          </div>
          <div className="flex mt-2">
            <Currency
              type={CurrencyType.Silver}
              value={totals.silver}
              className="mr-3"
            />
            <Currency
              type={CurrencyItemType.HonorShard}
              value={totals.shards}
              className="mr-3"
            />
            <Currency type={CurrencyType.Gold} value={totals.gold} />
          </div>
        </div>
        <div className="w-0.5 bg-gray-300 mx-8 my-1"></div>
        <div>
          <div className="flex items-center">
            Mats. Cost:
            <div className="flex align-center">
              <Currency
                type={CurrencyType.Gold}
                value={totalCost}
                className="mx-3"
              />
              <ExcludedMaterials onMaterialsChanged={onMaterialsExcluded} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function onMaterialsExcluded(materials: MaterialsToCraft) {
    setState((p) => ({ ...p, excludedMaterials: materials }));
  }
};
