import { CurrencyItemType, CurrencyType } from '@pocket-ark/lost-ark-data';
import { useMemo, useReducer } from 'react';
import { useMaterials } from '../../components';
import {
  Currency,
  MaterialIcon,
  orderForTable,
  SortableTableHeaders,
  SortableTableReducer,
  sortableTableReducer,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  useMediaSM
} from '../../ui';
import { PricedMaterial } from '../../utils/materials';
import { readableNumber } from '../../utils/numbers';
import { FC } from '../../utils/react';

export interface InfiniteChaosTableProps {
  shardsPerHour?: number;
}

interface TableMaterial extends PricedMaterial {
  valuePerShard: number;
  matsPerHour: number;
  goldPerHour: number;
}

const headers: {
  label: string;
  column: keyof TableMaterial;
  hideSm?: boolean;
}[] = [
  { label: 'Material', column: 'name' },
  { label: 'Price', column: 'avgPrice', hideSm: true },
  { label: 'Shards', column: 'chaosDungeonShards', hideSm: true },
  { label: 'Gold/Shard', column: 'valuePerShard', hideSm: true },
  { label: 'Gold x99', column: 'avgPrice' },
  { label: 'Mats/hr', column: 'matsPerHour' },
  { label: 'Gold/hr', column: 'goldPerHour' },
];

export const InfiniteChaosTable: FC<InfiniteChaosTableProps> = ({
  shardsPerHour: shardsPerHourProp,
}) => {
  const sm = useMediaSM();
  const [{ column, direction }, dispatch] = useReducer<
    SortableTableReducer<keyof TableMaterial>
  >(sortableTableReducer, {
    column: 'goldPerHour',
    direction: 'descending',
  });

  const { materials } = useMaterials();
  const sortedMaterials = useMemo(
    () =>
      orderForTable(
        Object.values(materials)
          .filter((m) => !!m.chaosDungeonShards)
          .map(
            (m): TableMaterial => ({
              ...m,
              valuePerShard: valuePerShard(m),
              matsPerHour: matsPerHour(m, shardsPerHourProp),
              goldPerHour: goldPerHour(m, shardsPerHourProp),
            })
          ),
        column,
        direction
      ),
    [materials, shardsPerHourProp, column, direction]
  );
  const filteredHeaders = headers.filter((h) =>
    sm === false ? (h.hideSm ? false : true) : true
  );

  return (
    <div className="flex-1 overflow-x-auto">
      <Table>
        <TableHeader>
          <SortableTableHeaders
            headers={filteredHeaders}
            column={column}
            dispatch={dispatch}
            direction={direction}
          />
        </TableHeader>
        <TableBody>
          {sortedMaterials.map((material) => (
            <TableRow key={material.type} className="py-4">
              <TableCell>
                <div className="w-full flex flex-row items-center">
                  <MaterialIcon type={material.type} />
                  {sm === true && <span className="ml-2">{material.name}</span>}
                </div>
              </TableCell>
              {sm === true && (
                <>
                  <TableCell>
                    <Currency
                      type={CurrencyType.Gold}
                      value={material.lowPrice}
                    />
                  </TableCell>
                  <TableCell>
                    <Currency
                      type={CurrencyItemType.ShardOfPurification}
                      value={material.chaosDungeonShards}
                    />
                  </TableCell>
                  <TableCell>
                    {readableNumber(material.valuePerShard, 2)}
                  </TableCell>
                </>
              )}
              <TableCell>
                <Currency
                  type={CurrencyType.Gold}
                  value={material.lowPrice * 99}
                />
              </TableCell>
              <TableCell>{readableNumber(material.matsPerHour, 1)}</TableCell>
              <TableCell>{readableNumber(material.goldPerHour)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

function matsPerHour(material: PricedMaterial, shardsPerHour = 0) {
  return shardsPerHour / material.chaosDungeonShards;
}

function goldPerHour(material: PricedMaterial, shardsPerHour = 0) {
  return material.lowPrice
    ? matsPerHour(material, shardsPerHour) * material.lowPrice
    : undefined;
}

function valuePerShard(material: PricedMaterial) {
  return material.lowPrice
    ? material.lowPrice / material.chaosDungeonShards
    : undefined;
}
