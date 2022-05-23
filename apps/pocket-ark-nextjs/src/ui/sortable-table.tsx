import { orderBy } from 'lodash';
import { Dispatch, Reducer } from 'react';
import { Table, TableHeaderCellProps } from 'semantic-ui-react';

export interface SortableTableState<T = string> {
  direction: 'ascending' | 'descending';
  column: T;
}

export interface SortableTableAction<T = string> {
  type: 'CHANGE_SORT';
  column: T;
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

export interface SortableTableHeaderProps<T> extends TableHeaderCellProps {
  label: string;
  column: T;
  currentSortedColumn: T;
  direction: SortableTableState<T>['direction'];
  notSortable?: boolean;
}

export function SortableTableHeader<T>({
  label,
  column,
  currentSortedColumn,
  direction,
  notSortable,
  ...props
}: SortableTableHeaderProps<T>) {
  return (
    <Table.HeaderCell
      key={label}
      sorted={currentSortedColumn === column ? direction : null}
      {...props}
    >
      {label}
    </Table.HeaderCell>
  );
}

export interface SortableTableHeadersProps<T> {
  headers: { label: string; column: T; notSortable?: boolean }[];
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
    <Table.Row>
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
    </Table.Row>
  );
}
