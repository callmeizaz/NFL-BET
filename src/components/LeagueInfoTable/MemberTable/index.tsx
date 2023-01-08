import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

import MemberTableHeader from "../MemberTableHeader";
import MemberTableBody from "../MemberTableBody";

import { IMemberprops } from "../interfaces";

import { useStyles } from "../../../utils/table";

const MemberTable = ({ currentLeague }: IMemberprops) => {
  const classes = useStyles();
  const data = useMemo(() => currentLeague.members, [currentLeague]);

  // src="https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18055.png"

  const columns = useMemo(
    () => [
      {
        Header: "League Members",
        accessor: "name",
        meta: {
          position: "left",
        },
        Cell: (props: any) => {
          const length = props?.data?.length;
          const { user } = props.row.original;

          const index = props.row.index;
          return (
            <div className="p-4 pr-8 w-full">
              <div>
                <Typography
                  display="inline"
                  variant="h6"
                  className="text-gray-500"
                >
                  {index + 1}.
                </Typography>
                <Typography display="inline" variant="h6" className="ml-4">
                  {user?.fullName} {user.id === currentLeague.userId? "(Admin)" : ""}
                </Typography>
              </div>
            </div>
          );
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
    <Fragment>
      <div
        {...getTableProps()}
        className="w-full table mt-4"
        style={{ borderCollapse: "separate" }}
      >
        <MemberTableHeader headerGroups={headerGroups} />
        {/* Apply the table body props */}
        <MemberTableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        />
      </div>
    </Fragment>
  );
};

export default MemberTable;
