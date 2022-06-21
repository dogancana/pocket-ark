import { generateSampleNumbers } from '@pocket-ark/utils';
import { Table } from 'semantic-ui-react';
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
    <Table collapsing compact striped>
      <Table.Header>
        <Table.HeaderCell></Table.HeaderCell>
        {critRates.map((r) => (
          <Table.HeaderCell key={r}>{readableNumber(r)}%</Table.HeaderCell>
        ))}
      </Table.Header>
      <Table.Body>
        {baseDamage.map((baseDamage, damageIndex) => (
          <Table.Row key={baseDamage}>
            <Table.Cell>
              <strong>{readableNumber(baseDamage)}</strong>
            </Table.Cell>
            {critRates.map((critRate, critIndex) => (
              <CellPopup
                key={`${critRate}-${baseDamage}`}
                result={results[damageIndex][critIndex]}
              >
                <Table.Cell>
                  <div className="text-center">
                    {readableNumber(
                      results[damageIndex][critIndex].withEngravings.damage
                    )}
                  </div>
                </Table.Cell>
              </CellPopup>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
