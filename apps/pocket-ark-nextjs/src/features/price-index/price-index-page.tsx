import { PricedMaterial } from '@pocket-ark/lost-ark-data';
import { filter } from 'fuzzy';
import { Fragment, useCallback, useMemo, useState } from 'react';
import {
  Header,
  Search,
  SearchProps,
  SearchResultData
} from 'semantic-ui-react';
import { MaterialBox, usePricingSource } from '../../components';
import { mainFeatures } from '../../services/site-constants';
import ErrorBoundary from '../../ui/error-boundry';
import { HeroSection, PageContainer } from '../../ui/layout';
import { RarityLine } from '../../ui/rarity';
import { FC } from '../../utils';
import { ItemFooter, PriceItem } from './common';
import { CurrencySourceForm } from './currency-source-form';
import { PriceSourceReferences } from './search-sources';
import { SharePricingModal } from './share-pricing-modal';
import { SourceSync } from './source-sync';

interface State {
  query?: string;
}

const ALL_MATERIALS = { title: 'All materials' };
const MATERIALS_WITHOUT_PRICE = { title: 'Materials without price' };
const STATIC_OPTIONS = [ALL_MATERIALS, { title: 'Materials without price' }];

export const PriceIndexPage: FC = () => {
  const { header, description } = mainFeatures.priceIndex;
  const {
    pricedMaterialsArray: materials,
    showShareModal,
    setShowShareModal,
  } = usePricingSource();

  const [state, setState] = useState<State>({ query: ALL_MATERIALS.title });
  const setQuery = useCallback(
    (_, data: SearchProps) => setState({ query: data.value }),
    []
  );
  const onSelected = useCallback((_, data: SearchResultData) => {
    setState({ query: data.result.title });
  }, []);

  const filteredMaterials = useMemo(
    () => filterByQuery(state.query, materials),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.query]
  );

  const options = [
    ...STATIC_OPTIONS,
    ...filteredMaterials.map((m) => ({ title: m.name })),
  ];

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
          <div className="text-left col-span-full px-2 flex items-center">
            <h3 className="text-2xl">PRICES</h3>
            <Search
              value={state.query}
              className="ml-auto"
              minCharacters={0}
              results={options.slice(0, 7)}
              onResultSelect={onSelected}
              onSearchChange={setQuery}
            />
          </div>
          <CurrencySourceForm />
          {filteredMaterials.map((m) => (
            <PriceItem key={m.type}>
              <MaterialBox material={m} className="grow pt-2 w-full" fluid />
              <RarityLine rarity={m.rarity} className="h-1 mt-2 opacity-40" />
              <ItemFooter />
            </PriceItem>
          ))}
        </div>
      </PageContainer>
    </>
  );
};

function filterByQuery(query: string, materials: PricedMaterial[]) {
  switch (query) {
    case ALL_MATERIALS.title:
      return materials;
    case MATERIALS_WITHOUT_PRICE.title:
      return materials.filter((m) => !m.price);
    default:
      return filter(query, materials, {
        extract: (f) => f.name,
      })
        .map((r) => r.original)
        .filter((v) => !!v);
  }
}
