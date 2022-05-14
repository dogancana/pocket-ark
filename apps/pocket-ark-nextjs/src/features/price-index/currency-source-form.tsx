import { CurrencyConversionSource } from '@pocket-ark/lost-ark-data';
import { usePricingSource } from '../../components';
import { PriceItem } from './price-item';
import { debounce } from 'lodash';

export const CurrencySourceForm: React.FC = () => {
  const { source, setCurrencyConversionSource } = usePricingSource();

  const handleChange = (p: Partial<CurrencyConversionSource>) => {
    setCurrencyConversionSource({ ...source, ...p });
  };

  const handleChangeDebounced = debounce(handleChange, 500);

  return (
    <>
      <PriceItem>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="goldSalePrice"
        >
          Gold sale price from game's currency exchange page's purchase gold tab
        </label>
        <input
          id="goldSalePrice"
          className="shadow appearance-none px-3 py-1 w-full rounded"
          type="number"
          placeholder="Gold sale price"
          defaultValue={source.goldSalePrice}
          onChange={(e) =>
            handleChangeDebounced({
              goldSalePrice: parseInt(e.target.value, 10),
            })
          }
        />
      </PriceItem>
      <PriceItem>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="crystalSalePrice"
        >
          Crystal sale price from game's currency exchange page's buy crystal
          tab
        </label>
        <input
          id="crystalSalePrice"
          className="shadow appearance-none px-3 py-1 w-full rounded"
          type="number"
          placeholder="Crystal sale price"
          defaultValue={source.crystalSalePrice}
          onChange={(e) =>
            handleChangeDebounced({
              crystalSalePrice: parseInt(e.target.value, 10),
            })
          }
        />
      </PriceItem>
      <PriceItem>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="royalCrystalsPack"
        >
          Value of 12000 Royal crystals in your own currency (e.g. USD)
        </label>
        <input
          id="royalCrystalsPack"
          className="shadow appearance-none px-3 py-1 w-full rounded"
          type="number"
          placeholder="12 000 Royal crystals"
          defaultValue={source.royalCrystalsPack}
          onChange={(e) =>
            handleChangeDebounced({
              royalCrystalsPack: parseInt(e.target.value, 10),
            })
          }
        />
      </PriceItem>
    </>
  );
};
