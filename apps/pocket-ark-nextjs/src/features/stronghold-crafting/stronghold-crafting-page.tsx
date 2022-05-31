import {
  CraftingRecipe,
  craftingRecipes,
  CurrencyType
} from '@pocket-ark/lost-ark-data';
import { isNumber } from 'lodash';
import { useMemo, useReducer } from 'react';
import { Header, Table } from 'semantic-ui-react';
import {
  MaterialPopup,
  MaterialsLine,
  usePricingSource
} from '../../components';
import {
  Currency,
  orderForTable,
  SortableTableHeaders,
  SortableTableItem,
  sortableTableReducer,
  SortableTableReducer
} from '../../ui';
import { MaterialIcon } from '../../ui/icons';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils';
import { readableSeconds } from '../../utils/time';

interface TableRecipe extends CraftingRecipe {
  totalPrice?: number;
  totalCost?: number;
  profit?: number;
  perc?: number;
  materialsTotal?: number;
}

const headers: SortableTableItem<keyof TableRecipe>[] = [
  { label: 'Recipe', column: 'outputMaterial', notSortable: true },
  { label: 'Materials', column: 'materialsTotal' },
  { label: 'Cost', column: 'requiredGold' },
  { label: 'Energy', column: 'requiredActionEnergy' },
  { label: 'Time', column: 'seconds' },
  { label: 'Total', column: 'totalCost' },
  { label: 'Sale', column: 'totalPrice' },
  { label: 'Profit', column: 'profit' },
  { label: 'Perc.', column: 'perc' },
];

export const StrongholdCraftingPage: FC = () => {
  const { pricedMaterialsObject, addMaterials } = usePricingSource();

  const [{ column, direction }, dispatch] = useReducer<
    SortableTableReducer<keyof TableRecipe>
  >(sortableTableReducer, {
    column: 'perc',
    direction: 'descending',
  });

  const recipes = useMemo(() => {
    return orderForTable(
      craftingRecipes.map((recipe): TableRecipe => {
        const { outputMaterial, amount } = recipe;
        const singlePrice = pricedMaterialsObject[outputMaterial]?.price || 0;
        const materialsTotal = addMaterials(recipe.requiredMaterials);

        if (!singlePrice || !materialsTotal) {
          return {
            ...recipe,
            totalCost: 0,
            totalPrice: 0,
            profit: 0,
            perc: 0,
            materialsTotal: 0,
          };
        }

        const totalPrice = singlePrice * (amount || 1);
        const totalCost = materialsTotal + recipe.requiredGold;
        const profit = totalPrice - totalCost;
        const perc = (profit / totalPrice) * 100;

        return {
          ...recipe,
          totalPrice,
          totalCost,
          profit,
          perc,
          materialsTotal,
        };
      }),
      column,
      direction
    );
  }, [pricedMaterialsObject, addMaterials, column, direction]);

  return (
    <>
      <HeroSection>
        <Header>Stronghold Crafting</Header>
        <p>
          In this page you can compare the cost and sale price of various
          recipes that are available in stronghold workshop.
          <br />
          The values do not include researchs that reduce cost or time.
        </p>
      </HeroSection>
      <PageContainer className="mb-12">
        <Table singleLine sortable striped>
          <Table.Header>
            <SortableTableHeaders
              headers={headers}
              column={column}
              direction={direction}
              dispatch={dispatch}
            />
          </Table.Header>
          <Table.Body>
            {recipes.map((recipe) => (
              <Table.Row
                key={`${recipe.outputMaterial}x${
                  recipe.amount
                }${recipe.requiredMaterials.map((m) => m.type).join(',')}`}
              >
                <Table.Cell>
                  <MaterialPopup
                    material={pricedMaterialsObject[recipe.outputMaterial]}
                  >
                    <div className="w-full flex flex-row items-center">
                      <MaterialIcon type={recipe.outputMaterial} />
                      <span className="ml-2">
                        {pricedMaterialsObject[recipe.outputMaterial]?.name}
                        {recipe.amount ? ` x${recipe.amount}` : ''}
                      </span>
                    </div>
                  </MaterialPopup>
                </Table.Cell>
                <Table.Cell>
                  <MaterialsLine
                    materials={recipe.requiredMaterials.map((m) => ({
                      ...pricedMaterialsObject[m.type],
                      amount: m.amount,
                    }))}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Currency
                    type={CurrencyType.Gold}
                    value={recipe.requiredGold}
                  />
                </Table.Cell>
                <Table.Cell>{recipe.requiredActionEnergy}</Table.Cell>
                <Table.Cell>{readableSeconds(recipe.seconds)}</Table.Cell>
                <Table.Cell>
                  <Currency
                    type={CurrencyType.Gold}
                    value={toFixed(recipe.totalCost)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Currency
                    type={CurrencyType.Gold}
                    value={recipe.totalPrice || '?'}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Currency
                    type={CurrencyType.Gold}
                    value={toFixed(recipe.profit)}
                  />
                </Table.Cell>
                <Table.Cell>
                  {recipe.perc ? `${toFixed(recipe.perc)}%` : '?'}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </PageContainer>
    </>
  );
};

function toFixed(num?: number | string) {
  if (!num) return '?';
  if (isNumber(num)) return (num as number).toFixed();
  return num;
}
