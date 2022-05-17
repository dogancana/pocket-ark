import { formatRelative } from 'date-fns';
import Link from 'next/link';
import { usePricingSource } from '../../components';
import { Alert } from '../../ui';
import { FC } from '../../utils';

export const SourceSync: FC = () => {
  const { source, isSourceComplete } = usePricingSource();

  console.log('SourceSync', { source, isSourceComplete });

  if (!isSourceComplete) return <div id="nothing"></div>;

  const meta = source?.meta;

  if (!meta) {
    return (
      <Alert type="info">
        <p className="font-bold">Share your pricing list!</p>
        <p className="text-sm">
          You have a complete pricing list. You can share it with other people.
          Whenever you make an update to your pricing list, it'll be synced with
          other people who has your refrence code.
        </p>
        <Link href="/api/price-index-share" passHref>
          <a className="text-sm">Click here to generate a reference</a>
        </Link>
      </Alert>
    );
  }

  if (meta.key) {
    return (
      <Alert type="success">
        <p>
          Your pricing index is public. Copy below link below to share it with
          others. (You can just click the reference to copy link)
        </p>
        <a
          className="cursor-pointer"
          onClick={(e) => {
            const code = e.target as HTMLElement;
            const anchor = code.closest('a') as HTMLAnchorElement;
            e.preventDefault();
            window.prompt('Copy to clipboard: Ctrl+C, Enter', anchor?.href);
          }}
          href={`?reference=${meta.reference}`}
        >
          <code className="text-xs">{meta.reference}</code>
        </a>
      </Alert>
    );
  }

  const relativeDate = source?.meta?.lastUpdatedAtISO
    ? formatRelative(new Date(source?.meta?.lastUpdatedAtISO), new Date())
    : undefined;

  return (
    <Alert type="success">
      <p>You are using price index with reference: {meta.reference}</p>
      {relativeDate && <p>{`Reference last updated ${relativeDate}`}</p>}
    </Alert>
  );
};
