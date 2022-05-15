import Link from 'next/link';

const Index = () => {
  const mainFeatures = [
    {
      title: 'Engraving Calculator',
      message: 'Compare builds with simple damage calculations.',
      href: '/engraving-calculator',
      enabled: false,
    },
    {
      title: 'Stone Cutter',
      message:
        'Simple utility to help cuttong best stones and see success chances.',
      href: '/stone-cutter',
      enabled: false,
    },
    {
      title: 'Upgrade Planner',
      message:
        'Plan your upgrades to maximize your resources with success rates.',
      href: '/upgrade-planner',
      enabled: false,
    },
    {
      title: 'Social',
      message:
        '[Coming Soon] Social features to help you find guilds, players and share information.',
      href: '/social',
      enabled: false,
    },
    {
      title: 'Infinite Chaos',
      message: 'Calculate value of running infinite chaos dungeon.',
      href: '/infinite-chaos',
      enabled: true,
    },
    {
      title: 'Price index',
      message: 'Adjust prices of your server to use in other features.',
      href: '/price-index',
      enabled: true,
    },
    {
      title: 'Currency Calculator',
      message: 'Convert crystals, gold and real money to each other.',
      href: '/currency-calculator',
      enabled: true,
    },
    {
      title: 'Stronghold Crafting',
      message: 'See profit margins for crafting various items in your stronghold.',
      href: '/stronghold-crafting',
      enabled: true,
    },
  ];

  return (
    <div className="container mx-auto my-24 flex flex-wrap">
      {mainFeatures
        .filter((v) => v.enabled)
        .map(({ title, message, href }) => (
          <Link key={title} href={href} passHref>
            <a className="p-8 m-4 w-96 shadow-lg cursor-pointer">
              <h2 className="font-bold">{title}</h2>
              <p>{message}</p>
            </a>
          </Link>
        ))}
    </div>
  );
};

export default Index;
