import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { sortBy } from 'lodash';
import { Table } from 'semantic-ui-react';
import { usePricingSource } from '../../../components/material-pricing-provider';
import { Currency } from '../../../ui';
import { MaterialIcon } from '../../../ui/icons/material-icon';
import { FC } from '../../../utils/react';
import { readableNumber } from '../../../utils/numbers';
import { protection } from '../utils';
import { MaterialPopup } from '../../../components';
import { mapScoreColor } from '../../../utils/score';

export interface ProtectionResultsProps {
  protectionMaterials: ReturnType<typeof protection>;
}

export const ProtectionResults: FC<ProtectionResultsProps> = ({
  protectionMaterials,
}) => {
  const { pricedMaterialsObject } = usePricingSource();
  const materials =
    protectionMaterials?.map((m) => {
      const material = pricedMaterialsObject[m.type];
      const idealPrice = pricedMaterialsObject[m.type].price * m.score;
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
        <Table singleLine striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Material</Table.HeaderCell>
              <Table.HeaderCell>
                <div className="">Price</div>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <div className="">Score</div>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <div className="">Ideal Price</div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedMaterials.map((m) => (
              <Table.Row key={m.type}>
                <MaterialPopup material={m}>
                  <Table.Cell className="flex items-center">
                    <MaterialIcon
                      type={m.type}
                      overrides={{ width: 25, height: 25 }}
                    />
                    <span className="ml-3">{m.name}</span>
                  </Table.Cell>
                </MaterialPopup>
                <Table.Cell>
                  <Currency type={CurrencyType.Gold} value={m.price} />
                </Table.Cell>
                <Table.Cell>
                  <div className={m.textColorClass}>{m.score}</div>
                </Table.Cell>
                <Table.Cell>
                  <Currency
                    className="flex"
                    type={CurrencyType.Gold}
                    value={m.idealPrice}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

function showNumber(value: number, fragments = 0) {
  if (isNaN(value)) return '?';
  return readableNumber(value, fragments);
}
