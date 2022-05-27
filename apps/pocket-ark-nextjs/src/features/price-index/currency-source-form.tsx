import {
  CurrencyConversionSource,
  CurrencyType,
} from '@pocket-ark/lost-ark-data';
import { debounce } from 'lodash';
import { usePricingSource } from '../../components';
import { Currency, CurrencyInput, CurrencyInputProps } from '../../ui';
import { FC } from '../../utils';
import { ItemFooter, PriceItem } from './common';

const Wrapper: FC = ({ children }) => (
  <PriceItem>
    <div className="pt-3 px-3 grow mb-auto flex flex-col justify-end">
      {children}
    </div>
    <ItemFooter />
  </PriceItem>
);

const Label: FC = ({ children }) => (
  <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
    {children}
  </label>
);

const Equals: FC = () => <span className="mx-1">=</span>;

const inputProps: Partial<CurrencyInputProps> = {
  fluid: true,
  className: 'grow',
  type: 'number',
};

export const CurrencySourceForm: FC = () => {
  const { source, setCurrencyConversionSource } = usePricingSource();

  const handleChange = (p: Partial<CurrencyConversionSource>) => {
    setCurrencyConversionSource(p);
  };

  const handleChangeDebounced = debounce(handleChange, 500);

  return (
    <>
      <Wrapper>
        <Label>
          Gold sale price from game's currency exchange page's purchase gold tab
        </Label>
        <span className="flex items-center grow">
          <Currency
            type={CurrencyType.RoyalCrystal}
            value={238}
            className="shrink-0 "
          />
          <Equals />
          <CurrencyInput
            iconType={CurrencyType.Gold}
            id="goldSalePrice"
            type="number"
            placeholder="Gold sale price"
            defaultValue={source.goldSalePrice}
            fluid
            className="grow"
            onChange={(e) =>
              handleChangeDebounced({
                goldSalePrice: parseInt(e.target.value, 10),
              })
            }
          />
        </span>
      </Wrapper>
      <Wrapper>
        <Label>
          Crystal sale price from game's currency exchange page's buy crystal
          tab
        </Label>
        <span className="flex items-center grow">
          <Currency
            type={CurrencyType.Crystal}
            value={95}
            className="shrink-0"
          />
          <Equals />
          <CurrencyInput
            iconType={CurrencyType.Gold}
            id="crystalSalePrice"
            type="number"
            placeholder="Crystal sale price"
            defaultValue={source.crystalSalePrice}
            fluid
            className="grow"
            onChange={(e) =>
              handleChangeDebounced({
                crystalSalePrice: parseInt(e.target.value, 10),
              })
            }
          />
        </span>
      </Wrapper>
      <Wrapper>
        <Label>
          Value of 12000 Royal crystals in your own currency (e.g. USD)
        </Label>
        <span className="flex items-center grow">
          <Currency
            type={CurrencyType.RoyalCrystal}
            value={12000}
            className="shrink-0"
          />
          <Equals />
          <CurrencyInput
            iconType={CurrencyType.RealMoney}
            id="royalCrystalsPack"
            type="number"
            placeholder="12 000 Royal crystals"
            defaultValue={source.royalCrystalsPack}
            fluid
            className="grow"
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
