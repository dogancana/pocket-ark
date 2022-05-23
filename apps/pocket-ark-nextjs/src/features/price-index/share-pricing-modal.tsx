import { PriceSourceMeta } from '@pocket-ark/lost-ark-data';
import { FormEventHandler, useState, useEffect } from 'react';
import { Button, Dropdown, Input, Modal, ModalProps } from 'semantic-ui-react';
import { usePricingSource } from '../../components';
import { sharePricingSource } from '../../services';
import { FC } from '../../utils/react';

const regions: { key: PriceSourceMeta['region']; text: string }[] = [
  { key: 'EUC', text: 'Europe Central' },
  { key: 'EUW', text: 'Europe West' },
  { key: 'NAE', text: 'North America East' },
  { key: 'NAW', text: 'North America West' },
  { key: 'SA', text: 'South America' },
];

interface State {
  sharing?: boolean;
  sharingError?: string;
  region: PriceSourceMeta['region'];
  description: string;
}

const initial: State = {
  region: 'EUC',
  description: '',
};

export const SharePricingModal: FC<ModalProps> = (props) => {
  const { pricedMaterialsObject, setSource, setShowShareModal } =
    usePricingSource();
  const [{ region, description, sharing, sharingError }, setState] =
    useState<State>(initial);

  useEffect(() => {
    if (props.open) setState(initial);
  }, [props.open]);

  const [completed, total] = Object.entries(pricedMaterialsObject).reduce(
    (prev, [key, value]) => {
      if (key === 'meta') return prev;
      return [prev[0] + (value.price ? 1 : 0), prev[1] + 1];
    },
    [0, 0] as [number, number]
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setState((s) => ({ ...s, sharing: true, sharingError: undefined }));
    try {
      const newSource = await sharePricingSource(region, description.trim());
      setShowShareModal(false);
      setSource(newSource);
      setState((s) => ({ ...s, sharing: false }));
    } catch (e) {
      setState((s) => ({
        ...s,
        sharing: false,
        sharingError: e?.error || 'Unexpected error occured',
      }));
    }
  };

  return (
    <Modal {...props}>
      <Modal.Header>Share pricing index</Modal.Header>
      <Modal.Content>
        <form onSubmit={onSubmit} id="shareForm">
          <Input
            fluid
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setState((state) => ({
                ...state,
                description: e.target.value
                  .replace(/[^a-zA-Z0-9 ]/, '')
                  .replace(/\s\s+/g, ' ')
                  .substr(0, 30),
              }))
            }
            label={
              <Dropdown
                className="icon"
                value={region}
                options={regions.map((r) => ({ ...r, value: r.key }))}
                onChange={(e, { value }) =>
                  setState((s) => ({ ...s, region: value as any }))
                }
              />
            }
            labelPosition="left"
          />
          <div className="p-2 text-thin">
            Material prices completed {completed} / {total}
          </div>
          {sharingError && (
            <div className="text-sm font-thin ml-2 text-red-500">
              Error: {sharingError}
            </div>
          )}
        </form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          form="shareForm"
          disabled={!region || !description || sharing}
          primary
          type="submit"
          loading={sharing}
        >
          Share
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
