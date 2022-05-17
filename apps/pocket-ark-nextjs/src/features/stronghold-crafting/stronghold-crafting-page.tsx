import { craftingRecipes, CurrencyType } from '@pocket-ark/lost-ark-data';
import { isNumber } from 'lodash';
import { usePricingSource } from '../../components';
import { Currency, MaterialsLine } from '../../ui';
import { MaterialIcon } from '../../ui/icons';
import { FC } from '../../utils';
import { readableSeconds } from '../../utils/time';

const tdClassName = 'border border-slate-300 p-4 text-left';

export const StrongholdCraftingPage: FC = () => {
  const { pricedMaterialsObject, addMaterials } = usePricingSource();

  const recipes = craftingRecipes
    .map((recipe) => {
      const { outputMaterial, amount } = recipe;
      const singlePrice = pricedMaterialsObject[outputMaterial]?.price || 0;
      const materialsTotal = addMaterials(recipe.requiredMaterials);
      if (!singlePrice || !materialsTotal) {
        return {
          ...recipe,
          totalPrice: '?',
          totalCost: '?',
          profit: '?',
          perc: '?',
        };
      }

      const totalPrice = singlePrice * (amount || 1);
      const totalCost = materialsTotal + recipe.requiredGold;
      const profit = totalPrice - totalCost;
      const perc = (profit / totalPrice) * 100;

      return { ...recipe, totalPrice, totalCost, profit, perc };
    })
    .sort((a, b) => {
      if (!isNumber(b.perc)) return -1;
      if (!isNumber(a.perc)) return 1;
      return (b.perc as number) - (a.perc as number);
    });

  return (
    <>
      <div className="container mx-auto mt-8 flex flex-col items-center">
        <h1>Stronghold Crafting</h1>
        <p>
          In this page you can compare the cost and sale price of various
          recipes that are available in stronghold workshop.
        </p>
        <p>The values do not include researchs that reduce cost or time.</p>
        <div className="w-full mt-8 flex justify-center">
          <table className="table-auto shadow-sm">
            <thead>
              <tr>
                <td className={tdClassName}>Recipe</td>
                <td className={tdClassName}>Materials</td>
                <td className={tdClassName}>Cost</td>
                <td className={tdClassName}>Energy</td>
                <td className={`${tdClassName} text-center`}>Time</td>
                <td className={tdClassName}>Total</td>
                <td className={tdClassName}>Sale</td>
                <td className={tdClassName}>Profit</td>
                <td className={tdClassName}>Perc.</td>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => {
                return (
                  <tr key={`${recipe.outputMaterial}x${recipe.amount}`}>
                    <td className={tdClassName}>
                      <div className="w-full flex flex-row items-center">
                        <MaterialIcon type={recipe.outputMaterial} />
                        <span className="ml-2">
                          {pricedMaterialsObject[recipe.outputMaterial]?.name}
                          {recipe.amount ? ` x${recipe.amount}` : ''}
                        </span>
                      </div>
                    </td>
                    <td className={tdClassName}>
                      <MaterialsLine materials={recipe.requiredMaterials} />
                    </td>
                    <td className={tdClassName}>
                      <Currency
                        type={CurrencyType.Gold}
                        value={recipe.requiredGold}
                      />
                    </td>
                    <td className={`${tdClassName} text-center`}>
                      {recipe.requiredActionEnergy}
                    </td>
                    <td className={`${tdClassName} text-center`}>
                      {readableSeconds(recipe.seconds)}
                    </td>
                    <td className={`${tdClassName} text-center`}>
                      <Currency
                        type={CurrencyType.Gold}
                        value={toFixed(recipe.totalCost)}
                      />
                    </td>
                    <td className={tdClassName}>
                      <Currency
                        type={CurrencyType.Gold}
                        value={recipe.totalPrice}
                      />
                    </td>
                    <td className={tdClassName}>
                      <Currency
                        type={CurrencyType.Gold}
                        value={toFixed(recipe.profit)}
                      />
                    </td>
                    <td className={tdClassName}>{toFixed(recipe.perc)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

function toFixed(num: number | string) {
  if (isNumber(num)) return (num as number).toFixed();
  return num;
}
