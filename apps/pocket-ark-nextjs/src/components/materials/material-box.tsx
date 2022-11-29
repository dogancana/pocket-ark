import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { Currency, MaterialIcon } from '../../ui';
import { PricedMaterial } from '../../utils/materials';
import { FC } from '../../utils/react';

export interface MaterialBoxProps {
  material: PricedMaterial;
  className?: string;
  forwardRef?: React.Ref<HTMLDivElement>;
}

export const MaterialBox: FC<MaterialBoxProps> = ({
  material,
  className,
  forwardRef,
}) => {
  if (!material) return <p>No data</p>;

  return (
    <div
      className={`flex px-3 items-start ${className || ''}`}
      ref={forwardRef}
    >
      <MaterialIcon
        className="inline"
        type={material.type}
        overrides={{ width: 55, height: 55 }}
      />
      <div
        className="flex flex-col ml-3 overflow-hidden text-ellipsis"
        style={{ maxWidth: '70%' }}
      >
        <div className="flex items-center">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <strong>{material.name.replace(/\[?.+\]|'|:|\(|\)/g, '')}</strong>
          </div>
          {material.saleAmount && (
            <span className="text-xs ml-1">(x{material.saleAmount})</span>
          )}
        </div>
        <div className="flex">
          <Currency type={CurrencyType.Gold} value={material.lowPrice} />
        </div>
      </div>
    </div>
  );
};
