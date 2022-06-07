import {
  armorHoningCosts,
  BodyItemType,
  CurrencyItemType,
  CurrencyType,
  MaterialType,
  weaponHoningCosts,
} from '@pocket-ark/lost-ark-data';
import { Fragment, useReducer } from 'react';
import { Header } from 'semantic-ui-react';
import { usePricingSource } from '../../../components/material-pricing-provider';
import { MaterialsLine } from '../../../components/materials/materials-line';
import { mainFeatures } from '../../../services/site-constants';
import { HeroSection } from '../../../ui/layout';
import { PageContainer } from '../../../ui/layout/layout';
import { FC } from '../../../utils';
import { protection } from '../utils';
import { HoningProtectionFilters } from './filters';
import { initial, reducer } from './protection.reducer';
import { ProtectionResults } from './results';
import { Currency } from '../../../ui';

export const HoningProtectionPage: FC = () => {
  const { pricedMaterialsObject, addMaterials } = usePricingSource();
  const { header, description } = mainFeatures.honingProtection;
  const [
    { honingMaterials, toLevel, artisan, rarity, itemType, costs },
    dispatch,
  ] = useReducer(reducer, initial);
  const materials =
    honingMaterials?.map((m) => ({
      ...pricedMaterialsObject[m.type],
      amount: m.amount,
    })) || [];

  const currencies = [
    { type: CurrencyType.Gold, amount: costs?.upgrade.gold },
    { type: CurrencyType.Silver, amount: costs?.upgrade.silver },
    { type: CurrencyItemType.HonorShard, amount: costs?.upgrade.shards },
  ];

  const protectionMaterials = mapStateWithHoningMaterials(
    {
      itemType,
      artisan,
      toLevel,
    },
    pricedMaterialsObject,
    addMaterials
  );

  return (
    <>
      <HeroSection>
        <Header as="h1">{header}</Header>
        <p>
          {description.map((d) => (
            <Fragment key={d}>
              {d} <br />
            </Fragment>
          ))}
        </p>
        <span className="w-full md:w-1/2 text-stone-400">
          The calculations are done by excluding cost of honor shards and
          silver. It's assumed that you won't be buying them with gold. <br />
          Option to calculate them will be added in future.
        </span>
      </HeroSection>
      <PageContainer className="mt-8 w-full flex flex-col items-center">
        <div className="w-full md:w-1/2">
          <Header as="h2">Honing Details</Header>
          <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <HoningProtectionFilters
              {...{ toLevel, rarity, itemType, dispatch, artisan }}
            />
          </div>
          {materials.length > 0 && (
            <div className="pt-8 px-2 flex items-center">
              <MaterialsLine materials={materials} />
              {currencies.map(({ type, amount }) => (
                <Currency
                  key={type}
                  type={type}
                  value={amount}
                  size={20}
                  className="ml-3"
                />
              ))}
            </div>
          )}
        </div>
        {materials.length > 0 && (
          <div className="mt-8 pt-8 w-full md:w-1/2 border-t-2 border-gray-300">
            <ProtectionResults protectionMaterials={protectionMaterials} />
          </div>
        )}
      </PageContainer>
    </>
  );
};

function mapStateWithHoningMaterials(
  state: { itemType: BodyItemType; toLevel: number; artisan: number },
  prices: ReturnType<typeof usePricingSource>['pricedMaterialsObject'],
  addMaterials: ReturnType<typeof usePricingSource>['addMaterials']
) {
  const costs = (
    state.itemType === 'armor' ? armorHoningCosts : weaponHoningCosts
  ).find((c) => c.toLevel === state.toLevel);

  if (!costs) return undefined;

  const cost =
    addMaterials(
      costs.upgrade.materials.filter(
        (m) => m.type !== MaterialType.HonorShardPouchMedium
      )
    ) + costs.upgrade.gold;

  const { start, maxAttempts, increase } = costs.chance;
  const attemptNumber = Math.min(
    Math.ceil((state.artisan || 0) / (100 / maxAttempts)),
    maxAttempts
  );
  const chance = Math.min(
    100,
    Math.min(start * 2, start + attemptNumber * increase)
  );
  const protectionMats = protection(
    start,
    chance,
    cost,
    state.toLevel,
    costs.rarirty,
    state.itemType,
    prices
  );

  return protectionMats;
}
