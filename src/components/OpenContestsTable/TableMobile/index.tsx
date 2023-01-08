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

import ContestCard from "../../ContestCard";

import { ContestsPayload } from "../interfaces";

const TableDesktop = ({
  contestData,
  handleContestClaimClick,
}: ContestsPayload) => {
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
        accessor: "searchNames",
        disableSortBy: true,
        meta: {
          position: "left",
        },
        Cell: (props: any) => {
          const contestData = props?.row?.original;
          return (
            <ContestCard
              // @ts-ignore
              key={contestData.id}
              contestData={contestData}
              handleContestClaimClick={handleContestClaimClick}
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
              Select A Contest To Claim
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} container justify="flex-end">
            <TextField
              id="outlined-basic"
              placeholder="Search Lobby"
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
