import { Material } from '@pocket-ark/lost-ark-data';
import { MaterialIcon } from '../../ui';
import { FC } from '../../utils';
import { MaterialPrice } from './material-price';

export interface MaterialBoxProps {
  material: Material;
  forwardRef: React.Ref<HTMLDivElement>;
}

export const MaterialBox: FC<MaterialBoxProps> = ({ material, forwardRef }) => (
  <div className="flex" ref={forwardRef}>
    <MaterialIcon type={material.type} overrides={{ width: 40, height: 40 }} />
    <div className="flex flex-col ml-3">
      <div className="flex items-center">
        <strong>{material.name}</strong>
        {material.saleAmount && (
          <span className="text-xs ml-1">(x{material.saleAmount})</span>
        )}
      </div>
      <MaterialPrice type={material.type} />
    </div>
  </div>
);
