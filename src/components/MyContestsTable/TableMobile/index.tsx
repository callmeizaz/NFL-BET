import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";

// import TableHeader from "../TableHeader";
import TableBodyMobile from "../TableBodyMobile";

import MyContestCard from "../../MyContestCard";

import { ContestsTablePayload } from "../interfaces";

const TableDesktop = ({
  contestData,
  handleContestShareClick,
  userId,
  closeContestConfirmation,
}: ContestsTablePayload) => {
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
        Header: "",
        accessor: "searchNames",
        disableSortBy: true,
        meta: {
          position: "left",
        },
        Cell: (props: any) => {
          const contestData = props?.row?.original;
          return (
            <MyContestCard
              // @ts-ignore
              key={contestData.id}
              handleContestShareClick={handleContestShareClick}
              closeContestConfirmation={closeContestConfirmation}
              contestData={contestData}
              userId={userId}
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
    <Hidden only={["md", "lg", "xl"]}>
      <Fragment>
        <Grid container className="my=5">
          <Grid item xs={12} md={6} lg={6} container alignContent="center">
            <Typography variant="h6" className="text-gray-400">
              My Open Contests
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} container justify="flex-end">
            <TextField
              id="outlined-basic"
              placeholder="Search My Contests"
              fullWidth
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
          {/* <TableHeader headerGroups={headerGroups} /> */}
          {/* Apply the table body props */}
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
