import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import clsx from "classnames";

import Button from "@material-ui/core/Button";
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
  handleContestClaimClick,
}: ContestsPayload) => {
  const classes = useStyles();
  const data = useMemo(
    () =>
      contestData.map((contest) => {
        const {
          claimerPlayer,
          creatorPlayer,
          claimerPlayerSpread,
          creatorPlayerSpread,
        } = contest;
        return {
          ...contest,
          vs: "VS",
          searchNames: `${claimerPlayer?.fullName} ${creatorPlayer?.fullName}`,
          claimerPlayerSpread: `${
            Number(claimerPlayerSpread) > 0
              ? `+${claimerPlayerSpread}`
              : claimerPlayerSpread
          }`,
          creatorPlayerSpread: `${
            Number(creatorPlayerSpread) > 0
              ? `+${creatorPlayerSpread}`
              : creatorPlayerSpread
          }`,
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
        };
      }),
    [contestData]
  );

  // src="https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18055.png"

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "claim",
        disableSortBy: true,
        meta: {
          position: "left",
        },
        Cell: (props: any) => {
          return (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                handleContestClaimClick(props?.row?.original);
              }}
            >
              Claim
            </Button>
          );
        },
      },
      {
        Header: "Player",
        accessor: "claimerPlayer.fullName",
        meta: {
          colSpan: 2,
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { claimerPlayer } = row.original;
          return (
            <PlayerDetails
              fullName={claimerPlayer?.fullName}
              photoUrl={claimerPlayer?.photoUrl}
              position={claimerPlayer?.position}
              teamName={claimerPlayer?.teamName}
            />
          );
        },
      },
      {
        Header: "Matchup",
        accessor: "claimerPlayer.matchup",
        meta: {
          position: "middle",
        },
      },
      {
        Header: "Bonus",
        accessor: "claimerPlayerSpread",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { claimerPlayerSpread } = row.original;
          return Number(claimerPlayerSpread) > 0 ? claimerPlayerSpread : 0;
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
          return renderCurrency(c2d(entryAmount));
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
        accessor: "creatorPlayer.fullName",
        meta: {
          colSpan: 2,
          position: "left",
        },
        Cell: ({ row }: any) => {
          const { creatorPlayer } = row.original;
          return (
            <PlayerDetails
              fullName={creatorPlayer?.fullName}
              photoUrl={creatorPlayer?.photoUrl}
              position={creatorPlayer?.position}
              teamName={creatorPlayer?.teamName}
            />
          );
        },
      },
      {
        Header: "Matchup",
        accessor: "creatorPlayer.matchup",
        meta: {
          position: "middle",
        },
      },
      {
        Header: "Bonus",
        accessor: "creatorPlayerSpread",
        meta: {
          position: "right",
        },
        Cell: ({ row }: any) => {
          const { creatorPlayerSpread } = row.original;
          return Number(creatorPlayerSpread) > 0 ? creatorPlayerSpread : 0;
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
              Select A Contest To Claim
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6} container justify="flex-end">
            <TextField
              id="outlined-basic"
              placeholder="Search Lobby"
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
          />
        </div>
      </Fragment>
    </Hidden>
  );
};

export default TableDesktop;
