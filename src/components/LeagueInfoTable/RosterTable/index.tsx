import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import Typography from "@material-ui/core/Typography";

import RosterTableHeader from "../RosterTableHeader";
import RosterTableBody from "../RosterTableBody";

import RosterDetails from "../../RosterDetails";

import { IRosterprops } from "../interfaces";

import { useStyles } from "../../../utils/table";

import { renderText } from "../../../helpers/renderers";

const RosterTable = ({ currentTeam }: IRosterprops) => {
  const classes = useStyles();

  const data = useMemo(() => currentTeam?.rosters || [], [currentTeam]);
  
  // src="https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18055.png"

  const columns = useMemo(
    () => [
      {
        Header: "Slot",
        accessor: "",
        meta: {
          position: "left",
        },
        Cell: ({ row }: any) => {
          const { player } = row.original;
          return renderText(player?.position, "text-gray-500");
        },
      },
      {
        Header: "Player",
        accessor: "fullName",
        meta: {
          position: "middle",
          width: "w-36 md:w-80",
        },
        Cell: ({ row }: any) => {
          const { player } = row.original;
          return (
            <RosterDetails
              fullName={player.fullName}
              photoUrl={player.photoUrl}
            />
          );
        },
      },
      {
        Header: "Team|Position",
        accessor: "position",
        meta: {
          position: "right",
          align: "right",
        },
        Cell: ({ row }: any) => {
          const { player } = row.original;
          return (
            <Typography align="right" className="text-gray-500 w-full px-4">
              {player?.teamName} | {player?.position}
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
        style={{ borderCollapse: "separate", borderSpacing: "0 0" }}
      >
        <RosterTableHeader headerGroups={headerGroups} />
        {/* Apply the table body props */}
        <RosterTableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        />
      </div>
    </Fragment>
  );
};

export default RosterTable;
