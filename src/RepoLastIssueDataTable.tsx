import { useTable } from "react-table";
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
      });
  
    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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


  function LastIssueDataTable({data}:any): JSX.Element{

    const columns =  [
          {
            Header: "#",
            id: 'rowNumber',
          },
          {
            Header: "Created data",
            accessor: "createdAt",
            Cell: (row: any) => {

              const currentDate = row.cell.value;
              if (!currentDate) return "";
              return currentDate.slice(0, 10);
            },
          },
          {
            Header: "Closed date",
            accessor: "closedAt",
            Cell: (row: any) => {

              const currentDate = row.cell.value;
              if (!currentDate) return "";
              return currentDate.slice(0, 10);
            },
          },
          {
            Header: "Last issue",
            accessor: "title"
          },
          {
            Header: "State",
            accessor: "state",
          }
    ];

    return (
          <Styles>
              <Table columns={columns} data={data} />
          </Styles>
      );
  }

  export default LastIssueDataTable;