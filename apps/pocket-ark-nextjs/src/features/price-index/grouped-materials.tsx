import { materialsObject } from '@pocket-ark/lost-ark-data';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { MaterialBox } from '../../components';
import { RarityLine } from '../../ui/rarity';
import { PricedMaterial } from '../../utils/materials';
import { FC } from '../../utils/react';
import { relativeDate } from '../../utils/time';
import { ItemFooter, PriceItem, readableCategory } from './common';

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
        const mat = materialsObject[m.type];
        const prevCat = prev ? materialsObject[prev.type].category : undefined;
        const showHeader = !prevCat || prevCat !== mat.category;
        if (!mat) return null;
        return (
          <Fragment key={m.type}>
            {!noGroups && showHeader && (
              <Header
                key={m.category}
                as="h3"
                className="col-span-full m-0"
                style={{ padding: '10px 0 0 6px', margin: 0 }}
              >
                {readableCategory(mat.category)}
              </Header>
            )}
            <PriceItem key={m.type}>
              <MaterialBox material={m} className="pt-2 " />
              <RarityLine rarity={mat.rarity} className="h-1 mt-2 opacity-40" />
              <ItemFooter>
                <span className="text-xs h-full ml-2 mt-1 text-gray-400">
                  Last updated {relativeDate(m.updatedAt)}
                </span>
              </ItemFooter>
            </PriceItem>
          </Fragment>
        );
      })}
    </>
  );
};
