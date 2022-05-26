import Image from 'next/image';
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
    <>
      <div className="w-full relative" style={{ height: '50vh' }}>
        <Container className="h-full text-center">
          <div className="flex justify-center items-center h-full text-4xl w-2/3 m-auto">
            <p className="text-4xl">
              <strong>POCKET ARK</strong> is set of tools to help you on your
              journeys throughout Arkasia
              <br />
              <span className="text-lg">
                It's under development by one Shadow Hunter main. Everything you
                see here are under development.
                <br />
                In future there will be ways to communicate for feedback
              </span>
            </p>
          </div>
        </Container>
        <Image
          src="/assets/landing-bg.webp"
          layout="fill"
          alt="hero image"
          className="opacity-20"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <Container className="mt-16">
        <Card.Group items={mainFeatures} stackable centered />
      </Container>
    </>
  );
};

export default Index;
