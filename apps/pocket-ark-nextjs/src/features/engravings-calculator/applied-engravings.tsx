import { FC } from 'react';
import { AddEngravings } from './components/add-engravings';
import { AppliedEngravingPopup } from './components/applied-engraving-popup';
import { useEngravingFilters } from './filters/filters-provider';

export const AppliedEngravings: FC = () => {
  const {
    state: { appliedEngravings },
  } = useEngravingFilters();

  return (
    <div className="flex ml-16">
      <div className="mr-8 flex flex-col items-center">
        <AddEngravings />

        <span className="text-sm text-gray-500">
          Click eng. to change level
        </span>
      </div>
      {appliedEngravings.map(({ engraving, levelIndex }) => (
        <AppliedEngravingPopup
          key={engraving.type}
          engraving={engraving}
          levelIndex={levelIndex}
        />
      ))}
    </div>
  );
};
