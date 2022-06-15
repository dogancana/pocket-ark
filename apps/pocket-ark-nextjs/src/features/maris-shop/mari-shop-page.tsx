import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { mainFeatures } from '../../services/site-constants';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils/react';
import { MariShopTable } from './mari-shop-table';

export const MarisShopPage: FC = () => {
  const { header, description } = mainFeatures.mariShop;
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
      <PageContainer className="mt-8 pb-20">
        <MariShopTable />
      </PageContainer>
    </>
  );
};
