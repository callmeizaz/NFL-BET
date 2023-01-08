import { useMemo, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import TableHeader from "../TableHeader";
import TableBody from "../TableBody";
import { TransfersData } from "../interfaces";
import { renderCurrency, dateTimeRender } from "../../../helpers/currency";

const TableDesktop = ({ data }: TransfersData) => {
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "",
        meta: {
          position: "middleLeague",
        },
        Cell: ({ row }: any) => {
          const { created } = row.original;
          return (
            <Typography variant="body1">{dateTimeRender(created)}</Typography>
          );
        },
      },
      {
        Header: "Type",
        meta: {
          colSpan: 1,
          position: "middleLeague",
        },
        Cell: ({ row }: any) => {
          const { type } = row.original;
          return <Typography variant="body1">{type}</Typography>;
        },
      },
      {
        Header: "Status",
        meta: {
          colSpan: 1,
          position: "middleLeague",
        },
        Cell: ({ row }: any) => {
          const { status } = row.original;
          return <Typography variant="body1">{status}</Typography>;
        },
      },
      {
        Header: "Amount",
        accessor: "",
        meta: {
          position: "middleLeague",
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
        Header: "Narration",
        accessor: "",
        meta: {
          colSpan: 1,
          position: "middleLeague",
        },
        Cell: ({ row }: any) => {
          const { narration } = row.original;
          return <Typography variant="body2">{narration}</Typography>;
        },
      },
    ],
    []
  );

  // @ts-ignore
  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Hidden only={["xs", "sm"]}>
      <Fragment>
        <div
          {...getTableProps()}
          className="w-full table"
          style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
        >
          <TableHeader headerGroups={headerGroups} />
          <TableBody
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
