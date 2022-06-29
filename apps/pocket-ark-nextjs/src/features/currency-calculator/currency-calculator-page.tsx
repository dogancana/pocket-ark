import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { mainFeatures } from '../../services/site-constants';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils/react';
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
      <PageContainer className="w-full mt-8 lg:flex">
        <div className="inline-block w-full lg:w-1/2 md:p-3">
          <Header as="h2" className="text-center">
            Currency Convertor
          </Header>
          <CurrencyConverter />
        </div>
        <div className="inline-flex flex-col text-center w-full lg:w-1/2 mt-8 lg:mt-0 md:p-3 mb-8 lg:mb-0">
          <Header as="h2" className="">
            Add Materials
          </Header>
          <MaterialsCalculator />
        </div>
      </PageContainer>
    </>
  );
};
