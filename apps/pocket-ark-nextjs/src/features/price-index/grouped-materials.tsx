import { PricedMaterial } from '@pocket-ark/lost-ark-data';
import { Header } from 'semantic-ui-react';
import { MaterialBox } from '../../components';
import { RarityLine } from '../../ui/rarity';
import { FC } from '../../utils/react';
import { ItemFooter, PriceItem, readableCategory } from './common';
import { Fragment } from 'react';

export interface GroupedMaterialsProps {
  filteredMaterials: PricedMaterial[];
  noGroups?: boolean;
}

export const GroupedMaterials: FC<GroupedMaterialsProps> = ({
  filteredMaterials,
  noGroups,
}) => {
  return (
    <>
      {filteredMaterials.map((m, i) => {
        const prev = filteredMaterials[i - 1];
        const showHeader = !prev || prev.category !== m.category;
        return (
          <Fragment key={m.type}>
            {!noGroups && showHeader && (
              <Header
                key={m.category}
                as="h3"
                className="col-span-full m-0"
                style={{ padding: '10px 0 0 6px', margin: 0 }}
              >
                {readableCategory(m.category)}
              </Header>
            )}
            <PriceItem key={m.type}>
              <MaterialBox material={m} className="grow pt-2 w-full" fluid />
              <RarityLine rarity={m.rarity} className="h-1 mt-2 opacity-40" />
              <ItemFooter />
            </PriceItem>
          </Fragment>
        );
      })}
    </>
  );
};
