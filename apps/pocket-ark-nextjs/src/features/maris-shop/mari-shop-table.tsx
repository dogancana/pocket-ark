import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { useMemo, useReducer } from 'react';
import { MaterialPopup, useMaterials } from '../../components';
import {
  Currency,
  MaterialIcon,
  SortableTableHeaders,
  sortableTableReducer,
  SortableTableReducer,
  TableHeader,
  orderForTable,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '../../ui';
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
    <div className="flex-1 overflow-x-auto">
      <Table>
        <TableHeader>
          <SortableTableHeaders
            headers={headers}
            column={column}
            dispatch={dispatch}
            direction={direction}
          />
        </TableHeader>
        <TableBody>
          {offers.map((o) => (
            <TableRow key={`${o.materialType}_${o.quantity}`}>
              <TableCell className="flex items-center">
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
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <Currency type={CurrencyType.Gold} value={o.price} />
              </TableCell>
              <TableCell className={mapScoreColor(o.score)}>
                {readableNumber(o.score, 2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
