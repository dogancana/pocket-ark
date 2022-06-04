import { Header } from 'semantic-ui-react';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils';
import { CurrencyConverter } from './currency-converter';
import { MaterialsCalculator } from './materials-calculator';

export const CurrencyCalculatorPage: FC = () => {
  return (
    <>
      <HeroSection>
        <Header>Currency Tools</Header>
        <p>
          Convert Lost Ark currencies such as Royal Crystals, Gold, Crystals and
          Pheons.
          <br />
          Add materials together to see gold or real money value
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
