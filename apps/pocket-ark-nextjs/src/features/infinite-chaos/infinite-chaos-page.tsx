import { useState, Fragment } from 'react';
import { FC } from '../../utils';
import { InfiniteChaosTable } from './infinite-chaos-table';
import { Input, Header } from 'semantic-ui-react';
import { HeroSection, PageContainer } from '../../ui/layout';
import { mainFeatures } from '../../services/site-constants';

export const InfiniteChaosPage: FC = () => {
  const { header, description } = mainFeatures.infiniteChaos;
  const [seconds, setSeconds] = useState(120);
  const limitedSeconds = seconds
    ? Math.max(Math.min(seconds, 600), 30)
    : undefined;
  const shardsPerHour = limitedSeconds
    ? (100 / limitedSeconds) * 3600
    : undefined;

  return (
    <>
      <HeroSection>
        <Header as="h1">{header}</Header>
        <p>
          {description.map((d) => (
            <Fragment key={d}>
              {d}
              <br />
            </Fragment>
          ))}
          <div className="mt-4 flex flex-col items-center">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="seconds"
            >
              Time needed to collect 100 shards (in seconds):
            </label>
            <Input
              id="seconds"
              icon="time"
              iconPosition="left"
              type="number"
              defaultValue={150}
              size="big"
              placeholder="150: 100 Shards in 2 mins"
              onChange={(e) => {
                const seconds = parseInt(e.target.value, 10);
                if (!Number.isNaN(seconds)) setSeconds(seconds);
              }}
            />

            {seconds !== limitedSeconds && (
              <p className="mt-2 text-red-400 max-w-xs text-center">
                Limiting value [30, 600]: {limitedSeconds}
              </p>
            )}
          </div>
        </p>
      </HeroSection>
      <PageContainer className="mt-8">
        <InfiniteChaosTable shardsPerHour={shardsPerHour} />
        <p className="text-right my-1 mr-3 mb-5 text-gray-500">
          Shards per hour: {shardsPerHour}
        </p>
      </PageContainer>
    </>
  );
};
