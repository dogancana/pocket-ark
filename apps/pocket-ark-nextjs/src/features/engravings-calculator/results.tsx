import ErrorBoundary from '../../ui/error-boundry';
import { FC } from '../../utils/react';
import { AppliedEngravings } from './applied-engravings';
import { CalculationTable } from './calculation-table';
import { Filters } from './filters/filters';

export const Results: FC = () => {
  return (
    <>
      <AppliedEngravings />
      <div className="flex justify-center mt-4">
        <div className="relative">
          <div className="absolute right-2 -top-5">
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
            <CalculationTable />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
