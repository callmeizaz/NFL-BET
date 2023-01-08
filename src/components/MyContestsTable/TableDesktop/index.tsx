import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import clsx from "classnames";

import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import SearchIcon from "@material-ui/icons/Search";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import TableHeader from "../TableHeader";
import TableBody from "../TableBody";

import PlayerDetails from "../../PlayerDetails";

import { ContestsTablePayload } from "../interfaces";

import { renderCurrency, c2d } from "../../../helpers/currency";

import { useStyles } from "../../../utils/table";

const TableDesktop = ({
  contestData,
  handleContestShareClick,
  userId,
  closeContestConfirmation,
}: ContestsTablePayload) => {
  const classes = useStyles();
  const data = useMemo(
    () =>
      contestData.map((contest) => {
        const {
          claimerPlayer,
          creatorPlayer,
          claimerPlayerSpread,
          creatorPlayerSpread,
          creatorPlayerMaxWin,
          claimerPlayerMaxWin,
          claimerPlayerCover,
          creatorPlayerCover,
          claimerId,
        } = contest;
        let myPlayer = null;
        let theirPlayer = null;
        let myPlayerSpread = null;
        let theirPlayerSpread = null;
        let myPlayerMaxWin = null;
        let theirPlayerMaxWin = null;
        let myPlayerCover = null;
        let theirPlayerCover = null;
        let status = null;
        const iAmClaimer = userId === claimerId;
        if (iAmClaimer) {
          myPlayer = claimerPlayer;
          theirPlayer = creatorPlayer;
          myPlayerSpread = claimerPlayerSpread;
          theirPlayerSpread = creatorPlayerSpread;
          myPlayerMaxWin = claimerPlayerMaxWin;
          theirPlayerMaxWin = creatorPlayerMaxWin;
          myPlayerCover = claimerPlayerCover;
          theirPlayerCover = creatorPlayerCover;
          status = "Matched";
        } else {
          myPlayer = creatorPlayer;
          theirPlayer = claimerPlayer;
          myPlayerSpread = creatorPlayerSpread;
          theirPlayerSpread = claimerPlayerSpread;
          myPlayerMaxWin = creatorPlayerMaxWin;
          theirPlayerMaxWin = claimerPlayerMaxWin;
          myPlayerCover = claimerPlayerCover;
          theirPlayerCover = creatorPlayerCover;
          status = "Created";
        }

        return {
          ...contest,
          vs: "VS",
          searchNames: `${claimerPlayer.fullName} ${creatorPlayer.fullName}`,
          myPlayerSpread: `${
            Number(myPlayerSpread) > 0 ? `+${myPlayerSpread}` : myPlayerSpread
          }`,
          theirPlayerSpread: `${
            Number(theirPlayerSpread) > 0
              ? `+${theirPlayerSpread}`
              : theirPlayerSpread
          }`,
          myPlayerMaxWin: myPlayerMaxWin,
          theirPlayerMaxWin: theirPlayerMaxWin,
          claimerPlayer: {
            ...claimerPlayer,
            matchup: `${claimerPlayer?.homeOrAway === "AWAY" ? "@" : ""}${
              claimerPlayer?.opponentName
            }`,
          },
          creatorPlayer: {
            ...creatorPlayer,
            matchup: `${creatorPlayer?.homeOrAway === "AWAY" ? "@" : ""}${
              creatorPlayer?.opponentName
            }`,
          },
          myPlayer: {
            ...myPlayer,
            matchup: `${myPlayer?.homeOrAway === "AWAY" ? "@" : ""}${
              myPlayer?.opponentName
            }`,
          },
          theirPlayer: {
            ...theirPlayer,
            matchup: `${theirPlayer?.homeOrAway === "AWAY" ? "@" : ""}${
              theirPlayer?.opponentName
            }`,
          },
          myPlayerCover,
          theirPlayerCover,
          status: status,
          type: claimerId !== null ? "Active" : "Open",
        };
      }),
    [contestData]
  );

  // src="https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18055.png"

  const columns = useMemo(
    () => [
      {
        Header: "Player",
        accessor: "myPlayer.fullName",
        meta: {
          colSpan: 2,
          position: "left",
        },
        Cell: ({ row }: any) => {
          const { myPlayer } = row.original;
          return (
            <PlayerDetails
              fullName={myPlayer?.fullName}
              photoUrl={myPlayer?.photoUrl}
              position={myPlayer?.position}
              teamName={myPlayer?.teamName}
            />
          );
        },
      },
      {
        Header: "Matchup",
        accessor: "myPlayer.matchup",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { myPlayer } = row.original;
          return myPlayer.matchup === "" ||
            myPlayer.matchup === "null" ||
            myPlayer.matchup === null
            ? ""
            : myPlayer.matchup;
        },
      },
      {
        Header: "Bonus",
        accessor: "myPlayerSpread",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { myPlayerSpread } = row.original;
          return Number(myPlayerSpread) > 0 ? myPlayerSpread : 0;
        },
      },
      {
        Header: "Entry",
        accessor: "entryAmount",
        meta: {
          position: "right",
        },
        Cell: ({ row }: any) => {
          const { entryAmount } = row.original;
          return renderCurrency(c2d(entryAmount * 100) / 100);
        },
      },
      {
        Header: "",
        accessor: "vs",
        disableSortBy: true,
        meta: {
          justify: "center",
          position: "none",
        },
      },
      {
        Header: "Opponent",
        accessor: "theirPlayer.fullName",
        meta: {
          colSpan: 2,
          position: "left",
        },
        Cell: ({ row }: any) => {
          const { theirPlayer } = row.original;
          return (
            <PlayerDetails
              fullName={theirPlayer?.fullName}
              photoUrl={theirPlayer?.photoUrl}
              position={theirPlayer?.position}
              teamName={theirPlayer?.teamName}
            />
          );
        },
      },
      {
        Header: "Matchup",
        accessor: "theirPlayer.matchup",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { theirPlayer } = row.original;
          return theirPlayer.matchup === "" ||
            theirPlayer.matchup === "null" ||
            theirPlayer.matchup === null
            ? ""
            : theirPlayer.matchup;
        },
      },
      {
        Header: "Bonus",
        accessor: "theirPlayerSpread",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { theirPlayerSpread } = row.original;
          return Number(theirPlayerSpread) > 0 ? theirPlayerSpread : 0;
        },
      },
      {
        Header: "Type",
        accessor: "type",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          return (
            <Chip
              label={row?.original.type}
              color={row?.original.type === "Active" ? "secondary" : "primary"}
            />
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          return (
            <Chip
              label={row?.original.status}
              color={
                row?.original.status === "Matched" ? "secondary" : "primary"
              }
              variant="outlined"
            />
          );
        },
      },
      {
        Header: "Cancel",
        accessor: "poof",
        meta: {
          position: "right",
        },
        Cell: ({ row }: any) => {
          return (
            <Fragment>
              {row?.original.type === "Open" &&
              row?.original.status === "Created" ? (
                <Grid container className="w-full" justify="center">
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      closeContestConfirmation(row.original);
                    }}
                  >
                    <DeleteOutlineIcon className="text-gray-500 text-2xl" />
                  </IconButton>
                </Grid>
              ) : (
                ""
              )}
            </Fragment>
          );
        },
      },
    ],
    []
  );

  // @ts-ignore
  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = tableInstance;

  const [searchText, setSearchText] = useState("");

  return (
    <Hidden only={["xs", "sm"]}>
      <Fragment>
        <Grid container className={clsx("py-2 sticky top-0", classes.header)}>
          <Grid item xs={12} md={6} lg={6} container alignContent="center">
            <Typography variant="h6" className="text-gray-400">
              My Open Contests
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6} container justify="flex-end">
            <TextField
              id="outlined-basic"
              placeholder="Search My Contests"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setGlobalFilter(event.target.value || undefined);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <div
          {...getTableProps()}
          className="w-full table"
          style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
        >
          <TableHeader headerGroups={headerGroups} />
          {/* Apply the table body props */}
          <TableBody
            getTableBodyProps={getTableBodyProps}
            rows={rows}
            prepareRow={prepareRow}
            handleContestShareClick={handleContestShareClick}
          />
        </div>
      </Fragment>
    </Hidden>
  );
};

export default TableDesktop;
