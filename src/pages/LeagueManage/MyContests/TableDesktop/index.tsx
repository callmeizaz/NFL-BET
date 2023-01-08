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

import { renderCurrency, renderText } from "../../../../helpers/renderers";

// import { useStyles } from "../../../../../utils/table";
import modifyContest from "../modifyContest";

import { useAppSelector } from "../../../../redux/store";
import { selectUserData } from "../../../../redux/selectors/authentication";
import { selectMyContestsData } from "../../../../redux/selectors/leagueContests";

import { c2d } from "../../../../helpers/currency";
// import { ContestsPayload } from "../interface";
// import { number } from "card-validator";

const TableDesktop = ({
  handleContestShareClick,
}: {
  handleContestShareClick: Function;
}) => {
  const classes = useStyles();
  const userData = useAppSelector(selectUserData);
  const userId = userData?.id;
  const contestData = useAppSelector(selectMyContestsData);

  const data = useMemo(() => modifyContest(userId, contestData), [contestData]);

  const CellText = (text: string | number) => (
    <Typography variant="body1">{text}</Typography>
  );

  const columns = useMemo(
    () => [
      {
        Header: "My Team",
        accessor: "claimerTeam.name",
        meta: {
          position: "left",
          width: "w-48 lg:w-56 xl:w-72",
        },
        Cell: ({ row }: any) => {
          const { myTeam, myDetails, myContestTeam } = row.original;
          return (
            <TeamDetailsDesktop
              ownerName={myDetails?.fullName || ""}
              photoUrl={myTeam?.logoUrl || "/team/TeamIconOrange.png"}
              teamName={myTeam?.name || ""}
              players={myContestTeam?.contestRosters}
            />
          );
        },
      },
      // {
      //   Header: "Team",
      //   accessor: "claimerTeam.id",
      //   meta: {
      //     position: "middle",
      //     width:"w-48"
      //   },
      //   Cell: ({ row }: any) => {
      //     const { myContestTeam } = row.original;
      //     return (
      //       <RosterDetailsDesktop players={myContestTeam.contestRosters} />
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
        Header: "Entry Amount",
        accessor: "entryAmount",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { entryAmount } = row.original;
          return CellText(renderCurrency(c2d(entryAmount)));
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
          return CellText(renderCurrency(c2d(myTeamMaxWin)));
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
          const { theirTeam, theirDetails, theirContestTeam } = row.original;
          return (
            <TeamDetailsDesktop
              ownerName={theirDetails?.fullName || ""}
              photoUrl={theirTeam?.logoUrl || "/team/TeamIconOrange.png"}
              teamName={theirTeam?.name || ""}
              players={theirContestTeam?.contestRosters}
            />
          );
        },
      },

      {
        Header: "Bonus",
        accessor: "theirTeamSpread",
        meta: {
          position: "middle",
        },
        Cell: ({ row }: any) => {
          const { theirTeamSpread } = row.original;
          return renderText(theirTeamSpread);
        },
      },
      {
        Header: "Status",
        accessor: "statusColumn",
        meta: {
          position: "right",
        },
        Cell: ({ row }: any) => {
          return (
            <Fragment>
              <Chip
                label={row?.original.status}
                className="w-full mb-2"
                color={
                  row?.original.status === "Matched" ? "secondary" : "primary"
                }
                variant="outlined"
              />
              <Chip
                label={row?.original.type}
                className="w-full mb-2"
                color={
                  row?.original.type === "Active" ? "secondary" : "primary"
                }
              />
              {/* {!row.original.claimerId ? (
                <Button
                  variant="contained"
                  className="rounded-2xl"
                  fullWidth
                  color="primary"
                  onClick={() => console.log("Cancel contest")}
                >
                  Cancel
                </Button>
              ) : (
                ""
              )} */}
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
            onClickHandler={handleContestShareClick}
          />
        </div>
      </Fragment>
    </Hidden>
  );
};

export default TableDesktop;
