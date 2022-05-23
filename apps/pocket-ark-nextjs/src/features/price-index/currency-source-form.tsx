import {
  CurrencyConversionSource,
  CurrencyType,
} from '@pocket-ark/lost-ark-data';
import { debounce } from 'lodash';
import { usePricingSource } from '../../components';
import { Currency, CurrencyInput } from '../../ui';
import { ItemFooter, PriceItem } from './common';
import { FC } from '../../utils';

const Wrapper: FC = ({ children }) => (
  <PriceItem>
    <div className="pt-3 px-3">{children}</div>
    <ItemFooter />
  </PriceItem>
);

const Equals: FC = () => <span className="mx-1">=</span>;

export const CurrencySourceForm: FC = () => {
  const { source, setCurrencyConversionSource } = usePricingSource();

  const handleChange = (p: Partial<CurrencyConversionSource>) => {
    setCurrencyConversionSource(p);
  };

  const handleChangeDebounced = debounce(handleChange, 500);

  return (
    <>
      <Wrapper>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="goldSalePrice"
        >
          Gold sale price from game's currency exchange page's purchase gold tab
        </label>
        <span className="flex items-center">
          <Currency type={CurrencyType.RoyalCrystal} value={238} />
          <Equals />
          <CurrencyInput
            iconType={CurrencyType.Gold}
            id="goldSalePrice"
            type="number"
            placeholder="Gold sale price"
            defaultValue={source.goldSalePrice}
            onChange={(e) =>
              handleChangeDebounced({
                goldSalePrice: parseInt(e.target.value, 10),
              })
            }
          />
        </span>
      </Wrapper>
      <Wrapper>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="crystalSalePrice"
        >
          Crystal sale price from game's currency exchange page's buy crystal
          tab
        </label>
        <span className="flex items-center">
          <Currency type={CurrencyType.Crystal} value={95} />
          <Equals />
          <CurrencyInput
            iconType={CurrencyType.Gold}
            id="crystalSalePrice"
            type="number"
            placeholder="Crystal sale price"
            defaultValue={source.crystalSalePrice}
            onChange={(e) =>
              handleChangeDebounced({
                crystalSalePrice: parseInt(e.target.value, 10),
              })
            }
          />
        </span>
      </Wrapper>
      <Wrapper>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="royalCrystalsPack"
        >
          Value of 12000 Royal crystals in your own currency (e.g. USD)
        </label>
        <span className="flex items-center">
          <Currency type={CurrencyType.RoyalCrystal} value={12000} />
          <Equals />
          <CurrencyInput
            iconType={CurrencyType.RealMoney}
            id="royalCrystalsPack"
            type="number"
            placeholder="12 000 Royal crystals"
            defaultValue={source.royalCrystalsPack}
            onChange={(e) =>
              handleChangeDebounced({
                royalCrystalsPack: parseInt(e.target.value, 10),
              })
            }
          />
        </span>
      </Wrapper>
    </>
  );
};
