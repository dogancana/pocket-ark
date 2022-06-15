import { CurrencyType, SecretMap, secretMaps } from '@pocket-ark/lost-ark-data';
import { useReducer } from 'react';
import { Table } from 'semantic-ui-react';
import { MaterialsLine, usePricingSource } from '../../components';
import {
  Currency,
  orderForTable,
  sortableTableReducer,
  SortableTableReducer,
} from '../../ui';
import { MapIcon } from '../../ui/icons';
import { SortableTableHeaders } from '../../ui/sortable-table';
import { FC } from '../../utils/react';
import { rarityBackground } from '../../ui/rarity';

interface TableSecretMap extends SecretMap {
  name: string;
  matsTotal: number;
}

const headers = [
  { label: 'Map', column: 'name', notSortable: true },
  { label: 'Avg. Rewards', column: 'matsTotal' },
  { label: 'Total x4', column: 'matsTotal' },
];

export const SecretMapsTable: FC = () => {
  const { addMaterials, pricedMaterialsObject } = usePricingSource();

  const [{ column, direction }, dispatch] = useReducer<
    SortableTableReducer<keyof TableSecretMap>
  >(sortableTableReducer, {
    column: 'matsTotal',
    direction: 'descending',
  });

  const mapsWithTotals = secretMaps.map((secretMap) => ({
    ...secretMap,
    name: secretMapName(secretMap),
    matsTotal: addMaterials(secretMap.rewards),
  }));

  const maps = orderForTable(mapsWithTotals, column, direction);

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
        {maps.map((secretMap) => (
          <Table.Row key={secretMap.name} className="py-4">
            <Table.Cell>
              <div className="flex items-center">
                <div
                  className="flex rounded-md p-0.5"
                  style={rarityBackground(secretMap.rarity)}
                >
                  <MapIcon
                    secretMap={secretMap}
                    overrides={{ width: 25, height: 25, layout: 'fixed' }}
                  />
                </div>
                <span className="ml-2">{secretMap.name}</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <MaterialsLine
                materials={secretMap.rewards.map((m) => ({
                  ...pricedMaterialsObject[m.type],
                  amount: m.amount,
                }))}
              />
            </Table.Cell>
            <Table.Cell>
              <Currency
                type={CurrencyType.Gold}
                value={
                  secretMap.matsTotal ? secretMap.matsTotal * 4 : undefined
                }
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

function secretMapName(secretMap: SecretMap) {
  const { tier, rarity } = secretMap;
  return `T${tier} ${rarity} Secret Map`;
}
