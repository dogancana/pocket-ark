import { PricedMaterial } from '@pocket-ark/lost-ark-data';
import { MaterialPopup } from '.';
import { FC } from '../../utils';
import { MaterialCount } from './material-count';

export interface MaterialCountProps {
  materials: (PricedMaterial & { amount: number })[];
}

export const MaterialsLine: FC<MaterialCountProps> = ({ materials }) => (
  <div className="flex align-middle">
    {materials.map((material) => (
      <MaterialPopup
        material={material}
        key={material.type}
        mouseEnterDelay={500}
      >
        <div className="">
          <MaterialCount
            type={material.type}
            value={material.amount}
            className="mr-3"
          />
        </div>
      </MaterialPopup>
    ))}
  </div>
);
