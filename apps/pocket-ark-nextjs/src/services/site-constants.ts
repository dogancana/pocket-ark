export interface MainFeature {
  header: string;
  description: string;
  href: string;
}

export const mainFeatures: MainFeature[] = [
  {
    header: 'Infinite Chaos',
    description: 'Calculate value of running infinite chaos dungeon.',
    href: '/infinite-chaos',
  },
  {
    header: 'Price index',
    description: 'Adjust prices of your server to use in other features.',
    href: '/price-index',
  },
  {
    header: 'Currency Calculator',
    description: 'Convert crystals, gold and real money to each other.',
    href: '/currency-calculator',
  },
  {
    header: 'Stronghold Crafting',
    description:
      'See profit margins for crafting various items in your stronghold.',
    href: '/stronghold-crafting',
  },
  {
    header: 'Secret Maps',
    description: 'Compare secret map rewards based.',
    href: '/secret-maps',
  },
  {
    header: 'Honing Planner',
    description: 'See average honing cost and optimal protection materials.',
    href: '/honing',
  },
  {
    header: 'Engraving Comparison',
    description: 'Compare engraving damage modifiers.',
    href: '/engraving-comparison',
  },
];
