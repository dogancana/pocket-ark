import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { mainFeatures } from '../../../services/site-constants';
import ErrorBoundary from '../../../ui/error-boundry';
import { HeroSection, PageContainer } from '../../../ui/layout';
import { FC } from '../../../utils';
import { HoningFilterProvider } from './filter/honing-filter-provider';
import { HoningPlannerFilters } from './filter/honing-planner-filters';
import { ItemsContainer } from './items-container';

export const HoningPlannerPage: FC = () => {
  const { header, description } = mainFeatures.honingPlanner;
  return (
    <HoningFilterProvider>
      <HeroSection>
        <Header as="h1">{header}</Header>
        <p>
          {description.map((d) => (
            <Fragment key={d}>
              {d}
              <br />
            </Fragment>
          ))}
          <span className="text-xs font-thin text-gray-500">
            Doesn't include values of silver and honor shards in gold
            calculations (YET).
          </span>
        </p>
      </HeroSection>
      <PageContainer className="w-full">
        <div className="div flex py-4 ">
          <span className="ml-auto">
            <ErrorBoundary message="Honing planner filters">
              <HoningPlannerFilters />
            </ErrorBoundary>
          </span>
        </div>
        <ItemsContainer />
      </PageContainer>
    </HoningFilterProvider>
  );
};
