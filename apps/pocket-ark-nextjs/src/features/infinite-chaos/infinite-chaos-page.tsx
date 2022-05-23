import { useState } from 'react';
import { FC } from '../../utils';
import { InfiniteChaosTable } from './infinite-chaos-table';
import { Input } from 'semantic-ui-react';

export const InfiniteChaosPage: FC = () => {
  const [seconds, setSeconds] = useState(120);
  const limitedSeconds = seconds
    ? Math.max(Math.min(seconds, 600), 30)
    : undefined;
  const shardsPerHour = limitedSeconds
    ? (limitedSeconds / 100) * 3600
    : undefined;

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <p>
        The below table shows various convertions for materials sold in chaos
        dungeon shard merchant.
      </p>
      <p>
        You can select how many shards you can collect in an hour to see time
        potential.
      </p>
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
      <div className="mt-8">
        <InfiniteChaosTable shardsPerHour={shardsPerHour} />
        <p className="text-right my-1 mr-3 mb-5 text-gray-500">
          Shards per hour: {shardsPerHour}
        </p>
      </div>
    </div>
  );
};
