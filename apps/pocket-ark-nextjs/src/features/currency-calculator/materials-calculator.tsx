import { CurrencyType, MaterialsToCraft } from '@pocket-ark/lost-ark-data';
import { useState } from 'react';
import { MaterialAddition, useMaterials } from '../../components';
import { Currency } from '../../ui';
import { FC } from '../../utils/react';

export const MaterialsCalculator: FC = () => {
  const { addMaterials } = useMaterials();
  const [materials, setMaterials] = useState<MaterialsToCraft>([]);

  const totalInGold = addMaterials(materials);

  return (
    <>
      <div className="flex flex-col items-center">
        <MaterialAddition
          placeholder="Materials to add"
          materialContainerClassName="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          onMaterialsChanged={setMaterials}
        />
      </div>
      {!materials.length && (
        <p className="col-span-1 mt-4 text-stone-500">
          Add materials by searching in the search bar to automatically
          calculate the total price.
        </p>
      )}
      {!!materials.length && (
        <div className="mt-8 flex justify-end items-center">
          <span className="text-xl mr-2">Total:</span>
          <Currency type={CurrencyType.Gold} value={totalInGold} />
        </div>
      )}
    </>
  );
};
