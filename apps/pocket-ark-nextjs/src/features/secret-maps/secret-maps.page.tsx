import { FC } from '../../utils';
import { SecretMapsTable } from './secret-maps-table';

export const SecretMapsPage: FC = () => {
  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <p>
        You can see and compare expected average resources rewarded for various
        maps.
      </p>
      <p>
        These values are base (worst case) values and doesn't include
        probability engraving books or gems.
      </p>
      <p className="text-sm font-light w-1/2 text-center mt-1">
        There is no proper data to convert Rift pieces into map rewards. If I
        find reliable data, rift piece to gold values for each map will be added
        to this page.
      </p>
      <div className="mt-8">
        <SecretMapsTable />
      </div>
    </div>
  );
};
