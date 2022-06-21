import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { mainFeatures } from '../../services';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils/react';
import { FiltersProvider } from './filters/filters-provider';
import { Results } from './results';

export const EngravingsCalculatorPage: FC = () => {
  const { header, description } = mainFeatures.engravingComparison;
  return (
    <>
      <HeroSection>
        <Header as="h1">{header}</Header>
        <p className="w-full">
          {description.map((d) => (
            <Fragment key={d}>
              {d}
              <br />
            </Fragment>
          ))}
          <div className="w-2/3 mx-auto text-center text-gray-500 text-sm">
            In real combat, there are many more parameters that come into the
            picture while calculating your actual DPS and damage-up time. This
            tool is built just to give you an idea about the best possible use
            cases.
          </div>
        </p>
      </HeroSection>
      <PageContainer className="mt-8">
        <FiltersProvider>
          <Results />
        </FiltersProvider>
      </PageContainer>
    </>
  );
};
