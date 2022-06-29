import { generateSampleNumbers } from '@pocket-ark/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../../ui';
import { readableNumber } from '../../utils/numbers';
import { FC } from '../../utils/react';
import { CellPopup } from './cell-popup';
import { useEngravingFilters } from './filters/filters-provider';
import { calculateResults } from './utils';

export const CalculationTable: FC = () => {
  const { state } = useEngravingFilters();
  const critRates = generateSampleNumbers(0, 100, state.critSamples);
  const baseDamage = generateSampleNumbers(
    state.minDamage,
    state.maxDamage,
    state.samples
  );

  const results = calculateResults(
    critRates,
    baseDamage,
    state.appliedEngravings
  );

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell></TableHeaderCell>
        {critRates.map((r) => (
          <TableHeaderCell key={r}>{readableNumber(r)}%</TableHeaderCell>
        ))}
      </TableHeader>
      <TableBody>
        {baseDamage.map((baseDamage, damageIndex) => (
          <TableRow key={baseDamage}>
            <TableCell>
              <strong>{readableNumber(baseDamage)}</strong>
            </TableCell>
            {critRates.map((critRate, critIndex) => (
              <CellPopup
                key={`${critRate}-${baseDamage}`}
                result={results[damageIndex][critIndex]}
              >
                <TableCell>
                  <div className="text-center">
                    {readableNumber(
                      results[damageIndex][critIndex].withEngravings.damage
                    )}
                  </div>
                </TableCell>
              </CellPopup>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
