import { MaterialType } from '@pocket-ark/lost-ark-data';
import { Icon } from 'semantic-ui-react';
import { MaterialIcon } from '../../../ui/icons';
import { FC } from '../../../utils/react';

interface MaterialInputProps {
  type: MaterialType;
  amount: number;
  className?: string;
  remoteMaterial: (type: MaterialType) => void;
  setMaterialAmount: (type: MaterialType, amount: number) => void;
}

export const MaterialInput: FC<MaterialInputProps> = ({
  type,
  amount,
  className,
  remoteMaterial,
  setMaterialAmount,
}) => {
  return (
    <div
      key={type}
      className={`flex bg-white rounded-md bg-gradient-to-r from-stone-200 to-white shadow-md ${
        className || ''
      }`}
    >
      <MaterialIcon type={type} overrides={{ width: 38, height: 38 }} />
      <input
        className="appearance-none p-2 rounded-r-md bg-transparent shrink-1 w-auto min-w-0"
        defaultValue={amount}
        type="number"
        onChange={(e) => setMaterialAmount(type, parseInt(e.target.value, 10))}
      />
      <button
        className="h-full flex items-center justify-center text-stone-300 cursor-pointer"
        onClick={() => remoteMaterial(type)}
      >
        <Icon name="trash alternate" size="large" />
      </button>
    </div>
  );
};
