import React, { Fragment, useMemo } from "react";
import clsx from "clsx";
import { MockData } from "./mockData";
import { useTable } from "react-table";
import { useStyles } from "./styles";

const HelpModalContentThree = () => {
  const classes = useStyles();
  const data = useMemo(
    () =>
      MockData.map((data) => {
        return {
          stats: data.stat,
          points: data.ponts,
        };
      }),
    [MockData]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Stat",
        accessor: "stats",
      },
      {
        Header: "Points",
        accessor: "points",
      },
    ],
    []
  );
  // @ts-ignore
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = tableInstance;

  return (
    <Fragment>
      <table
        {...getTableProps()}
        className={clsx("w-full", "border-gray-400", classes.table)}
      >
        <thead>
          {headerGroups.map((head) => (
            <tr {...head.getHeaderGroupProps()}>
              {head.headers.map((col, idx) => (
                <th
                  className={clsx(
                    idx % 2 != 0 ? "w-1/3" : "w-1/2",
                    "border-gray-400",
                    classes.th
                  )}
                  {...col.getHeaderProps()}
                >
                  {col.render("Header")}
                </th>
              ))}
            </tr>
          ))}
          <tbody {...getTableBodyProps()} className="contents">
            {/* Prepare and Loop over the row */}
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className={clsx(classes.td, "border-gray-400")}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </thead>
      </table>
    </Fragment>
  );
};
export default HelpModalContentThree;
