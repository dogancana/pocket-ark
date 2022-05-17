import { PricingSource } from '@pocket-ark/lost-ark-data';
import {
  getPricingSource,
  getSourcebyReferece,
  setPricingSource
} from '@pocket-ark/ssr-utils';
import { GetServerSideProps } from 'next';
import { PricingProvider } from '../src/components';
import { PriceIndexPage } from '../src/features/price-index';
import { FC } from '../src/utils';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => {
  return (
    <PricingProvider source={source || {}}>
      <PriceIndexPage />
    </PricingProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const result = (s?: PricingSource) => ({ props: { source: s || {} } });
  try {
    const source = getPricingSource(req, res);
    const params = new URLSearchParams(req.url?.split('?')[1] || '');
    const reference = params.get('reference');

    const isOwnerOfProvidedReference = Boolean(
      !!source.meta?.key && reference === source.meta?.reference
    );

    console.log({ reference, source: source.meta, isOwnerOfProvidedReference });
    if (!!isOwnerOfProvidedReference || (source?.meta?.key && !reference)) {
      console.log('return the source', source?.meta);
      return result(source);
    }

    console.log('passed');
    const isNewReference = !!reference && reference !== source.meta?.reference;
    const consumingOldReference =
      !!source.meta?.reference && isSourceOld(source);

    console.log({ isNewReference, consumingOldReference });
    if (isNewReference || consumingOldReference) {
      const newSource = await getSourcebyReferece(
        reference || source?.meta?.reference
      );

      console.log({ newSource });
      if (newSource) {
        setPricingSource(newSource, req, res);
        return result(newSource);
      }
    }

    return result(source || {});
  } catch (e) {
    console.error(e);
    return result({});
  }
};

function isSourceOld(source: PricingSource) {
  if (!source.meta?.lastUpdatedAtISO) return true;

  const lastUpdatedAt = new Date(source.meta?.lastUpdatedAtISO);
  const now = new Date();
  const diff = now.getTime() - lastUpdatedAt.getTime();
  const diffMins = Math.ceil(diff / (1000 * 60));
  return diffMins > 15;
}

export default Page;
