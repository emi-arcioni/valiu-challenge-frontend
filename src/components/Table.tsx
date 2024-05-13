import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Table: FC<Props> = ({ children }) => (
  <table className="table-auto w-full text-sm">{children}</table>
);

export const Thead: FC<Props> = ({ children }) => (
  <thead className="bg-slate-50 dark:bg-slate-700">{children}</thead>
);

export const Tbody: FC<Props> = ({ children }) => <tbody>{children}</tbody>;

export const Th: FC<Props> = ({ children, className }) => (
  <th className={`border border-slate-300 p-3 text-left ${className}`}>
    {children}
  </th>
);

export const Tr: FC<Props> = ({ children }) => <tr>{children}</tr>;

export const Td: FC<Props> = ({ children }) => (
  <td className="border border-slate-300 p-3 text-left text-slate-500">
    {children}
  </td>
);
