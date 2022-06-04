import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { mainFeatures } from '../../services/site-constants';
import { HeroSection, PageContainer } from '../../ui/layout';
import { FC } from '../../utils';
import { SecretMapsTable } from './secret-maps-table';

export const SecretMapsPage: FC = () => {
  const { header, description } = mainFeatures.secretMaps;
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
      <PageContainer className="mt-8">
        <SecretMapsTable />
      </PageContainer>
    </>
  );
};
