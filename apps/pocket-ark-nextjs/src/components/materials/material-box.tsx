import { Material } from '@pocket-ark/lost-ark-data';
import { MaterialIcon } from '../../ui';
import { FC } from '../../utils';
import { MaterialPrice } from './material-price';

export interface MaterialBoxProps {
  material: Material;
  className?: string;
  forwardRef?: React.Ref<HTMLDivElement>;
  fluid?: boolean;
}

export const MaterialBox: FC<MaterialBoxProps> = ({
  material,
  className,
  forwardRef,
  fluid,
}) => (
  <div className={`flex px-3 items-end ${className || ''}`} ref={forwardRef}>
    <MaterialIcon type={material.type} overrides={{ width: 55, height: 55 }} />
    <div className="flex flex-col grow ml-3">
      <div className="flex items-center grow w-full">
        <strong className="mb-1 text-ellipsis whitespace-nowrap">
          {material.name}
        </strong>
        {material.saleAmount && (
          <span className="text-xs ml-1">(x{material.saleAmount})</span>
        )}
      </div>
      <MaterialPrice type={material.type} className="grow" fluid={fluid} />
    </div>
  </div>
);
