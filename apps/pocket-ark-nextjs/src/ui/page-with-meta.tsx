import Head from 'next/head';
import { FC } from '../utils/react';

export interface PageWithMetaProps {
  title?: string;
  subTitle?: string;
  description?: string;
  path?: string;
}

export const PageWithMeta: FC<PageWithMetaProps> = ({
  title,
  subTitle,
  description,
  children,
  path,
}) => {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {subTitle && <title>Pocket Ark - {subTitle}</title>}
        {description && (
          <meta key="description" name="description" content={description} />
        )}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        {path && (
          <>
            <meta property="og:url" content={`https://pocketark.app${path}`} />
            <meta
              property="og:image"
              content={`/assets/screenshots${path}.png`}
            />
          </>
        )}
      </Head>
      {children}
    </>
  );
};
