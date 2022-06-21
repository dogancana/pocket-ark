import { HeroSection } from '../../../ui/layout/layout';
import { Header } from 'semantic-ui-react';
export const EngravingComparisonPage = () => {
  return (
    <>
      <HeroSection>
        <Header>Engraving Comparison</Header>
        <p>
          Compare engraving damage modifiers specifally for your rotaion. <br />
          Effective engravings per class vary massively. A change in your
          rotation or combat stats would give better results with other
          engravings.
          <br />
          If you don't feel like running tests in training room, you can simply
          use this tool to have an idea.
        </p>
      </HeroSection>
    </>
  );
};
