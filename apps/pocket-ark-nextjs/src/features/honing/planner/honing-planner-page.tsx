import { Header } from 'semantic-ui-react';
import { HeroSection, PageContainer } from '../../../ui/layout';
import { FC } from '../../../utils';
import { HoningFilterProvider } from './filter/honing-filter-provider';
import { HoningPlannerFilters } from './filter/honing-planner-filters';
import { ItemsContainer } from './items-container';
import ErrorBoundary from '../../../ui/error-boundry';

export const HoningPlannerPage: FC = () => {
  return (
    <HoningFilterProvider>
      <HeroSection>
        <Header>Honing Planner</Header>
        <p>
          Calculate average honing cost according to your resources. <br />
          You can see cost ranges by success rates and optimal protection
          materials. <br />
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
