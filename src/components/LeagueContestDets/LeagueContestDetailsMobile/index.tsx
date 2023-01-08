import { useMemo, Fragment } from "react";
import clsx from "clsx";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import { Typography, Hidden, Grid } from "@material-ui/core";

import { TableBodyLeague, TableHeaderLeague } from "../../Table";
import { useAppSelector } from "../../../redux/store";
import { selectCurrentLeague } from "../../../redux/selectors/leagues";
import {
  selectContestValues,
  selectSelectedContest,
} from "../../../redux/selectors/leagueContests";

import TeamPlayerDetails from "../TeamPlayerDetails";
import LeagueTeamDetails from "../LeagueTeamDetails";

import { League, TeamData } from "../../../typings/interfaces/leagues";
import { SCORING_TYPE } from "../../../constants/scoringType";

const LeagueContestDetailsMobile = ({
  myTeamId,
  opponentTeamId,
  myTeam,
  opponentTeam,
  myTeamPlayers,
  opponentTeamPlayers,
  myBonusPoints,
  opponentBonusPoints,
  myTeamPoints,
  opponentTeamPoints,
}: {
  myTeamId: number;
  opponentTeamId: number;
  myTeam?: TeamData | null;
  opponentTeam?: TeamData | null;
  myTeamPlayers?: object;
  opponentTeamPlayers?: object;
  myBonusPoints?: number;
  opponentBonusPoints?: number;
  myTeamPoints?: number;
  opponentTeamPoints?: number;
}) => {
  const CellText = (text: string | number, className: string) => (
    <Typography variant="body1" className={className}>
      {text}
    </Typography>
  );

  const currentLeague = useAppSelector(selectCurrentLeague);
  const leagueScoringType = currentLeague ? currentLeague.scoringTypeId: SCORING_TYPE.NOPPR;

  const columns = useMemo(
    () => [
      {
        Header: "Slot",
        accessor: "",
        meta: {
          position: "middleLeague",
        },
        Cell: ({ row }: any) => {
          const { player, playerFantasyPoints, finishedFlag } = row.original;
          let isGray = "";
          if (finishedFlag) {
            isGray = "";
          } else {
            isGray = player.isOver ? "text-gray-400" : "";
          }
          return CellText(player?.position, clsx(isGray, "text-xs"));
        },
      },
      {
        Header: "Player",
        accessor: "",
        meta: {
          colSpan: 3,
          position: "middleLeague",
        },
        Cell: ({ row }: any) => {
          const { player, playerFantasyPoints, finishedFlag } = row.original;
          let isGray = false;
          if (finishedFlag) {
            isGray = false;
          } else {
            isGray = player.isOver;
          }
          return (
            <TeamPlayerDetails
              // url={player?.photoUrl}
              name={player?.fullName}
              isOver={isGray}
              dense={true}
            />
          );
        },
      },
      {
        Header: "Points",
        accessor: "",
        meta: {
          position: "middleLeague",
        },
        Cell: ({ row }: any) => {
          const { player, playerFantasyPoints, finishedFlag } = row.original;
          let pointsValue = "";
          let isGray = "";
          if (finishedFlag) {
            pointsValue = Number(playerFantasyPoints).toString();
            isGray = "";
          } else {
            if(player?.isOver) {
              if(leagueScoringType === SCORING_TYPE.NOPPR) {
                pointsValue = player?.fantasyPoints;
              }
              if(leagueScoringType === SCORING_TYPE.HALFPPR) {
                pointsValue = player?.fantasyPointsHalfPpr;
              }
              if(leagueScoringType === SCORING_TYPE.FULLPPR) {
                pointsValue = player?.fantasyPointsFullPpr;
              }
            } else {
              pointsValue = "";
            }
            isGray = player.isOver ? "text-gray-400" : "";
          }
          return CellText(pointsValue, isGray);
        },
      },
    ],
    []
  );

  // @ts-ignore
  const myTableInstance = useTable(
    // @ts-ignore
    { columns, data: myTeamPlayers || [] },
    useGlobalFilter,
    useSortBy
  );

  // @ts-ignore
  const opponentTableInstance = useTable(
    // @ts-ignore
    { columns, data: opponentTeamPlayers || [] },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps: myTableProps,
    getTableBodyProps: myTableBodyProps,
    headerGroups: myHeaderGroups,
    rows: myRows,
    // state,
    prepareRow: prepareMyRow,
    // setGlobalFilter,
    // preGlobalFilteredRows,
  } = myTableInstance;

  const {
    getTableProps: opponentTableProps,
    getTableBodyProps: opponentTableBodyProps,
    headerGroups: opponentHeaderGroups,
    rows: opponentRows,
    // state,
    prepareRow: prepareOpponentRow,
    // setGlobalFilter,
    // preGlobalFilteredRows,
  } = opponentTableInstance;

  return (
    <Hidden only={["md", "lg", "xl"]}>
      <Fragment>
        <div className="mb-4 flex items-stretch relative">
          <Typography
            align="center"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 border-2  rounded-full border-green-800 h-8 w-8"
          >
            VS
          </Typography>
          <div className="w-1/2 pr-6">
            <Typography
              variant="h5"
              align="center"
              className="mb-2"
              style={{
                color: "rgba(182, 144, 86, 1)",
              }}
            >
              Your Team
            </Typography>
            <LeagueTeamDetails
              url={myTeam?.logoUrl || ""}
              teamName={myTeam?.name || ""}
              ownerName={myTeam?.user?.fullName || ""}
              teamPoints={myTeamPoints || 0}
              bonusPoints={myBonusPoints || 0}
              type="myTeam"
            />
          </div>
          <div className="w-1/2 pl-6">
            <Typography variant="h5" align="center" className="mb-2">
              Opponent
            </Typography>
            <LeagueTeamDetails
              url={opponentTeam?.logoUrl || ""}
              teamName={opponentTeam?.name || ""}
              ownerName={opponentTeam?.user?.fullName || ""}
              teamPoints={opponentTeamPoints || 0}
              bonusPoints={opponentBonusPoints || 0}
              type="theirTeam"
            />
          </div>
        </div>

        <div className="flex -mx-4">
          <div
            className="w-1/2 relative pb-12"
            style={{ border: "1px solid #cecece" }}
          >
            <TableHeaderLeague headerGroups={myHeaderGroups} dense />
            <div className="h-auto">
              <div {...myTableProps()} className="w-full table">
                <TableBodyLeague
                  getTableBodyProps={myTableBodyProps}
                  rows={myRows}
                  prepareRow={prepareMyRow}
                />
              </div>
              <Grid
                container
                justify="space-between"
                className="absolute bottom-0 p-2"
              >
                <Typography variant="h6" color="secondary">
                  Bonus Points
                </Typography>
                <Typography variant="h6" color="secondary">
                  {myBonusPoints
                    ? myBonusPoints > 0
                      ? `+${myBonusPoints}`
                      : ""
                    : "0"}
                </Typography>
              </Grid>
            </div>
          </div>
          <div
            className="w-1/2 relative pb-12"
            style={{ border: "1px solid #cecece" }}
          >
            <TableHeaderLeague headerGroups={opponentHeaderGroups} dense />
            <div className="h-auto">
              <div {...opponentTableProps()} className="w-full table">
                <TableBodyLeague
                  getTableBodyProps={opponentTableBodyProps}
                  rows={opponentRows}
                  prepareRow={prepareOpponentRow}
                />
              </div>
              <Grid
                container
                justify="space-between"
                className="absolute bottom-0 p-2"
              >
                <Typography variant="h6" color="secondary">
                  Bonus Points
                </Typography>
                <Typography variant="h6" color="secondary">
                  {opponentBonusPoints
                    ? opponentBonusPoints > 0
                      ? `+${opponentBonusPoints}`
                      : ""
                    : "0"}
                </Typography>
              </Grid>
            </div>
          </div>
        </div>
      </Fragment>
    </Hidden>
  );
};

export default LeagueContestDetailsMobile;
