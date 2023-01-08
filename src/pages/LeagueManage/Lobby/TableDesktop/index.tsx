import { useMemo, useState, Fragment } from "react";
import clsx from "clsx";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import {
  Grid,
  InputAdornment,
  Typography,
  Hidden,
  Chip,
  TextField,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { TableHeader, TableBody } from "../../../../components/Table";
import { useStyles } from "../../../../utils/table";
import TeamDetailsDesktop from "../../../../components/TeamDetailsDesktop";
import RosterDetailsDesktop from "../../../../components/RosterDetailsDesktop";

import {
  renderCurrency,
  renderText,
  renderChip,
} from "../../../../helpers/renderers";

import { c2d } from "../../../../helpers/currency";

// import { useStyles } from "../../../../../utils/table";
import modifyContest from "../modifyContest";

import { useAppSelector } from "../../../../redux/store";
import { selectUserData } from "../../../../redux/selectors/authentication";
import { selectContestsData } from "../../../../redux/selectors/leagueContests";
// import { ContestsPayload } from "../interface";
// import { number } from "card-validator";

import { IProps } from "./interfaces";

const TableDesktop = ({ handleContestClaimClick }: IProps) => {
  const classes = useStyles();
  const userData = useAppSelector(selectUserData);
  // const { id: userId } = userData;
  const contestData = useAppSelector(selectContestsData);
  const data = useMemo(() => modifyContest(contestData), [contestData]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "claim",
        disableSortBy: true,
        meta: {
          position: "left",
          justify: "center",
        },
        Cell: ({ row }: any) => {
          return (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                handleContestClaimClick(row.original);
              }}
            >
              Claim
            </Button>
          );
        },
      },
      {
        Header: "My Team",
        accessor: "claimerTeam.name",
        meta: {
          position: "middle",
          width: "w-48 lg:w-56 xl:w-72",
        },
        Cell: ({ row }: any) => {
          const { myTeam, claimerContestTeam } = row.original;
          return (
            <TeamDetailsDesktop
              ownerName={myTeam?.user?.fullName || ""}
              photoUrl={myTeam?.logoUrl || "/team/TeamIconOrange.png"}
              teamName={myTeam?.name || ""}
              players={claimerContestTeam?.contestRosters}
            />
          );
        },
      },
      // {
      //   Header: "Team",
      //   accessor: "claimerTeam.id",
      //   meta: {
      //     position: "middle",
      //     width: "w-48",
      //   },
      //   Cell: ({ row }: any) => {
      //     const { claimerContestTeam } = row.original;
      //     return (
      //       <RosterDetailsDesktop players={claimerContestTeam.contestRosters} />
      //     );
      //   },
      // },
      {
        Header: "Bonus",
        accessor: "myPlayerSpread",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { myTeamSpread } = row.original;
          return renderText(myTeamSpread);
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
          return renderText(renderCurrency(c2d(entryAmount)));
        },
      },
      {
        Header: "Win",
        accessor: "myTeamMaxWin",
        meta: {
          position: "right",
        },
        Cell: ({ row }: any) => {
          const { myTeamMaxWin } = row.original;
          return renderText(renderCurrency(c2d(myTeamMaxWin)));
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
        Header: "Opponent Team",
        accessor: "theirTeam.fullName",
        meta: {
          position: "left",
          width: "w-48 lg:w-56 xl:w-72",
        },
        Cell: ({ row }: any) => {
          const creatorContestTeam = row.original.creatorContestTeam;
          const theirTeam = row.original.theirTeam;
          return (
            <TeamDetailsDesktop
              ownerName={theirTeam?.user?.fullName || ""}
              photoUrl={theirTeam?.logoUrl || "/team/TeamIconOrange.png"}
              teamName={theirTeam?.name || ""}
              players={creatorContestTeam?.contestRosters}
            />
          );
        },
      },
      // {
      //   Header: "Team",
      //   accessor: "creatorTeam.id",
      //   meta: {
      //     position: "middle",
      //     width: "w-48",
      //   },
      //   Cell: ({ row }: any) => {
      //     const { creatorContestTeam } = row.original;
      //     return (
      //       <RosterDetailsDesktop players={creatorContestTeam.contestRosters} />
      //     );
      //   },
      // },
      {
        Header: "Bonus",
        accessor: "theirTeamSpread",
        meta: {
          position: "right",
        },
        Cell: ({ row }: any) => {
          const { theirTeamSpread } = row.original;
          return renderText(theirTeamSpread);
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
    // state,
    prepareRow,
    setGlobalFilter,
    // preGlobalFilteredRows,
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
