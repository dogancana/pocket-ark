import { useState } from 'react';
import { InfiniteChaosTable } from './infinite-chaos-table';

export const InfiniteChaosPage: React.FC = () => {
  const [shardsPerHour, setShardsPerHour] = useState(2000);
  const limitedShardsPerHour = Math.max(1000, Math.min(5000, shardsPerHour));

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
          Time needed to collect 100 shards (seconds):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="seconds"
          type="number"
          defaultValue={2000}
          placeholder="Shards/hr (min: 1000, max:5000)"
          onChange={(e) => {
            setShardsPerHour(parseInt(e.target.value, 10));
          }}
        />
        {shardsPerHour !== limitedShardsPerHour && (
          <p className="mt-2 text-red-400 max-w-xs text-center">
            Limiting value [1000, 5000]: {limitedShardsPerHour}
          </p>
        )}
      </div>
      <div className="mt-8">
        <InfiniteChaosTable shardsPerHour={limitedShardsPerHour} />
        <p className="text-right my-1 mr-3 mb-5 text-gray-500">
          Shards per hour: {limitedShardsPerHour}
        </p>
      </div>
    </div>
  );
};
