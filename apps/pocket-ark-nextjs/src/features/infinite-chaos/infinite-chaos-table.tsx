import {
  CurrencyItemType,
  CurrencyType,
  PricedMaterial,
} from '@pocket-ark/lost-ark-data';
import { orderBy } from 'lodash';
import { useReducer, useMemo } from 'react';
import { Table } from 'semantic-ui-react';
import { usePricingSource } from '../../components';
import { Currency } from '../../ui';
import { MaterialIcon } from '../../ui/icons';
import { FC } from '../../utils';

export interface InfiniteChaosTableProps {
  shardsPerHour?: number;
}

interface TableMaterial extends PricedMaterial {
  valuePerShard: number;
  matsPerHour: number;
  goldPerHour: number;
}

interface State {
  direction: 'ascending' | 'descending';
  column: keyof TableMaterial;
}

const headers: { label: string; column: keyof TableMaterial }[] = [
  { label: 'Material', column: 'name' },
  { label: 'Price', column: 'price' },
  { label: 'Shards', column: 'chaosDungeonShards' },
  { label: 'Gold/Shard', column: 'valuePerShard' },
  { label: 'Gold x99', column: 'price' },
  { label: 'Mats/hr', column: 'matsPerHour' },
  { label: 'Gold/hr', column: 'goldPerHour' },
];

export const InfiniteChaosTable: FC<InfiniteChaosTableProps> = ({
  shardsPerHour: shardsPerHourProp,
}) => {
  const [{ column, direction }, dispatch] = useReducer(reducer, {
    column: 'goldPerHour',
    direction: 'descending',
  });

  const { pricedMaterialsArray: materials } = usePricingSource();
  const sortedMaterials = useMemo(
    () =>
      orderBy(
        materials
          .filter((m) => !!m.chaosDungeonShards)
          .map(
            (m): TableMaterial => ({
              ...m,
              valuePerShard: valuePerShard(m),
              matsPerHour: matsPerHour(m, shardsPerHourProp),
              goldPerHour: goldPerHour(m, shardsPerHourProp),
            })
          ),
        [column],
        [direction === 'ascending' ? 'asc' : 'desc']
      ),
    [materials, shardsPerHourProp, column, direction]
  );

  return (
    <Table singleLine sortable striped>
      <Table.Header>
        <Table.Row>
          {headers.map((h) => (
            <Table.HeaderCell
              key={h.label}
              sorted={column === h.column ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: h.column })
              }
            >
              {h.label}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedMaterials.map((material) => (
          <Table.Row key={material.name} className="py-4">
            <Table.Cell>
              <div className="w-full flex flex-row items-center">
                <MaterialIcon type={material.type} />
                <span className="ml-2">{material.name}</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <Currency
                type={CurrencyType.Gold}
                value={material.price || '?'}
              />
            </Table.Cell>
            <Table.Cell>
              <Currency
                type={CurrencyItemType.ShardOfPurification}
                value={material.chaosDungeonShards}
              />
            </Table.Cell>
            <Table.Cell>{material.valuePerShard?.toFixed(2) || '?'}</Table.Cell>
            <Table.Cell>
              {material.price ? material.price * 99 : '?'}
            </Table.Cell>
            <Table.Cell>{material.matsPerHour.toFixed(1)}</Table.Cell>
            <Table.Cell>{material.goldPerHour?.toFixed(2) || '?'}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

function reducer(
  state: State,
  action: { type: 'CHANGE_SORT'; column: keyof TableMaterial }
): State {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: action.column,
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
}

function matsPerHour(material: PricedMaterial, shardsPerHour = 0) {
  return shardsPerHour / material.chaosDungeonShards;
}

function goldPerHour(material: PricedMaterial, shardsPerHour = 0) {
  return material.price
    ? matsPerHour(material, shardsPerHour) * material.price
    : undefined;
}

function valuePerShard(material: PricedMaterial) {
  return material.price
    ? material.price / material.chaosDungeonShards
    : undefined;
}
