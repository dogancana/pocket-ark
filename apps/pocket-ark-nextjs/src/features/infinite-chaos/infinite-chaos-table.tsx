import { CurrencyItemType, CurrencyType } from '@pocket-ark/lost-ark-data';
import { useMemo, useReducer } from 'react';
import { Table } from 'semantic-ui-react';
import { useMaterials } from '../../components';
import {
  Currency,
  MaterialIcon,
  orderForTable,
  SortableTableHeaders,
  SortableTableReducer,
  sortableTableReducer,
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

const headers: { label: string; column: keyof TableMaterial }[] = [
  { label: 'Material', column: 'name' },
  { label: 'Price', column: 'avgPrice' },
  { label: 'Shards', column: 'chaosDungeonShards' },
  { label: 'Gold/Shard', column: 'valuePerShard' },
  { label: 'Gold x99', column: 'avgPrice' },
  { label: 'Mats/hr', column: 'matsPerHour' },
  { label: 'Gold/hr', column: 'goldPerHour' },
];

export const InfiniteChaosTable: FC<InfiniteChaosTableProps> = ({
  shardsPerHour: shardsPerHourProp,
}) => {
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

  return (
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
        {sortedMaterials.map((material) => (
          <Table.Row key={material.type} className="py-4">
            <Table.Cell>
              <div className="w-full flex flex-row items-center">
                <MaterialIcon type={material.type} />
                <span className="ml-2">{material.name}</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <Currency type={CurrencyType.Gold} value={material.lowPrice} />
            </Table.Cell>
            <Table.Cell>
              <Currency
                type={CurrencyItemType.ShardOfPurification}
                value={material.chaosDungeonShards}
              />
            </Table.Cell>
            <Table.Cell>{readableNumber(material.valuePerShard, 2)}</Table.Cell>
            <Table.Cell>{readableNumber(material.lowPrice * 99)}</Table.Cell>
            <Table.Cell>{readableNumber(material.matsPerHour, 1)}</Table.Cell>
            <Table.Cell>{readableNumber(material.goldPerHour)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
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
