import { getAllLOAMMaterials } from '@pocket-ark/loa-market-api';
import { materials } from '@pocket-ark/lost-ark-data';
import { NextApiRequest, NextApiResponse } from 'next';
import { mapLOAMMaterialType } from '../../src/utils/materials';

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mats = await getAllLOAMMaterials();
    const matsWithTypes = mats.map((m) => ({ ...m, type: mapLOAMMaterialType(m) }));
    const matesWithWrongTypes = materials.filter((m) => {
      return !matsWithTypes.find((a) => a.type === m.type);
    });

    return res
      .status(200)
      .json({ mats: matsWithTypes, missing: matesWithWrongTypes });
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};

export default controller;
