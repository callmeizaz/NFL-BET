import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import Typography from "@material-ui/core/Typography";

import TeamTableHeader from "../TeamTableHeader";
import TeamTableBody from "../TeamTableBody";

import TeamDetails from "../../TeamDetails";

import { ITeamsprops } from "../interfaces";

import { useStyles } from "../../../utils/table";

const TeamTable = ({ currentLeague, handleTeamClick }: ITeamsprops) => {
  const classes = useStyles();

  const data = useMemo(() => currentLeague.teams, [currentLeague]);

  // src="https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18055.png"

  const columns = useMemo(
    () => [
      {
        Header: "Teams",
        accessor: "name",
        meta: {
          position: "left",
          width: "w-3/4",
        },
        Cell: ({ row }: any) => {
          const team = row.original;
          return <TeamDetails name={team?.name} logoURL={team?.logoUrl} />;
        },
      },
      {
        Header: "Owner",
        accessor: "user.fullName",
        meta: {
          position: "right",
          align: "right",
        },
        Cell: ({ row }: any) => {
          const { user } = row.original;
          return (
            <Typography align="right" className="text-gray-500 w-full px-4">
              {user?.fullName}
            </Typography>
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
        className="w-full table"
        style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
      >
        <TeamTableHeader headerGroups={headerGroups} />
        {/* Apply the table body props */}
        <TeamTableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
          handleTeamClick={handleTeamClick}
        />
      </div>
    </Fragment>
  );
};

export default TeamTable;
