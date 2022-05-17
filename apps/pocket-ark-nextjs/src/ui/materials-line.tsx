import { MaterialType } from '@pocket-ark/lost-ark-data';
import { FC } from '../utils';
import { MaterialCount } from './material-count';

export interface MaterialCountProps {
  materials: { type: MaterialType; amount: number }[];
}

export const MaterialsLine: FC<MaterialCountProps> = ({ materials }) => (
  <div className="flex align-middle">
    {materials.map((r) => (
      <MaterialCount
        key={r.type}
        type={r.type}
        value={r.amount}
        className="mr-3"
      />
    ))}
  </div>
);
