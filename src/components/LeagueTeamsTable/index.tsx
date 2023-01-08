import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import Typography from "@material-ui/core/Typography";

import TeamTableHeader from "./TeamTableHeader";
import TeamTableBody from "./TeamTableBody";

import TeamDetails from "../TeamDetails";

import { ContestsPayload } from "./interfaces";

import { useStyles } from "../../utils/table";

const LeagueTeamTable = ({ teamsData }: ContestsPayload) => {
  const classes = useStyles();
  const data = useMemo(() => teamsData, [teamsData]);

  // src="https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18055.png"

  const columns = useMemo(
    () => [
      {
        Header: "Teams",
        accessor: "name",
        meta: {
          position: "single",
        },
        Cell: ({ row }: any) => {
          const team = row.original;
          return <TeamDetails name={team?.name} logoURL={team?.logoURL} />;
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
          handleContestShareClick={() => {}}
        />
      </div>
    </Fragment>
  );
};

export default LeagueTeamTable;
