import {
  CraftingRecipe,
  craftingRecipes,
  CurrencyType,
  materialsObject,
} from '@pocket-ark/lost-ark-data';
import { isNumber } from 'lodash';
import { Fragment, useMemo, useReducer } from 'react';
import { Header } from 'semantic-ui-react';
import { MaterialPopup, MaterialsLine, useMaterials } from '../../components';
import { mainFeatures } from '../../services/site-constants';
import {
  Currency,
  orderForTable,
  SortableTableHeaders,
  SortableTableItem,
  sortableTableReducer,
  SortableTableReducer,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../ui';
import { MaterialIcon } from '../../ui/icons';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils/react';

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
  { label: 'Total', column: 'totalCost' },
  { label: 'Sale', column: 'totalPrice' },
  { label: 'Profit', column: 'profit' },
  { label: 'Perc.', column: 'perc' },
];

export const StrongholdCraftingPage: FC = () => {
  const { header, description } = mainFeatures.strongholdCrafting;
  const { materials, addMaterials } = useMaterials();

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
        const mat = materials[outputMaterial];
        const singlePrice = (mat?.lowPrice || 0) / (mat?.amount || 1);
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
  }, [materials, addMaterials, column, direction]);

  return (
    <>
      <HeroSection>
        <Header as="h1">{header}</Header>
        <p>
          {description.map((d) => (
            <Fragment key={d}>
              {d}
              <br />
            </Fragment>
          ))}
        </p>
      </HeroSection>
      <PageContainer className="self-stretch md:self-auto mt-8">
        <div className="flex-1 overflow-x-auto">
          <Table>
            <TableHeader>
              <SortableTableHeaders
                headers={headers}
                column={column}
                direction={direction}
                dispatch={dispatch}
              />
            </TableHeader>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow
                  key={`${recipe.outputMaterial}x${
                    recipe.amount
                  }${recipe.requiredMaterials.map((m) => m.type).join(',')}`}
                >
                  <TableCell>
                    <MaterialPopup material={materials[recipe.outputMaterial]}>
                      <div className="w-full flex flex-row items-center">
                        <MaterialIcon type={recipe.outputMaterial} />
                        <span className="ml-2">
                          {materialsObject[recipe.outputMaterial]?.name}
                          {recipe.amount ? ` x${recipe.amount}` : ''}
                        </span>
                      </div>
                    </MaterialPopup>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MaterialsLine
                        materials={recipe.requiredMaterials.map((m) => ({
                          ...materials[m.type],
                          count: m.amount,
                        }))}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Currency
                      type={CurrencyType.Gold}
                      value={recipe.requiredGold}
                    />
                  </TableCell>
                  <TableCell>
                    <Currency
                      type={CurrencyType.Gold}
                      value={recipe.totalCost}
                    />
                  </TableCell>
                  <TableCell>
                    <Currency
                      type={CurrencyType.Gold}
                      value={recipe.totalPrice}
                    />
                  </TableCell>
                  <TableCell>
                    <Currency type={CurrencyType.Gold} value={recipe.profit} />
                  </TableCell>
                  <TableCell>
                    {recipe.perc ? `${toFixed(recipe.perc)}%` : '?'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PageContainer>
    </>
  );
};

function toFixed(num?: number | string) {
  if (!num) return '?';
  if (isNumber(num)) return (num as number).toFixed();
  return num;
}
