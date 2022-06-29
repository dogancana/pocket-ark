import { useMediaSM } from '../../ui';
import ErrorBoundary from '../../ui/error-boundry';
import { FC } from '../../utils/react';
import { AppliedEngravings } from './applied-engravings';
import { CalculationTable } from './calculation-table';
import { Filters } from './filters/filters';

export const Results: FC = () => {
  const sm = useMediaSM();
  return (
    <>
      <AppliedEngravings />
      <div className="relative flex flex-col mt-4">
        <div className="absolute right-2 -top-9">
          <Filters />
        </div>
        <ErrorBoundary
          message="Calculation Table"
          errorChild={
            <div className="border-2 px-16 py-2 mt-4 bg-stone-50">
              <span className="w-96">
                That's something I cannot calculate. Change filters and try
                again! <br />
                If error continues, try refreshing the page!
              </span>
            </div>
          }
        >
          <div className="self-stretch overflow-x-auto">
            <CalculationTable />
          </div>
        </ErrorBoundary>
        {sm === false && (
          <span className="text-sm text-gray-400 py-2 ml-auto">
            Try clicking table cells for more details
          </span>
        )}
      </div>
    </>
  );
};
