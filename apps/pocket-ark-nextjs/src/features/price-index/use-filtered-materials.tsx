import {
  categorySorting,
  materialsObject,
  raritySorting,
} from '@pocket-ark/lost-ark-data';
import { filter } from 'fuzzy';
import { sortBy } from 'lodash';
import { useMemo, useState } from 'react';
import {
  SearchProps,
  SearchResultData,
  StrictSearchResultProps,
} from 'semantic-ui-react';
import { useMaterials } from '../../components';
import { PricedMaterial } from '../../utils/materials';

interface StaticOption {
  name: string;
}

interface State {
  query: string;
  options: StrictSearchResultProps[];
  materials: PricedMaterial[];
}

export function useFilteredMaterials() {
  const { materials } = useMaterials();
  const mats = Object.values(materials || {}).filter(
    (m) => !!materialsObject[m.type]
  );

  const sortedMaterials = useMemo(() => {
    return sortBy(mats, (m) => {
      const mat = materialsObject[m.type];
      const index = categorySorting.findIndex((c) => c === mat.category);
      if (index === -1) return Number.MAX_SAFE_INTEGER;

      const rarityIndex = raritySorting.findIndex((r) => r === mat.rarity);

      return index * 100 + rarityIndex;
    });
  }, [mats]);

  const [state, setState] = useState<State>({
    query: '',
    options: sortedMaterials.map((i) => ({
      title: i.name,
    })),
    materials: sortedMaterials,
  });

  const onQueryChanged = (query: string) => {
    setState((p) => {
      const options = filter(query || '', sortedMaterials, {
        extract: (m: StaticOption | PricedMaterial) =>
          `${m.name}_${isPricedMaterial(m) ? m.category : ''}`,
      })
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
    allVisible: state.materials.length === mats.length,
    setQuery,
    onSelected,
  };
}

function isPricedMaterial(
  m: PricedMaterial | StaticOption
): m is PricedMaterial {
  return !!(m as PricedMaterial).type;
}
