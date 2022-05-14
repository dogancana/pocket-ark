import { CurrencyType, materials } from '../static';
import { PricingSource } from './models';

type CurrenciesObject = { [key in CurrencyType]?: number };

export function getBaseCurrencyConversionRates(
  source?: PricingSource
): CurrenciesObject {
  const goldSale = source?.goldSalePrice;
  const packPrice = source?.royalCrystalsPack;
  const crystalSale = source?.crystalSalePrice;

  const valueOfOneRoyalCrystal = goldSale ? goldSale / 238 : undefined;
  const valueOfOneMoney =
    valueOfOneRoyalCrystal && packPrice
      ? (valueOfOneRoyalCrystal * 12000) / packPrice
      : undefined;
  const valueOfOnCrystal = crystalSale ? crystalSale / 95 : undefined;

  return {
    [CurrencyType.RealMoney]: valueOfOneMoney,
    [CurrencyType.RoyalCrystal]: valueOfOneRoyalCrystal,
    [CurrencyType.Crystal]: valueOfOnCrystal,
    [CurrencyType.Silver]: 1 / 1000,
    [CurrencyType.Gold]: 1,
  };
}

export function getPricedMaterials(source?: PricingSource) {
  const rates = getBaseCurrencyConversionRates(source);

  return materials.map((material) => {
    const price = source?.[material.type]?.price ?? undefined;
    return {
      ...material,
      price: source?.[material.type]?.price ?? undefined,
      values: {
        [CurrencyType.RealMoney]: toFixedValue(
          rates[CurrencyType.RealMoney],
          price,
          2
        ),
        [CurrencyType.RoyalCrystal]: toFixedValue(
          rates[CurrencyType.RoyalCrystal],
          price
        ),
        [CurrencyType.Crystal]: toFixedValue(
          rates[CurrencyType.Crystal],
          price
        ),
      },
    };
  });
}

function toFixedValue(rate?: number, price?: number, digits = 0) {
  if (!rate || !price) return undefined;
  const num = price / rate;
  return Number(num.toFixed(digits));
}
