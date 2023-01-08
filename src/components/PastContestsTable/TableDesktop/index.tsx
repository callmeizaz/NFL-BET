import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import moment from "moment";
import clsx from "classnames";

import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";

import TableHeader from "../TableHeader";
import TableBody from "../TableBody";

import PlayerDetails from "../../PlayerDetails";

import { ContestsPayload } from "../interfaces";

import { renderCurrency, c2d } from "../../../helpers/currency";

import { useStyles } from "../../../utils/table";

const TableDesktop = ({
  contestData,
  handleContestShareClick,
  userId,
}: ContestsPayload) => {
  const classes = useStyles();
  const getWin = (winnerId: number | null, userId: number) => {
    let status = "N.A";
    if (winnerId === userId) {
      status = "Win";
    } else {
      status = "Lose";
    }

    if (winnerId === null) {
      status = "Draw";
    }
    return status;
  };

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
          creatorWinAmount,
          claimerWinAmount,
          claimerId,
          winnerId,
        } = contest;
        let myPlayer = null;
        let theirPlayer = null;
        let myPlayerSpread = null;
        let theirPlayerSpread = null;
        let myPlayerMaxWin = null;
        let theirPlayerMaxWin = null;
        let myPlayerCover = null;
        let theirPlayerCover = null;
        let myPlayerWinAmount = null;
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
          myPlayerWinAmount = claimerWinAmount;
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
          myPlayerWinAmount = creatorWinAmount;
          status = "Created";
        }

        return {
          ...contest,
          vs: "VS",
          searchNames: `${claimerPlayer?.fullName} ${creatorPlayer?.fullName}`,
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
          winLoseDraw: getWin(winnerId, userId),
          myPlayerWinAmount,
        };
      }),
    [contestData]
  );

  // src="https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18055.png"

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "endedAt",
        meta: {
          position: "left",
        },
        Cell: ({ row }: any) => {
          const { endedAt, winLoseDraw } = row.original;
          let color = "";
          switch (winLoseDraw) {
            case "Win":
              color = "border-l-8 pl-4 rounded border-green-500";
              break;
            case "Lose":
              color = "border-l-8 pl-4 rounded border-red-500";
              break;
            default:
              color = "border-l-8 pl-4 rounded border-gray-400";
              break;
          }
          return (
            <Grid
              container
              className={clsx("w-full h-full", color)}
              alignContent="center"
            >
              {moment(endedAt).format("MM/DD/YYYY")}
            </Grid>
          );
        },
      },
      {
        Header: "Player",
        accessor: "myPlayer.fullName",
        meta: {
          colSpan: 2,
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { myPlayer, winLoseDraw } = row.original;
          return (
            <PlayerDetails
              fullName={myPlayer?.fullName}
              photoUrl={myPlayer?.photoUrl}
              position={myPlayer?.position}
              teamName={myPlayer?.teamName}
              winLoseDraw={winLoseDraw}
            />
          );
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
          return myPlayerSpread > 0 ? myPlayerSpread : 0;
        },
      },
      {
        Header: "Entry",
        accessor: "entryAmount",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { entryAmount } = row.original;
          return renderCurrency(c2d(entryAmount));
        },
      },
      {
        Header: "Win",
        accessor: "myPlayerMaxWIn",
        meta: {
          position: "right",
        },
        Cell: ({ row }: any) => {
          const { myPlayerMaxWin } = row.original;
          return renderCurrency(c2d(myPlayerMaxWin));
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
        Header: "Win/Lose/Draw",
        accessor: "winLoseDraw",
        meta: {
          position: "middle",
        },
      },
      {
        Header: "Net",
        accessor: "myPlayerWinAmount",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { myPlayerWinAmount } = row.original;
          return renderCurrency(c2d(myPlayerWinAmount));
        },
      },
      {
        Header: "Status",
        accessor: "status",
        meta: {
          position: "right",
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
              My Past Contests
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6} container justify="flex-end">
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Search Past Contests"
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
