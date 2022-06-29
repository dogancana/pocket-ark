import { CurrencyType, SecretMap, secretMaps } from '@pocket-ark/lost-ark-data';
import { useReducer } from 'react';
import { MaterialsLine } from '../../components';
import { useMaterials } from '../../components/materials-provider';
import {
  Currency,
  orderForTable,
  sortableTableReducer,
  SortableTableReducer,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  useMediaSM,
} from '../../ui';
import { MapIcon } from '../../ui/icons';
import { rarityBackground } from '../../ui/rarity';
import { SortableTableHeaders } from '../../ui/table/sortable-table';
import { rarityString } from '../../utils/rarity';
import { FC } from '../../utils/react';

interface TableSecretMap extends SecretMap {
  name: string;
  matsTotal: number;
}

const headers = [
  { label: 'Map', column: 'name', notSortable: true },
  { label: 'Avg. Rewards', column: 'matsTotal', notSortable: true },
  { label: 'Total x4', column: 'matsTotal' },
];

export const SecretMapsTable: FC = () => {
  const { materials, addMaterials } = useMaterials();
  const sm = useMediaSM();

  const [{ column, direction }, dispatch] = useReducer<
    SortableTableReducer<keyof TableSecretMap>
  >(sortableTableReducer, {
    column: 'matsTotal',
    direction: 'descending',
  });

  const mapsWithTotals = secretMaps.map((secretMap) => ({
    ...secretMap,
    name: secretMapName(secretMap),
    shortName: secretMapShortName(secretMap),
    matsTotal: addMaterials(secretMap.rewards),
  }));

  const maps = orderForTable(mapsWithTotals, column, direction);

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
          {maps.map((secretMap) => (
            <TableRow key={secretMap.name} className="py-4">
              <TableCell>
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
                  <span className="ml-2">
                    {sm === false ? secretMap.shortName : secretMap.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MaterialsLine
                    materials={secretMap.rewards.map((m) => ({
                      ...materials[m.type],
                      count: sm === false ? undefined : m.amount,
                    }))}
                  />
                </div>
              </TableCell>
              <TableCell>
                <Currency
                  type={CurrencyType.Gold}
                  value={
                    secretMap.matsTotal ? secretMap.matsTotal * 4 : undefined
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

function secretMapName(secretMap: SecretMap) {
  const { tier, rarity } = secretMap;
  return `T${tier} ${rarityString(rarity)} Secret Map`;
}

function secretMapShortName(secretMap: SecretMap) {
  return `T${secretMap.tier}`;
}
