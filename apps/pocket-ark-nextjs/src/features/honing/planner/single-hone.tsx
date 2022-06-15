import { CurrencyType } from '@pocket-ark/lost-ark-data';
import { CSSProperties, MouseEventHandler, useRef, useState } from 'react';
import { Currency } from '../../../ui';
import { MaterialIcon } from '../../../ui/icons';
import { FC } from '../../../utils/react';
import { SingleLevelHoningWithTotals } from '../models';
import { Icon } from 'semantic-ui-react';

export interface SingleHoneProps {
  singleLevelHoning: SingleLevelHoningWithTotals;
  notPlanned?: boolean;
}

interface State {
  expanded: boolean;
}

export const SingleHone: FC<SingleHoneProps> = ({
  singleLevelHoning,
  notPlanned,
}) => {
  const [{ expanded }, setState] = useState<State>({
    expanded: false,
  });
  const wrapperRef = useRef<HTMLDivElement>();

  const scroll = () => {
    setTimeout(() => {
      wrapperRef.current?.parentElement.scrollTo({
        behavior: 'smooth',
        left: wrapperRef.current.offsetLeft - 107,
      });
    }, 50);
  };

  const toggleExpanded: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setState((state) => ({ ...state, expanded: !state.expanded }));

    if (!expanded) scroll();
  };

  return (
    <div
      className={`flex border-r-2 border-stone-200  ${
        notPlanned ? 'opacity-50' : ''
      }`}
      ref={wrapperRef}
    >
      <div
        className="px-4 pt-4 pb-2 h-full cursor-pointer flex flex-col items-center justify-center w-32 relative z-0"
        onClick={toggleExpanded}
      >
        <span className="text-3xl">+{singleLevelHoning.toLevel}</span>
        <Currency
          className="text-center"
          size={15}
          type={CurrencyType.Gold}
          arround
          value={singleLevelHoning.expectedCostProtected}
        />
        <span className="mt-1 text-xs text-gray-500">
          {singleLevelHoning.averageAttemptIndexToSuccess + 1}
        </span>
      </div>
      <div
        className="flex relative z-0"
        style={
          singleLevelHoning.attempts.length > 2
            ? createGradientStyle(
                (singleLevelHoning.averageAttemptIndexToSuccess /
                  singleLevelHoning.attempts.length) *
                  100
              )
            : undefined
        }
      >
        {singleLevelHoning.attempts.length > 12 && expanded && (
          <div
            className="sticky left-32 w-8 h-full bg-slate-300 z-10 flex items-center justify-center pb-2 cursor-pointer"
            onClick={toggleExpanded}
          >
            <Icon name="angle double left" />
          </div>
        )}
        {expanded &&
          singleLevelHoning.attempts.map((attempt, index) => (
            <div
              key={attempt.attemptNumber}
              className="p-4 flex flex-col items-center justify-center"
            >
              {index === singleLevelHoning.averageAttemptIndexToSuccess && (
                <>
                  <div className="absolute h-full left-0 bg-green-50"></div>
                </>
              )}
              <span className="mb-2 text-lg">
                {attempt.chance.toFixed()}%{' '}
                {!!attempt.protectionChance && (
                  <span className="ml-2 font-thin text-gray-500">
                    ({(attempt.chance + attempt.protectionChance).toFixed()}%)
                  </span>
                )}
              </span>
              <div className="flex items-center text-xs">
                {attempt.protection.map((protection) => (
                  <div key={protection.type} className="flex items-center mr-2">
                    <MaterialIcon
                      type={protection.type}
                      overrides={{ width: 20, height: 20 }}
                    />
                    <span className="ml-2">{protection.recommended || 0}</span>
                  </div>
                ))}
              </div>
              {singleLevelHoning.chance.maxAttempts > 1 && (
                <span className="text-xs text-gray-500 mt-3">
                  {readableNumber(
                    (100 / singleLevelHoning.chance.maxAttempts) * index,
                    2
                  )}
                  %
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export function readableNumber(num: number, maximumFractionDigits = 0) {
  return num?.toLocaleString([], { maximumFractionDigits });
}

function createGradientStyle(midPerc = 50): CSSProperties {
  return {
    background: `linear-gradient(90deg, rgba(0, 255, 0, 0.1) 0%, white ${midPerc}%, rgba(255, 0, 0, 0.1) 100%)`,
  };
}
