import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import TableBodyMobile from "../TableBodyMobile";
import { TransfersData } from "../interfaces";
import { dateRender, renderCurrency } from "../../../helpers/currency";
import TableHeader from "../TableHeader";

const TableDesktop = ({ data }: TransfersData) => {
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        disableSortBy: true,
        meta: {
          position: "left",
        },
        Cell: ({ row }: any) => {
          const { created } = row.original;

          return <Typography variant="body1">{dateRender(created)}</Typography>;
        },
      },
      {
        Header: "Status",
        disableSortBy: true,
        meta: {
          position: "left",
        },
        Cell: ({ row }: any) => {
          const { status } = row.original;

          return <Typography variant="body1">{status}</Typography>;
        },
      },
      {
        Header: "Amount",
        disableSortBy: true,
        meta: {
          position: "left",
        },
        Cell: ({ row }: any) => {
          const { amount } = row.original;

          return (
            <Typography variant="body1">
              {renderCurrency(amount / 100)}
            </Typography>
          );
        },
      },
      {
        Header: "Type",
        disableSortBy: true,
        meta: {
          position: "left",
        },
        Cell: ({ row }: any) => {
          const { type } = row.original;

          return <Typography variant="body1">{type}</Typography>;
        },
      },
    ],
    []
  );

  // @ts-ignore
  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    tableInstance;

  return (
    <Hidden only={["md", "lg", "xl"]}>
      <Fragment>
        <div
          {...getTableProps()}
          className="w-full table"
          style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
        >
          <TableHeader headerGroups={headerGroups} />
          <TableBodyMobile
            getTableBodyProps={getTableBodyProps}
            rows={rows}
            prepareRow={prepareRow}
          />
        </div>
      </Fragment>
    </Hidden>
  );
};

export default TableDesktop;
