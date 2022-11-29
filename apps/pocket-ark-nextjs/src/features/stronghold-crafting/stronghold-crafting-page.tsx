import {
  craftingRecipes,
  CurrencyType,
  materialsObject,
  MaterialType,
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
  sortableTableReducer,
  SortableTableReducer,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../ui';
import ErrorBoundary from '../../ui/error-boundry';
import { MaterialIcon } from '../../ui/icons';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils/react';
import { headers, TableRecipe } from './constants';
import { StrongholdCraftingTools } from './stronghold-crafting-page-tools';
import { useStrongholdCraftingFilters } from './stronghold-crafting-filters-provider';

export const StrongholdCraftingPage: FC = () => {
  const { header, description } = mainFeatures.strongholdCrafting;
  const { materials, addMaterials } = useMaterials();
  const { enabledMap } = useStrongholdCraftingFilters();

  const [{ column, direction }, dispatch] = useReducer<
    SortableTableReducer<keyof TableRecipe>
  >(sortableTableReducer, {
    column: 'profitPerHour',
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

        const timesPerHour = 3 * (3600 / recipe.seconds);
        const timesPerActionEnergy = 10000 / recipe.requiredActionEnergy;
        const profitPerActionEnergy =
          profit * Math.min(timesPerActionEnergy, timesPerHour * 24);
        const perc = (profit / totalPrice) * 100;

        const timesPerHourlyActionEnergy =
          10000 / 24 / recipe.requiredActionEnergy;
        const profitPerHour =
          profit * Math.min(timesPerHour, timesPerHourlyActionEnergy);

        return {
          ...recipe,
          totalPrice,
          totalCost,
          profit,
          perc,
          profitPerHour,
          profitPerActionEnergy,
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
      <PageContainer className="self-stretch md:self-auto mt-0 pb-8">
        <div className="flex row py-4">
          <span className="ml-auto">
            <ErrorBoundary message="Honing planner filters">
              <StrongholdCraftingTools />
            </ErrorBoundary>
          </span>
        </div>
        <div className="flex-1 overflow-x-auto">
          <Table>
            <TableHeader>
              <SortableTableHeaders
                headers={headers.filter((h) => enabledMap[h.type])}
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
                  {enabledMap.materials && (
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
                  )}
                  {enabledMap.cost && (
                    <TableCell>
                      <Currency
                        type={CurrencyType.Gold}
                        value={recipe.requiredGold}
                      />
                    </TableCell>
                  )}
                  {enabledMap.total && (
                    <TableCell>
                      <Currency
                        type={CurrencyType.Gold}
                        value={recipe.totalCost}
                      />
                    </TableCell>
                  )}
                  {enabledMap.sale && (
                    <TableCell>
                      <Currency
                        type={CurrencyType.Gold}
                        value={recipe.totalPrice}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <Currency type={CurrencyType.Gold} value={recipe.profit} />
                  </TableCell>
                  {enabledMap.perc && (
                    <TableCell>
                      {recipe.perc ? `${toFixed(recipe.perc)}%` : '?'}
                    </TableCell>
                  )}
                  {enabledMap.profitPerAE && (
                    <TableCell>
                      <Currency
                        type={CurrencyType.Gold}
                        value={recipe.profitPerActionEnergy}
                      />
                    </TableCell>
                  )}
                  {enabledMap.profitPerH && (
                    <TableCell>
                      <Currency
                        type={CurrencyType.Gold}
                        value={recipe.profitPerHour}
                      />
                    </TableCell>
                  )}
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
