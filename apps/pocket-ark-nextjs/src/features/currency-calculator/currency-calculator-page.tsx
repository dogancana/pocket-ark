import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { mainFeatures } from '../../services/site-constants';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils';
import { CurrencyConverter } from './currency-converter';
import { MaterialsCalculator } from './materials-calculator';

export const CurrencyCalculatorPage: FC = () => {
  const { header, description } = mainFeatures.currencyCalculator;
  return (
    <>
      <HeroSection>
        <Header as="h1">{header}</Header>
        <p>
          {description.map((d) => (
            <Fragment key={d}>
              {d}
              <br />
            </Fragment>
          ))}
        </p>
      </HeroSection>
      <PageContainer className="w-full mt-8 flex">
        <div className="w-full lg:w-1/2 p-3">
          <Header as="h2" className="text-center">
            Currency Convertor
          </Header>
          <CurrencyConverter />
        </div>
        <div className="w-full lg:w-1/2 p-3 flex flex-col">
          <Header as="h2" className="text-center">
            Add Materials
          </Header>
          <MaterialsCalculator />
        </div>
      </PageContainer>
    </>
  );
};
