import {
  Material,
  materials,
  MaterialsToCraft,
  MaterialType,
} from '@pocket-ark/lost-ark-data';
import { filter } from 'fuzzy';
import { useEffect, useMemo, useState } from 'react';
import { Search, SearchProps, SearchResultData } from 'semantic-ui-react';
import { MaterialInput } from './material-input';
import { MaterialIcon } from '../../../ui/icons/material-icon';

export interface MaterialAdditionProps {
  initialMaterials?: MaterialsToCraft;
  placeholder?: string;
  materialContainerClassName?: string;
  materialClassName?: string;
  onMaterialsChanged: (materials: MaterialsToCraft) => void;
}

interface State {
  query: string;
  materialAmounts: MaterialsToCraft;
}

export const MaterialAddition: React.FC<MaterialAdditionProps> = ({
  initialMaterials,
  placeholder,
  materialContainerClassName,
  materialClassName,
  onMaterialsChanged,
}) => {
  const [{ query, materialAmounts }, setState] = useState<State>({
    query: '',
    materialAmounts: initialMaterials || [],
  });

  const filteredMaterials = useMemo(
    () => filterByQuery(query, materials).map((m) => ({ title: m.name })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  useEffect(() => {
    if (onMaterialsChanged) onMaterialsChanged(materialAmounts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialAmounts]);

  return (
    <>
      <Search
        value={query}
        placeholder={placeholder || 'Materials'}
        minCharacters={0}
        results={filteredMaterials.slice(0, 7)}
        resultRenderer={(result) => (
          <div key={result.title} className="flex items-center">
            <i className="mr-2">
              <MaterialIcon
                type={materials.find((m) => m.name === result.title)?.type}
                overrides={{ width: 30, height: 30 }}
              />
            </i>
            {result.title}
          </div>
        )}
        onResultSelect={handleResultSelect}
        onSearchChange={onSearchChange}
      />
      <div className={`mt-3 ${materialContainerClassName || ''}`}>
        {materialAmounts?.map((m) => (
          <MaterialInput
            key={m.type}
            {...m}
            className={materialClassName}
            remoteMaterial={removeMaterial}
            setMaterialAmount={setMaterialAmount}
          />
        ))}
      </div>
    </>
  );

  function removeMaterial(type: MaterialType) {
    setState((state) => ({
      ...state,
      materialAmounts: state.materialAmounts.filter((m) => m.type !== type),
    }));
  }

  function setMaterialAmount(type: MaterialType, amount: number) {
    setState((state) => ({
      ...state,
      materialAmounts: state.materialAmounts.map((m) =>
        m.type === type ? { ...m, amount } : m
      ),
    }));
  }

  function handleResultSelect(_, data: SearchResultData) {
    setState((prevState) => {
      const { title } = data.result;
      const material = materials.find((m) => m.name === title);
      if (!material) return prevState;

      const addToFront = prevState.materialAmounts.find(
        (m) => m.type === material.type
      ) || { type: material.type, amount: 1 };

      return {
        ...prevState,
        query: data.value,
        materialAmounts: [
          addToFront,
          ...prevState.materialAmounts.filter((m) => m.type !== material.type),
        ],
      };
    });
  }

  function onSearchChange(_, data: SearchProps) {
    setState((p) => ({ ...p, query: data.value }));
  }
};

function filterByQuery(query: string, materials: Material[]) {
  return filter(query, materials, {
    extract: (f) => f.name,
  })
    .map((r) => r.original)
    .filter((v) => !!v);
}
