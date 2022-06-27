import { Fragment } from 'react';
import { Header, Search } from 'semantic-ui-react';
import { mainFeatures } from '../../services/site-constants';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils/react';
import { GroupedMaterials } from './grouped-materials';
import { useFilteredMaterials } from './use-filtered-materials';

export const PriceIndexPage: FC = () => {
  const { header, description } = mainFeatures.priceIndex;
  const { query, materials, options, allVisible, setQuery, onSelected } =
    useFilteredMaterials();

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
          Price index in Pocket Ark is powered by awesome project Lost Ark
          Online Market.
          <br />
          You can just select your region and use community handled prices
        </p>
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
          <GroupedMaterials
            filteredMaterials={materials}
            noGroups={!allVisible}
          />
        </div>
      </PageContainer>
    </>
  );
};
