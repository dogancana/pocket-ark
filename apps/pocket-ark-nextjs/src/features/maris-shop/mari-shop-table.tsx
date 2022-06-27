import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { useMemo, useReducer } from 'react';
import { Table } from 'semantic-ui-react';
import { MaterialPopup, useMaterials } from '../../components';
import {
  Currency,
  MaterialIcon,
  SortableTableHeaders,
  sortableTableReducer,
  SortableTableReducer
} from '../../ui';
import { orderForTable } from '../../ui/sortable-table';
import { PricedMaterial } from '../../utils/materials';
import { readableNumber } from '../../utils/numbers';
import { FC } from '../../utils/react';
import { mapScoreColor } from '../../utils/score';
import { MariOffer, mariOffers } from './constants';

interface TableOffer extends MariOffer {
  material?: PricedMaterial;
  price: number;
  mariGoldPrice: number;
  score: number;
}

const headers: { label: string; column: keyof TableOffer }[] = [
  { label: 'Offer', column: 'materialType' },
  { label: 'Price', column: 'blueCrystalCost' },
  { label: 'Gold in Market', column: 'price' },
  { label: 'Score', column: 'score' },
];

export const MariShopTable: FC = () => {
  const { materials, rates } = useMaterials();

  const [{ column, direction }, dispatch] = useReducer<
    SortableTableReducer<keyof TableOffer>
  >(sortableTableReducer, {
    column: 'score',
    direction: 'descending',
  });

  const offers = useMemo(() => {
    return orderForTable(
      mariOffers.map((o): TableOffer => {
        const material = materials[o.materialType];
        const price =
          o.quantity * (material.lowPrice / (material.saleAmount || 1));
        const mariGoldPrice = rates[CurrencyType.Crystal] * o.blueCrystalCost;

        return {
          ...o,
          material,
          price,
          mariGoldPrice,
          score: price / mariGoldPrice,
        };
      }),
      column,
      direction
    );
  }, [materials, rates, column, direction]);

  return (
    <>
      <Table singleLine sortable striped>
        <Table.Header>
          <SortableTableHeaders
            headers={headers}
            column={column}
            dispatch={dispatch}
            direction={direction}
          />
        </Table.Header>
        <Table.Body>
          {offers.map((o) => (
            <Table.Row key={`${o.materialType}_${o.quantity}`}>
              <Table.Cell className="flex items-center">
                <MaterialPopup material={o.material}>
                  <div className="w-full flex flex-row items-center">
                    <MaterialIcon
                      type={o.materialType}
                      overrides={{ width: 25, height: 25 }}
                      className="mr-2"
                    />
                    {o.material.name}
                    <span className="text-sm text-gray-500 ml-2">
                      x{o.quantity}
                    </span>
                  </div>
                </MaterialPopup>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <Currency
                    type={CurrencyType.Crystal}
                    value={o.blueCrystalCost}
                  />
                  <Currency
                    type={CurrencyType.Gold}
                    value={o.mariGoldPrice}
                    className="opacity-50 ml-2"
                  />
                </div>
              </Table.Cell>
              <Table.Cell>
                <Currency type={CurrencyType.Gold} value={o.price} />
              </Table.Cell>
              <Table.Cell className={mapScoreColor(o.score)}>
                {readableNumber(o.score, 2)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
