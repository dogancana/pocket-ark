import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { orderBy } from 'lodash';
import { Dispatch, ReactNode, Reducer } from 'react';
import { TableHeaderCell, TableHeaderRow } from './table';
import { Popup } from 'semantic-ui-react';

export interface SortableTableState<T = string> {
  direction: 'ascending' | 'descending';
  column: T;
}

export interface SortableTableAction<T = string> {
  type: 'CHANGE_SORT';
  column: T;
}

export interface SortableTableItem<T = string> {
  label: string;
  tooltip?: string;
  column: T;
  notSortable?: boolean;
}

export type SortableTableReducer<T> = Reducer<
  SortableTableState<T>,
  SortableTableAction<T>
>;

export function sortableTableReducer<T>(
  state: SortableTableState<T>,
  action: { type: 'CHANGE_SORT'; column: T }
): SortableTableState<T> {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: action.column,
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
}

export function orderForTable<T, K extends keyof T>(
  items: T[],
  column: K,
  direction: SortableTableState<K>['direction']
) {
  return orderBy(items, [column], [direction === 'ascending' ? 'asc' : 'desc']);
}

export interface SortableTableHeaderProps<T> extends SortableTableItem<T> {
  sorted?: 'ascending' | 'descending';
  currentSortedColumn: T;
  direction: SortableTableState<T>['direction'];
  notSortable?: boolean;
  onClick?: () => void;
}

export function SortableTableHeader<T>({
  label,
  column,
  currentSortedColumn,
  direction,
  notSortable,
  tooltip,
  sorted,
  ...props
}: SortableTableHeaderProps<T> & { children?: ReactNode }) {
  const sortedBy =
    currentSortedColumn === column && !notSortable ? direction : null;
  const iconClass = 'h-5 w-5';
  const trigger = (
    <span
      className={`flex items-center ${!notSortable ? 'cursor-pointer' : ''}`}
    >
      {label}
      {sortedBy === 'descending' && <ArrowSmDownIcon className={iconClass} />}
      {sortedBy === 'ascending' && <ArrowSmUpIcon className={iconClass} />}
    </span>
  );

  return (
    <TableHeaderCell key={label} {...props}>
      {tooltip ? (
        <Popup hoverable flowing trigger={trigger}>
          <Popup.Content>
            <p className="max-w-xs">{tooltip}</p>
          </Popup.Content>
        </Popup>
      ) : (
        trigger
      )}
    </TableHeaderCell>
  );
}

export interface SortableTableHeadersProps<T> {
  headers: SortableTableItem<T>[];
  column: T;
  direction: SortableTableState<T>['direction'];
  dispatch: Dispatch<SortableTableAction<T>>;
}

export function SortableTableHeaders<T>({
  headers,
  column,
  direction,
  dispatch,
}: SortableTableHeadersProps<T>) {
  return (
    <TableHeaderRow>
      {headers.map((h) => (
        <SortableTableHeader
          key={h.label}
          {...h}
          currentSortedColumn={column}
          direction={direction}
          onClick={
            !h.notSortable
              ? () => dispatch({ type: 'CHANGE_SORT', column: h.column })
              : undefined
          }
        >
          {h.label}
        </SortableTableHeader>
      ))}
    </TableHeaderRow>
  );
}
