import { setPricingSourceToCookies } from '@pocket-ark/fe-utils';
import { COOKIES, PriceSourceMeta, materials } from '@pocket-ark/lost-ark-data';
import { removeCookies } from 'cookies-next';
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Search } from 'semantic-ui-react';
import { usePricingSource } from '../../components';
import {
  applyPricingSourceReference,
  searchPricingSources,
} from '../../services';
import { FC } from '../../utils';
import { relativeDate } from '../../utils/time';

interface State {
  query: string;
  loading: boolean;
  metas: PriceSourceMeta[];
  reference?: string;
  loadingAction?: boolean;
}

const resultRenderer = (meta: PriceSourceMeta) => (
  <div className="flex justify-between items-center">
    <div className="">
      <span className="flex">
        {meta.description} ({meta.region})
      </span>
      <span className="text-xs font-thin text-gray-500">
        Updated: {relativeDate(meta.lastUpdatedAtISO)}
      </span>
    </div>
  </div>
);

const initial = (q?: string): State => ({
  query: q,
  loading: false,
  loadingAction: false,
  metas: [],
});

export const PriceSourceReferences: FC = () => {
  const { source, setSource } = usePricingSource();
  const [
    { loading, metas, query, reference, loadingAction: applyingReference },
    setState,
  ] = useState<State>(initial(source.meta?.description));

  const isOwner = !!source.meta?.key;
  const timeoutRef = useRef<NodeJS.Timeout>();
  const handleSearchChange = useCallback((query: string) => {
    clearTimeout(timeoutRef.current);
    setState((s) => {
      const isSameDesc =
        query === s.metas.find((m) => m.reference === s.reference)?.description;
      return {
        ...s,
        query,
        loading: query.length > 0,
        reference: isSameDesc ? s.query : undefined,
      };
    });

    timeoutRef.current = setTimeout(async () => {
      if (query.length === 0) {
        setState((s) => ({ ...s, loading: false }));
        return;
      }
      try {
        const m = query ? await searchPricingSources(query) : [];
        setState((p) => ({ ...p, loading: false, metas: m }));
      } finally {
        setState((s) => ({ ...s, loading: false }));
      }
    }, 300);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const applyReference = useCallback(async () => {
    setState((s) => ({ ...s, loadingAction: true }));
    try {
      const s = await applyPricingSourceReference(reference);
      setSource(s);
    } finally {
      setState((s) => ({ ...s, loadingAction: false }));
    }
  }, [reference, setSource]);

  const optOut = useCallback(() => {
    const newSource = { ...source, meta: undefined };
    setPricingSourceToCookies(newSource);
    removeCookies(COOKIES.reference);
    setSource(newSource);
    handleSearchChange('');
  }, [source, handleSearchChange, setSource]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="flex items-stretch mt-6" onSubmit={onSubmit}>
        <Search
          size="large"
          loading={loading}
          minCharacters={2}
          selectFirstResult
          disabled={!!source.meta?.reference}
          placeholder="Search price sources..."
          onResultSelect={(e, data) => {
            setState((s) => ({
              ...s,
              query: data.result.description,
              reference: data.result.reference,
            }));
          }}
          resultRenderer={resultRenderer as any}
          onSearchChange={(e, data) => handleSearchChange(data.value)}
          results={metas.slice(0, 10) || []}
          value={query}
        />

        {!source.meta && (
          <Button
            disabled={!reference}
            primary
            loading={applyingReference}
            onClick={applyReference}
          >
            Apply reference
          </Button>
        )}

        {source.meta && (
          <Button loading={applyingReference} onClick={optOut}>
            <Button.Content visible>
              {isOwner ? 'Delete reference key' : 'Opt out'}
            </Button.Content>
          </Button>
        )}
      </form>
      {!source.meta && (
        <span className="mt-3 text-sm text-gray-500">
          Try searching EUC, NAE etc..
        </span>
      )}
    </>
  );
};
