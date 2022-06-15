// pages/api/og-image.ts
import { withOGImage } from 'next-api-og-image';
import { MarisShopPage } from '../../src/features/maris-shop/mari-shop-page';

interface QueryParams {
  stage: string;
  name: string;
}

export default withOGImage<'query', QueryParams>({
  template: {
    react: ({ name, stage }) => <MarisShopPage />,
  },
  cacheControl: 'public, max-age=604800, immutable',
  dev: { inspectHtml: false },
});
