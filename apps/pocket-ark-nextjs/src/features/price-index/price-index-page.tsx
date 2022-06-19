import { Fragment } from 'react';
import { Header, Search } from 'semantic-ui-react';
import { usePricingSource } from '../../components';
import { mainFeatures } from '../../services/site-constants';
import ErrorBoundary from '../../ui/error-boundry';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils/react';
import { CurrencySourceForm } from './currency-source-form';
import { GroupedMaterials } from './grouped-materials';
import { PriceSourceReferences } from './search-sources';
import { SharePricingModal } from './share-pricing-modal';
import { SourceSync } from './source-sync';
import { useFilteredMaterials } from './use-filtered-materials';

export const PriceIndexPage: FC = () => {
  const { header, description } = mainFeatures.priceIndex;
  const { query, materials, options, allVisible, setQuery, onSelected } =
    useFilteredMaterials();
  const { showShareModal, setShowShareModal } = usePricingSource();

  return (
    <>
      <SharePricingModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      <ErrorBoundary message="SourceSync wrapper">
        <SourceSync />
      </ErrorBoundary>

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
        <ErrorBoundary message="Search sources">
          <PriceSourceReferences />
        </ErrorBoundary>
      </HeroSection>

      <PageContainer className="mt-0 pt-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          <div className="text-left w-full col-span-full px-2 flex items-center">
            <h3 className="text-2xl">PRICES</h3>
            <Search
              value={query}
              className="ml-auto"
              placeholder="Materials or categories"
              minCharacters={0}
              results={options.slice(0, 7)}
              onResultSelect={onSelected}
              onSearchChange={setQuery}
            />
          </div>
          <CurrencySourceForm />
          <GroupedMaterials
            filteredMaterials={materials}
            noGroups={!allVisible}
          />
        </div>
      </PageContainer>
    </>
  );
};
