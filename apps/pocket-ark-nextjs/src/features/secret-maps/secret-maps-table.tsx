import { CurrencyType, SecretMap, secretMaps } from '@pocket-ark/lost-ark-data';
import { usePricingSource } from '../../components';
import { Currency, MaterialsLine } from '../../ui';
import { MapIcon } from '../../ui/icons';
import { FC } from '../../utils';

const tdClassName = 'border border-slate-300 p-4 text-left';

export const SecretMapsTable: FC = () => {
  const { addMaterials } = usePricingSource();
  const mapsWithTotals = secretMaps
    .map((secretMap) => ({
      ...secretMap,
      name: secretMapName(secretMap),
      matsTotal: addMaterials(secretMap.rewards),
    }))
    .sort((a, b) => b.matsTotal - a.matsTotal);

  return (
    <table>
      <thead>
        <tr>
          <th className={tdClassName}>Map</th>
          <th className={tdClassName}>Avg. Rewards</th>
          <th className={tdClassName}>Total x4</th>
        </tr>
      </thead>
      <tbody>
        {mapsWithTotals.map((secretMap) => (
          <tr key={secretMap.name} className="py-4">
            <td className={tdClassName}>
              <div className="flex items-center">
                <MapIcon
                  secretMap={secretMap}
                  overrides={{ width: 25, height: 25 }}
                />
                <span className="ml-2">{secretMap.name}</span>
              </div>
            </td>
            <td className={tdClassName}>
              <MaterialsLine materials={secretMap.rewards} />
            </td>
            <td className={tdClassName}>
              <Currency
                type={CurrencyType.Gold}
                value={secretMap.matsTotal ? secretMap.matsTotal * 4 : '?'}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function secretMapName(secretMap: SecretMap) {
  const { tier, rarity } = secretMap;
  return `T${tier} ${rarity} Secret Map`;
}
