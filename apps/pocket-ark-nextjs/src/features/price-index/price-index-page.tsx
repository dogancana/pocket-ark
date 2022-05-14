import { CurrencyType, materials } from '@pocket-ark/lost-ark-data';
import { MaterialPrice } from '../../components';
import { MaterialValues } from '../../components/material-values';
import { MaterialIcon } from '../../ui/icons';
import { CurrencySourceForm } from './currency-source-form';
import { PriceItem } from './price-item';
import { PriceSection } from './section';

export const PriceIndexPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <p>This page allows you to adjust prices of your server.</p>
      <p>
        Once the information is set, it'll be shared with other features in
        Pocket Ark.
      </p>
      <p>The information will be kept on your browser</p>
      <PriceSection title="Materials">
        {materials.map((m) => (
          <PriceItem key={m.type}>
            <div className="flex flex-wrap items-center p-3">
              <MaterialIcon
                type={m.type}
                overrides={{ width: 55, height: 55 }}
              />
              <div className="flex flex-col">
                <span className="ml-2">{m.name}</span>
                <MaterialPrice type={m.type} className="pl-8" />
              </div>
            </div>
            <div className="flex border-t-2 mt-2 pl-4 bg-stone-200">
              <MaterialValues
                type={m.type}
                showCurrencies={[
                  CurrencyType.Crystal,
                  CurrencyType.RoyalCrystal,
                  CurrencyType.RealMoney,
                ]}
                itemClassName="mr-6"
              />
            </div>
          </PriceItem>
        ))}
      </PriceSection>
      <PriceSection title="Currencies">
        <CurrencySourceForm />
      </PriceSection>
    </div>
  );
};
