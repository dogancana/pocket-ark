import { CurrencyType, MaterialType } from '@pocket-ark/lost-ark-data';
import { MaterialValues } from '../../components';

export const PriceItem: React.FC = ({ children }) => (
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ">
    <div className="border rounded-lg shadow-lg m-2">{children}</div>
  </div>
);

export const ItemFooter: React.FC = ({ children }) => (
  <div className="flex border-t-2 mt-2 pl-4 bg-stone-200 h-6">{children}</div>
);

export const MaterialValuesLine: React.FC<{ type: MaterialType }> = ({
  type,
}) => (
  <MaterialValues
    type={type}
    showCurrencies={[
      CurrencyType.Crystal,
      CurrencyType.RoyalCrystal,
      CurrencyType.RealMoney,
    ]}
    itemClassName="mr-6"
  />
);
