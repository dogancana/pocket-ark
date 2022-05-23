import { Container } from 'semantic-ui-react';
import { MaterialPrice, usePricingSource } from '../../components';
import ErrorBoundary from '../../ui/error-boundry';
import { MaterialIcon } from '../../ui/icons';
import { FC } from '../../utils';
import { ItemFooter, PriceItem, PriceSection, PriceTitle } from './common';
import { CurrencySourceForm } from './currency-source-form';
import { PriceSourceReferences } from './search-sources';
import { SharePricingModal } from './share-pricing-modal';
import { SourceSync } from './source-sync';

export const PriceIndexPage: FC = () => {
  const {
    pricedMaterialsArray: materials,
    showShareModal,
    setShowShareModal,
  } = usePricingSource();

  return (
    <>
      <SharePricingModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      <ErrorBoundary message="SourceSync wrapper">
        <SourceSync />
      </ErrorBoundary>

      <Container>
        <div className="flex flex-col mt-8 items-center text-center">
          <p>
            This page allows you to set prices of materials for your own. <br />
            The prices provided here will be used by other tools in Pocket Ark.{' '}
            <br />
            The information will be saved on your browser but you can also
            choose to share it with others. <br />
          </p>
          <ErrorBoundary message="Search sources">
            <PriceSourceReferences />
          </ErrorBoundary>
          <ErrorBoundary message="Materials wrapper">
            <PriceSection title="Prices">
              <CurrencySourceForm />
              {materials.map((m) => (
                <PriceItem key={`${m.type}_${m.price}`}>
                  <div className="flex flex-wrap items-center flex-grow pt-2">
                    <MaterialIcon
                      type={m.type}
                      overrides={{ width: 55, height: 55 }}
                    />
                    <div className="flex flex-col ml-2">
                      <PriceTitle name={m.name} amount={m.saleAmount} />
                      <MaterialPrice type={m.type} />
                    </div>
                  </div>
                  <ItemFooter />
                </PriceItem>
              ))}
            </PriceSection>
          </ErrorBoundary>
        </div>
      </Container>
    </>
  );
};
