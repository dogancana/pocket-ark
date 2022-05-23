import { Card, Container } from 'semantic-ui-react';

const Index = () => {
  const mainFeatures = [
    {
      header: 'Infinite Chaos',
      description: 'Calculate value of running infinite chaos dungeon.',
      href: '/infinite-chaos',
    },
    {
      header: 'Price index',
      description: 'Adjust prices of your server to use in other features.',
      href: '/price-index',
    },
    {
      header: 'Currency Calculator',
      description: 'Convert crystals, gold and real money to each other.',
      href: '/currency-calculator',
    },
    {
      header: 'Stronghold Crafting',
      description:
        'See profit margins for crafting various items in your stronghold.',
      href: '/stronghold-crafting',
    },
    {
      header: 'Secret Maps',
      description: 'Compare secret map rewards based.',
      href: '/secret-maps',
    },
  ];

  return (
    <Container className="mt-16">
      <Card.Group items={mainFeatures} stackable centered />
    </Container>
  );
};

export default Index;
