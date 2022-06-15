import Head from 'next/head';
import { FC } from '../utils/react';

export interface PageWithMetaProps {
  title?: string;
  subTitle?: string;
  description?: string;
}

export const PageWithMeta: FC<PageWithMetaProps> = ({
  title,
  subTitle,
  description,
  children,
}) => (
  <>
    <Head>
      {title && <title>{title}</title>}
      {subTitle && <title>Pocket Ark - {subTitle}</title>}
      {description && (
        <meta key="description" name="description" content={description} />
      )}
    </Head>
    {children}
  </>
);
