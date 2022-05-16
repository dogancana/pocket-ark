import { PricingSource } from '@pocket-ark/lost-ark-data';
import { GetServerSideProps } from 'next';
import { PricingProvider } from '../src/components';
import { PriceIndexPage } from '../src/features/price-index';
import { getPricingSource, getSourcebyReferece } from '../src/srr-utils';
import { FC, isSourceOld } from '../src/utils';

interface Props {
  source: PricingSource;
}

const Page: FC<Props> = ({ source }) => {
  return (
    <PricingProvider source={source ?? {}}>
      <PriceIndexPage />
    </PricingProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const result = (s?: PricingSource) => ({ props: { source: s ?? {} } });
  try {
    const source = getPricingSource(req, res);
    const params = new URLSearchParams(req.url?.split('?')[1] ?? '');
    const reference = params.get('reference');

    const isOwner = !!source.meta?.key && reference === source.meta?.reference;
    console.log({ isOwner, reference, source, url: req.url, params });
    if (isOwner) return result(source);

    const isNewReference = !!reference && reference !== source.meta?.reference;
    const consumingOldReference =
      !!source.meta?.reference && isSourceOld(source);

    console.log({ isNewReference, consumingOldReference });
    if (isNewReference || consumingOldReference) {
      const newSource = await getSourcebyReferece(
        reference ?? source?.meta?.reference
      );

      console.log({ newSource });
      if (newSource) return result(stripKey(newSource));
    }

    return result(source ?? {});
  } catch (e) {
    return result({});
  }
};

export default Page;

function stripKey(source: PricingSource) {
  return {
    ...source,
    meta: {
      ...source.meta,
      key: null,
    },
  };
}
