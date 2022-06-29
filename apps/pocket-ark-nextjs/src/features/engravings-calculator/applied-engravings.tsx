import { FC } from 'react';
import { AddEngravings } from './components/add-engravings';
import { AppliedEngravingPopup } from './components/applied-engraving-popup';
import { useEngravingFilters } from './filters/filters-provider';

export const AppliedEngravings: FC = () => {
  const {
    state: { appliedEngravings },
  } = useEngravingFilters();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mb-4 lg:mb-0 flex flex-col items-center lg:mr-8 lg:ml-5">
        <AddEngravings />

        <span className="text-sm text-gray-500">
          Click eng. to change level
        </span>
      </div>
      <div className="flex justify-center overflow-x-auto mb-8 lg:mb-4">
        {appliedEngravings.map(({ engraving, levelIndex }) => (
          <AppliedEngravingPopup
            key={engraving.type}
            engraving={engraving}
            levelIndex={levelIndex}
          />
        ))}
      </div>
    </div>
  );
};
