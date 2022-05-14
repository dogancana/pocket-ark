import { materials } from '@pocket-ark/lost-ark-data';
import { MaterialPrice } from '../../components';
import { MaterialIcon } from '../../ui/icons';
import { CurrencySourceForm } from './currency-source-form';
import { ItemFooter, MaterialValuesLine, PriceItem } from './price-item';
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
                <MaterialPrice type={m.type} />
              </div>
            </div>
            <ItemFooter>
              <MaterialValuesLine type={m.type} />
            </ItemFooter>
          </PriceItem>
        ))}
      </PriceSection>
      <PriceSection title="Currencies">
        <CurrencySourceForm />
      </PriceSection>
    </div>
  );
};
