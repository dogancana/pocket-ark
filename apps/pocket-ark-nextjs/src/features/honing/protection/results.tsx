import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { sortBy } from 'lodash';
import { MaterialPopup } from '../../../components';
import { useMaterials } from '../../../components/materials-provider';
import {
  Currency,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '../../../ui';
import { useMediaSM } from '../../../ui/breakpoints';
import { MaterialIcon } from '../../../ui/icons/material-icon';
import { readableNumber } from '../../../utils/numbers';
import { FC } from '../../../utils/react';
import { mapScoreColor } from '../../../utils/score';
import { protection } from '../utils';

export interface ProtectionResultsProps {
  protectionMaterials: ReturnType<typeof protection>;
}

export const ProtectionResults: FC<ProtectionResultsProps> = ({
  protectionMaterials,
}) => {
  const sm = useMediaSM();
  const { materials: pricedMaterialsObject } = useMaterials();
  const materials =
    protectionMaterials?.map((m) => {
      const material = pricedMaterialsObject[m.type];
      const idealPrice = pricedMaterialsObject[m.type].lowPrice * m.score;
      return {
        ...material,
        idealPrice,
        score: showNumber(m.score, 2),
        textColorClass: mapScoreColor(m.score),
      };
    }) || [];

  const sortedMaterials = sortBy(materials, (m) => -m.score);

  return (
    <>
      {materials.length === 0 && (
        <p className="text-gray-500">
          Couldn't find any additional honing material information. <br />
          Try to change level and rarity type to calcualte properly.
        </p>
      )}
      {materials.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Material</TableHeaderCell>
                <TableHeaderCell>
                  Price
                </TableHeaderCell>
                <TableHeaderCell>
                  Score
                </TableHeaderCell>
                <TableHeaderCell>
                  Ideal Price
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMaterials.map((m) => (
                <TableRow key={m.type}>
                  <MaterialPopup material={m}>
                    <TableCell
                      className={`flex items-center ${
                        sm === false ? 'justify-center' : ''
                      }`}
                    >
                      <MaterialIcon
                        type={m.type}
                        overrides={{ width: 25, height: 25 }}
                      />
                      {sm === true && <span className="ml-3">{m.name}</span>}
                    </TableCell>
                  </MaterialPopup>
                  <TableCell>
                    <Currency type={CurrencyType.Gold} value={m.lowPrice} />
                  </TableCell>
                  <TableCell>
                    <div className={m.textColorClass}>{m.score}</div>
                  </TableCell>
                  <TableCell>
                    <Currency
                      className="flex"
                      type={CurrencyType.Gold}
                      value={m.idealPrice}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

function showNumber(value: number, fragments = 0) {
  if (isNaN(value)) return '?';
  return readableNumber(value, fragments);
}
