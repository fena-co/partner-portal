/* eslint-disable react/jsx-key */
import styled from 'styled-components';
import { useTable } from 'react-table';
import { useMemo } from 'react';
import { COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';

// interface ColumnsContent {
//   COLUMNS: { Header: string; accessor: string }[];
//   // data: { size: string; value: string; totalValue: string }[];
// }

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableHeaderCell = styled.th<{ width?: number }>`
  padding: 10px 0;
  text-align: left;
  border-bottom: 1px solid #dbe3eb;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #13273f;
  ${({ width }) => width && `width: ${width}px;`}
  :last-child {
    text-align: right;
  }
`;

const TableBodyRow = styled.tr`
  cursor: pointer;
  :hover {
    background-color: #f4f7f9;
  }
  :last-child {
    background-color: #e6ebf1;
    font-weight: bold;
    :hover {
      background-color: #e6ebf1;
    }
  }
`;

const TableBodyCell = styled.td`
  padding: 10px 0;
  border-bottom: 1px solid #dbe3eb;
  font-family: Montserrat;
  font-style: normal;
  font-size: 13px;
  line-height: 36px;
  color: #13273f;

  :first-child {
    text-align: left;
  }
  :last-child {
    text-align: right;
  }
`;

const TransactionsTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeaderCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableHeaderCell>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableBodyRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableBodyCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableBodyCell>
                );
              })}
            </TableBodyRow>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TransactionsTable;
