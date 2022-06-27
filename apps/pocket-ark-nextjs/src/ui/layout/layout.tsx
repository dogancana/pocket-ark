import { Container } from 'semantic-ui-react';
import { Header } from '../../components';
import { FC } from '../../utils/react';

export const HeroSection: FC = ({ children }) => (
  <>
    <Header />
    <section className="py-8 bg-gradient-to-br from-stone-300 to-stone-50">
      <Container>
        <div className="flex flex-col mt-4 items-center text-center">
          {children}
        </div>
      </Container>
    </section>
  </>
);

export const PageContainer: FC<{ className?: string }> = ({
  className,
  children,
}) => (
  <Container>
    <div className="flex flex-col items-center">
      <div className={`max-w-full ${className || ''}`}>{children}</div>
    </div>
  </Container>
);
