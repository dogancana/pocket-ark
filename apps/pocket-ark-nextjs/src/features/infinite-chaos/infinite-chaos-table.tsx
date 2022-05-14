import {
  CurrencyItemType,
  CurrencyType, PricedMaterial
} from '@pocket-ark/lost-ark-data';
import { usePricingSource } from '../../components';
import { Currency } from '../../ui';
import { MaterialIcon } from '../../ui/icons';

const tdClassName = 'border border-slate-300 p-4 text-left';

export interface InfiniteChaosTableProps {
  shardsPerHour: number;
}

export const InfiniteChaosTable: React.FC<InfiniteChaosTableProps> = ({
  shardsPerHour,
}) => {
  const { pricedMaterialsArray: materials } = usePricingSource();
  const valuePerShard = (material: PricedMaterial) => {
    return material.price
      ? material.price / material.chaosDungeonShards
      : undefined;
  };

  const sortedMaterials = materials
    .map((m) => ({ ...m, valuePerShard: valuePerShard(m) }))
    .sort((a, b) => {
      if (!a.valuePerShard) return 1;
      if (!b.valuePerShard) return -1;
      return b.valuePerShard - a.valuePerShard;
    });

  const matsPerHour = (material: PricedMaterial) =>
    shardsPerHour / material.chaosDungeonShards;

  const goldPerHour = (material: PricedMaterial) =>
    material.price ? matsPerHour(material) * material.price : undefined;

  return (
    <table className="table-auto shadow-sm">
      <thead>
        <tr>
          <th className={tdClassName}>Material</th>
          <th className={tdClassName}>Price</th>
          <th className={tdClassName}>Shards</th>
          <th className={tdClassName}>Gold/Shard</th>
          <th className={tdClassName}>Gold x99</th>
          <th className={tdClassName}>Mats/hr</th>
          <th className={tdClassName}>Gold/hr</th>
        </tr>
      </thead>
      <tbody>
        {sortedMaterials.map((material) => (
          <tr key={material.name} className="py-4">
            <td className={tdClassName}>
              <div className="w-full flex flex-row items-center">
                <MaterialIcon type={material.type} />
                <span className="ml-2">{material.name}</span>
              </div>
            </td>
            <td className={tdClassName}>
              <Currency
                type={CurrencyType.Gold}
                value={material.price ?? '?'}
              />
            </td>
            <td className={`${tdClassName} text-left`}>
              <Currency
                type={CurrencyItemType.ShardOfPurification}
                value={material.chaosDungeonShards}
              />
            </td>
            <td className={`${tdClassName} text-center`}>
              {material.valuePerShard?.toFixed(2) ?? '?'}
            </td>
            <td className={`${tdClassName} text-center`}>
              {material.price ? material.price * 99 : '?'}
            </td>
            <td className={`${tdClassName} text-right`}>
              {matsPerHour(material).toFixed(1)}
            </td>
            <td className={`${tdClassName} text-right`}>
              {goldPerHour(material)?.toFixed(2) ?? '?'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
