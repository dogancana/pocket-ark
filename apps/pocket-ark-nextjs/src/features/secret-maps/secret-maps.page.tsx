import { FC } from '../../utils';
import { SecretMapsTable } from './secret-maps-table';

export const SecretMapsPage: FC = () => {
  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <p className="text-center">
        You can see and compare expected average resources rewarded for various
        maps.
        <br />
        These values are base (worst case) values and doesn't include
        probability engraving books or gems.
        <br />
        <span className="text-xs font-light text-center mt-1">
          There is no proper data to convert Rift pieces into map rewards. If I
          find reliable data, rift piece to gold values for each map will be
          added to this page.
        </span>
      </p>
      <div className="mt-8">
        <SecretMapsTable />
      </div>
    </div>
  );
};
