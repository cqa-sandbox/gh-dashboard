// @ts-nocheck

import { useTable, useSortBy } from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
function Table({ columns, data }: any) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data,
      },
      useSortBy);
  
    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{
                  column.render("Header")
                  }
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.column.id === 'rowNumber' ? i + 1 : cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
 
  function DataTableOrg({data, collectionDate}:any): JSX.Element{


    const columns = [
      {
        Header: `${collectionDate} - ${data.length} repos`,
        columns: [
          {
            Header: "#",
            id: 'rowNumber',
          },
          {
            Header: "Stars",
            accessor: "stars",
          },
          {
            Header: "Forks",
            accessor: "forks",
          },
          {
            Header: "Repo",
            accessor: "repositoryName",
          },
  
          {
            Header: "Issues",
            accessor: "issues",
          },
          {
            Header: "PRs",
            accessor: "pr",
          },
        ],
      },
    ];
  

    return (
          <Styles>
              <Table columns={columns} data={data} />
          </Styles>
      );
  }

  export default DataTableOrg;