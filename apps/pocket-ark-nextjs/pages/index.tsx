import Image from 'next/image';
import { Card, Container } from 'semantic-ui-react';
import { Header } from '../src/components';
import { mainFeatures } from '../src/services';
import { FeatureKey } from '../src/services/site-constants';

const featuresToShowOnLanding: FeatureKey[] = [
  'engravingComparison',
  'priceIndex',
  'honingPlanner',
  'mariShop',
  'secretMaps',
];

const Index = () => {
  const features = featuresToShowOnLanding.map((f) => mainFeatures[f]);
  return (
    <>
      <Header />
      <div className="w-full relative" style={{ height: '50vh' }}>
        <Container className="h-full text-center">
          <div className="flex justify-center items-center h-full text-4xl w-2/3 m-auto">
            <p className="text-xl md:text-4xl">
              <strong>POCKET ARK</strong> is set of tools to help you on your
              journeys throughout Arkesia
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
          src="/assets/june.png"
          layout="fill"
          alt="hero image"
          className="opacity-20"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <Container className="mt-8">
        <Card.Group
          items={Object.values(features).map((f) => ({
            header: f.header,
            description: f.description[0],
            href: f.href,
          }))}
          stackable
          centered
        />
      </Container>
    </>
  );
};

export default Index;
