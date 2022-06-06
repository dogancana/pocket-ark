import { categorySorting, PricedMaterial } from '@pocket-ark/lost-ark-data';
import { filter } from 'fuzzy';
import { sortBy } from 'lodash';
import { useMemo, useState } from 'react';
import {
  SearchProps,
  SearchResultData,
  StrictSearchResultProps
} from 'semantic-ui-react';
import { usePricingSource } from '../../components';

interface StaticOption {
  name: string;
}

interface State {
  query: string;
  options: StrictSearchResultProps[];
  materials: PricedMaterial[];
}

export const ALL_MATERIALS = { name: 'All materials' };
export const MATERIALS_WITHOUT_PRICE = { name: 'Materials without price' };
export const STATIC_OPTIONS = [
  ALL_MATERIALS,
  { name: 'Materials without price' },
];

export function useFilteredMaterials() {
  const { pricedMaterialsArray: materials } = usePricingSource();

  const sortedMaterials = useMemo(
    () =>
      sortBy(materials, (m) => {
        const index = categorySorting.findIndex((c) => c === m.category);
        if (index === -1) return Number.MAX_SAFE_INTEGER;
        return index;
      }),
    [materials]
  );

  const [state, setState] = useState<State>({
    query: ALL_MATERIALS.name,
    options: [...STATIC_OPTIONS, ...sortedMaterials].map((i) => ({
      title: i.name,
    })),
    materials: sortedMaterials,
  });

  const onQueryChanged = (query: string) => {
    setState((p) => {
      const options = filter(
        query || '',
        [...STATIC_OPTIONS, ...sortedMaterials],
        {
          extract: (m: StaticOption | PricedMaterial) =>
            `${m.name}_${isPricedMaterial(m) ? m.category : ''}`,
        }
      )
        .filter((v) => !!v)
        .map((m) => m.original as StaticOption | PricedMaterial);

      return {
        ...p,
        query,
        options: options.map((i) => ({ title: i.name })),
        materials: options.filter(isPricedMaterial),
      };
    });
  };

  const onSelected = (_, data: SearchResultData) => {
    onQueryChanged(data.result.title);
  };

  const setQuery = (_, data: SearchProps) => onQueryChanged(data.value);

  return {
    ...state,
    allVisible: state.materials.length === materials.length,
    setQuery,
    onSelected,
  };
}

function isPricedMaterial(
  m: PricedMaterial | StaticOption
): m is PricedMaterial {
  return !!(m as PricedMaterial).type;
}
