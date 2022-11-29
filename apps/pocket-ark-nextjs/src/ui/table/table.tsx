import {
  DetailedHTMLProps,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { FC } from '../../utils/react';

const borderColor = 'border-gray-300';
const spacing = 'p-2';

export const Table: FC<
  DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>
> = ({ children, className, ...rest }) => {
  return (
    <table
      className={`w-full table-auto border-collapse border ${borderColor} ${
        className || ''
      }`}
      {...rest}
    >
      {children}
    </table>
  );
};

export const TableHeader: FC<
  DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
> = ({ children, ...props }) => {
  return (
    <thead style={{ position: 'relative' }} {...props}>
      {children}
    </thead>
  );
};

export const TableHeaderCell: FC<
  DetailedHTMLProps<
    ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >
> = ({ children, className, ...props }) => {
  return (
    <th
      className={`border whitespace-nowrap text-left ${spacing} ${borderColor} ${
        className || ''
      }`}
      {...props}
    >
      {children}
    </th>
  );
};

export const TableHeaderRow: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
> = ({ children, className, ...props }) => {
  return (
    <tr className={`bg-stone-200 ${className || ''}`} {...props}>
      {children}
    </tr>
  );
};

export const TableRow: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
> = ({ children, className, ...props }) => {
  return (
    <tr
      className={`even:bg-stone-50 odd:bg-stone-100 ${className || ''}`}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableBody: FC<
  DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
> = ({ children, ...props }) => {
  return <tbody {...props}>{children}</tbody>;
};

export const TableCell: FC<
  DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >
> = ({ children, className, ...props }) => {
  return (
    <td
      className={`border ${borderColor} whitespace-nowrap ${spacing} ${
        className || ''
      }`}
      {...props}
    >
      {children}
    </td>
  );
};
