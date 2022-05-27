import { Header } from 'semantic-ui-react';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils';
import { CurrencyConverter } from './currency-converter';

export const CurrencyCalculatorPage: FC = () => {
  return (
    <>
      <HeroSection>
        <Header>Currency Calculator</Header>
        <p>You can convert currencies on this page</p>
      </HeroSection>
      <PageContainer>
        <CurrencyConverter />
      </PageContainer>
    </>
  );
};
