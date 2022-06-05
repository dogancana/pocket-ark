import { GetServerSideProps } from 'next';

const RobotsTxt = () => {
  return null;
};

const allowed = `
User-Agent: *
Disallow: /api

Sitemap: https://pocketark.app/sitemap.xml
`;

const disallowed = `
User-Agent: *
Disallow: /
`;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const host = req.headers.host;
  res.write(host.includes('pocketark.app') ? allowed : disallowed);
  res.end();

  return {
    props: {},
  };
};

export default RobotsTxt;
