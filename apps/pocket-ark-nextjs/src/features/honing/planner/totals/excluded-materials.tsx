import { MaterialsToCraft } from '@pocket-ark/lost-ark-data';
import { useState, useEffect } from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import { FC } from '../../../../utils/react';
import { MaterialAddition } from '../../../../components';

interface State {
  open: boolean;
  materials: MaterialsToCraft;
}

interface ExcludedMaterialsProps {
  onMaterialsChanged: (materials: MaterialsToCraft) => void;
}

const STORAGE_KEY = 'honingExcludedMaterials';

export const ExcludedMaterials: FC<ExcludedMaterialsProps> = ({
  onMaterialsChanged,
}) => {
  const [{ open, materials }, setState] = useState<State>({
    open: false,
    materials: [],
  });

  useEffect(() => {
    const m = storedExcludedMaterials();
    if (m) setMaterials(m);
  }, []);

  return (
    <>
      <Modal open={open} onClose={toggle}>
        <Modal.Header>Already owned materials</Modal.Header>
        <Modal.Content>
          <div>
            <MaterialAddition
              placeholder="Excluded materials"
              materialClassName="mr-3 mb-3"
              materialContainerClassName="w-full flex flex-wrap"
              onMaterialsChanged={setMaterials}
              initialMaterials={materials}
            />
          </div>
          {!materials.length && (
            <p className="col-span-1 mt-4 text-stone-500">
              Mark some of the materials that you already own, so that they will
              be excluded from total.
              <br />
              Shards and silver are not calculated in material costs yet.
            </p>
          )}
        </Modal.Content>
      </Modal>
      <button className="text-stone-500 cursor-pointer" onClick={toggle}>
        <Icon name="edit" />
      </button>
    </>
  );

  function setMaterials(m: MaterialsToCraft) {
    setState((s) => ({ ...s, materials: m }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
    onMaterialsChanged(m);
  }

  function toggle() {
    setState((s) => ({ ...s, open: !s.open }));
  }
};

function storedExcludedMaterials(): MaterialsToCraft {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}
