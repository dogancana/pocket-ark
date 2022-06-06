export interface MainFeature {
  header: string;
  description: string[];
  href: string;
}

export type FeatureKey =
  | 'infiniteChaos'
  | 'priceIndex'
  | 'currencyCalculator'
  | 'strongholdCrafting'
  | 'secretMaps'
  | 'honingPlanner'
  | 'honingProtection';

export const mainFeatures: { [key in FeatureKey]: MainFeature } = {
  infiniteChaos: {
    header: 'Infinite Chaos',
    description: [
      'Calculate the value of running infinite Chaos Dungeons.',
      'To see potential profits, you can select how many shards you can collect in an hour.',
    ],
    href: '/infinite-chaos',
  },
  priceIndex: {
    header: 'Price index',
    description: [
      'Lost Ark material and item prices information.',
      'You can set your prices or opt-in to use a shared one.',
      'The information will be saved on your browser but you can also choose to share it with others.',
    ],
    href: '/price-index',
  },
  currencyCalculator: {
    header: 'Currency Calculator',
    description: [
      'Convert Lost Ark currencies such as Royal Crystals, Gold, Crystals, and Pheons.',
      'Add materials together to see the total value in gold.',
    ],
    href: '/currency-calculator',
  },
  strongholdCrafting: {
    header: 'Stronghold Crafting',
    description: [
      'Find which crafting recipe has the most profit.',
      'Use your stronghold action points more efficiently.',
    ],
    href: '/stronghold-crafting',
  },
  secretMaps: {
    header: 'Secret Maps',
    description: [
      'Compare expected gold rewards for different tier secret maps.',
      'The cost is calculated based on minimum rewards.',
    ],
    href: '/secret-maps',
  },
  honingPlanner: {
    header: 'Honing Planner',
    description: [
      'Calculate expected honing cost and success chance.',
      'See optimal number of materials to use and the expected honing attempts to fail.',
    ],
    href: '/honing',
  },
  honingProtection: {
    header: 'Honing Protection',
    description: [
      'See fair values for honing protection materials.',
      'Give current upgrade cost and chance to see added value of protection honing materials.',
    ],
    href: '/honing-protection',
  },
};
