import Link from 'next/link';

const Index = () => {
  const mainFeatures = [
    {
      title: 'Engraving Calculator',
      message: 'Compare builds with simple damage calculations.',
      href: '/engraving-calculator',
    },
    {
      title: 'Stone Cutter',
      message:
        'Simple utility to help cuttong best stones and see success chances.',
      href: '/stone-cutter',
    },
    {
      title: 'Upgrade Planner',
      message:
        'Plan your upgrades to maximize your resources with success rates.',
      href: '/upgrade-planner',
    },
    {
      title: 'Social',
      message:
        '[Coming Soon] Social features to help you find guilds, players and share information.',
      href: '/social',
    },
  ];

  return (
    <div className="container mx-auto my-24 flex flex-wrap">
      {mainFeatures.map(({ title, message, href }) => (
        <Link key={title} href={href} passHref>
          <div className="p-8 m-4 w-96 shadow-lg cursor-pointer">
            <h2>{title}</h2>
            <p>{message}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Index;
