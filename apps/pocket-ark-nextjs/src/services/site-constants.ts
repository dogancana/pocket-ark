export interface MainFeature {
  header: string;
  description: string[];
  metaDescription?: string[];
  href: string;
}

export type FeatureKey =
  | 'infiniteChaos'
  | 'priceIndex'
  | 'currencyCalculator'
  | 'strongholdCrafting'
  | 'secretMaps'
  | 'honingPlanner'
  | 'honingProtection'
  | 'mariShop'
  | 'engravingComparison';

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
    metaDescription: ['See how much gold does a pheon cost in Lost Ark.'],
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
      'Calculate expected honing materials and currency costs.',
      'See optimal number of honing protection materials to use and the expected honing attempts to fail.',
    ],
    metaDescription: ['Simple honing calculator for Lost Ark.'],
    href: '/honing',
  },
  honingProtection: {
    header: 'Honing Protection',
    description: [
      'See fair values for honing protection materials.',
      'Give current upgrade cost and chance to see added value of protection honing materials.',
    ],
    metaDescription: [
      'Lost ark honing calculator to see optimal number of honing protection materials to use.',
    ],
    href: '/honing-protection',
  },
  mariShop: {
    header: "Mari's Shop",
    description: [
      "Is it worth buying materials from Mari's Shop?",
      "See gold values of possible Mari's Shop materials and chec if it's efficient to buy with blue crystals.",
    ],
    metaDescription: ['Lost Ark, Mari Shop calculator'],
    href: '/mari-shop',
  },
  engravingComparison: {
    header: 'Engraving Comparison',
    description: [
      'Which engravings are better for your build?',
      'Compare damage engravings in this tool to see what selection would perform better in your rotation.',
    ],
    metaDescription: ['Lost Ark, Engraving Comparison calculator'],
    href: '/engraving-comparison',
  },
};
