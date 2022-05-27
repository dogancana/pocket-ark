import { filter } from 'fuzzy';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Search, SearchProps, SearchResultData } from 'semantic-ui-react';
import { mainFeatures } from '../../services';
import { FC } from '../../utils';

interface State {
  query: string;
}

const resultRenderer = (feature: { href: string; title: string }) => (
  <Link href={feature.href} passHref>
    <a>{feature.title}</a>
  </Link>
);

export const SiteSearch: FC = () => {
  const { push } = useRouter();
  const [state, setState] = useState<State>({ query: '' });
  const results = filter(state.query || '', mainFeatures, {
    extract: (f) => f.header,
  })
    .map((r) => ({ href: r.original.href, title: r.original.header }))
    .filter((v) => !!v);

  const onSearchChange = useCallback((_, data: SearchProps) => {
    setState((s) => ({ ...s, query: data.value }));
  }, []);

  const onSelect = useCallback(
    (_, data: SearchResultData) => {
      setState((s) => ({ ...s, query: '' }));
      push(data.result.href);
    },
    [push]
  );

  return (
    <Search
      value={state.query}
      results={results || []}
      minCharacters={0}
      selectFirstResult
      noResultsMessage="No results found"
      resultRenderer={resultRenderer as any}
      onResultSelect={onSelect}
      onSearchChange={onSearchChange}
    />
  );
};
