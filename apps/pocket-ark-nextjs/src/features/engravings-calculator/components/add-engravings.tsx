import {
  engravings,
  EngravingType
} from '@pocket-ark/lost-ark-data';
import { filter } from 'fuzzy';
import { useMemo, useState } from 'react';
import { Search } from 'semantic-ui-react';
import { EngravingIcon } from '../../../ui/icons';
import { FC } from '../../../utils/react';
import { useEngravingFilters } from '../filters/filters-provider';

export const AddEngravings: FC = () => {
  const [query, setQuery] = useState('');
  const { state, dispatch } = useEngravingFilters();
  const disabled = state.appliedEngravings.length >= 7;

  const filteredEngravings = useMemo(
    () =>
      filter(query, engravings, { extract: (e) => e.name })
        .map((v) => v.original)
        .filter((v) => !!v),
    [query]
  );

  return (
    <fieldset disabled={disabled}>
      <Search
        className={disabled ? 'opacity-50 select-none' : ''}
        open={disabled ? false : undefined}
        size="big"
        value={query}
        onSearchChange={(e, { value }) => setQuery(value)}
        placeholder="Add Engravings (max 7)"
        minCharacters={0}
        results={filteredEngravings
          .map((e) => ({ title: e.name, description: e.type }))
          .slice(0, 6)}
        resultRenderer={(result) => (
          <div key={result.title} className="flex items-center">
            <EngravingIcon
              type={result.description as EngravingType}
              overrides={{ width: 30, height: 30 }}
            />
            <span className="text-lg ml-2">{result.title}</span>
          </div>
        )}
        onResultSelect={(_, data) => {
          setQuery('');
          dispatch({
            type: 'ChangeEngraving',
            engravingType: data.result.description,
            levelIndex: 2,
          });
        }}
      />
    </fieldset>
  );
};
