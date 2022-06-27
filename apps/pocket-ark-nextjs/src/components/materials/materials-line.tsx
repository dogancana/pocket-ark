import { MaterialPopup } from '.';
import { PricedMaterial } from '../../utils/materials';
import { FC } from '../../utils/react';
import { MaterialCount } from './material-count';

export interface MaterialCountProps {
  materials: (PricedMaterial & { count: number })[];
}

export const MaterialsLine: FC<MaterialCountProps> = ({ materials }) => (
  <div className="flex align-middle">
    {materials.map((material, index) => (
      <MaterialPopup
        material={material}
        key={material.type}
        mouseEnterDelay={500}
      >
        <div className="">
          <MaterialCount
            type={material.type}
            value={material.count}
            className={index !== materials.length - 1 ? 'mr-3' : ''}
          />
        </div>
      </MaterialPopup>
    ))}
  </div>
);
