import { MouseEventHandler } from 'react';
import { usePricingSource } from '../../components';
import { Alert } from '../../ui';
import { FC } from '../../utils';
import { relativeDate } from '../../utils/time';
import { Popup } from 'semantic-ui-react';

const prompt: MouseEventHandler = (e) => {
  const code = e.target as HTMLElement;
  const anchor = code.closest('a') as HTMLAnchorElement;
  e.preventDefault();
  window.prompt('Copy to clipboard: Ctrl+C, Enter', anchor?.href);
};

export const SourceSync: FC = () => {
  const { source, setShowShareModal } = usePricingSource();

  const meta = source?.meta;

  const lastUpdatedDate = source?.meta?.lastUpdatedAtISO
    ? relativeDate(source.meta.lastUpdatedAtISO)
    : undefined;

  if (!meta) {
    return (
      <Alert
        type="info"
        onClick={() => {
          setShowShareModal(true);
        }}
      >
        <p className="cursor-pointer">
          <strong>Share your pricing list!</strong>
          <br />
          You can share it with other people. Whenever you make an update to
          your pricing list, it'll be synced with other people who has your
          refrence code. <br />
          Click this box to share!
        </p>
      </Alert>
    );
  }

  if (meta.key) {
    return (
      <Alert type="success">
        <p>
          Your pricing index is public. Either give the description you provided
          or copy below link below to share it with others. (You can just click
          the reference to copy link)
          <br />
          <a
            className="cursor-pointer"
            onClick={prompt}
            href={`/api/pricing-sources/apply/${meta.reference}`}
          >
            <code className="text-xs">
              {meta.description} ({meta.region})
            </code>
          </a>
          <br />
          <div className="flex w-full items-center">
            <span className="text-xs font-thin">Updated {lastUpdatedDate}</span>
            <Popup
              trigger={
                <a
                  className="ml-auto"
                  onClick={prompt}
                  href={`/api/pricing-sources/apply/${meta.reference}?key=${meta.key}`}
                >
                  <code className="text-xs">Share with contributors</code>
                </a>
              }
            >
              <Popup.Content>
                <p>
                  When you share your price index with write permission, people
                  who follows the link will have exactly same ownership as you
                  do. Whoever updates prices on their browser, will be updating
                  prices for everyone using this reference. <br />
                  Once it's done, it cannot be undone.
                </p>
              </Popup.Content>
            </Popup>
          </div>
        </p>
      </Alert>
    );
  }

  return (
    <Alert type="success">
      You are using price index:{' '}
      <strong>
        {meta.description} ({meta.region}){' '}
      </strong>
      <br />
      <span className="text-xs text-thin">{`Reference last updated ${lastUpdatedDate}`}</span>
    </Alert>
  );
};
