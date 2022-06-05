import { GetServerSideProps } from 'next';
import { mainFeatures } from '../src/services';

const Sitemap = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const baseURL = req.headers.host;
  const urls = Object.values(mainFeatures).map(
    ({ href }) => `https://${baseURL}${href}`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
