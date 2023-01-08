import { LeagueContest } from "../../../typings/interfaces/leagueContests";

const modifyContest = (contestData: Array<LeagueContest>) => {
  if (!contestData) return [];
  const sortedArray = contestData;

  sortedArray?.slice().sort((a: any, b: any) => {
    const aTotal =
      Number(a.claimerTeamProjFantasyPoints) +
      Number(a.creatorTeamFantasyPoints);
    const bTotal =
      Number(b.claimerTeamProjFantasyPoints) +
      Number(b.creatorTeamFantasyPoints);
    return bTotal - aTotal;
  });
  const modifiedContests = sortedArray.map((contest: LeagueContest) => {
    const {
      claimer,
      creator,
      claimerTeam,
      claimerContestTeam,
      creatorTeam,
      creatorContestTeam,
      claimerTeamSpread,
      creatorTeamSpread,
      creatorTeamMaxWin,
      claimerTeamMaxWin,
      claimerTeamCover,
      creatorTeamCover,
      claimerId,
    } = contest;
    let myDetails = null;
    let theirDetails = null;
    let myTeam = null;
    let myContestTeam = null;
    let theirTeam = null;
    let theirContestTeam = null;
    let myTeamSpread = null;
    let theirTeamSpread = null;
    let myTeamMaxWin = null;
    let theirTeamMaxWin = null;
    let myTeamCover = null;
    let theirTeamCover = null;
    let status = null;

    myDetails = claimer;
    theirDetails = creator;
    myTeam = claimerTeam;
    myContestTeam = claimerContestTeam;
    theirTeam = creatorTeam;
    theirContestTeam = creatorContestTeam;
    myTeamSpread = claimerTeamSpread;
    theirTeamSpread = creatorTeamSpread;
    myTeamMaxWin = claimerTeamMaxWin;
    theirTeamMaxWin = creatorTeamMaxWin;
    myTeamCover = claimerTeamCover;
    theirTeamCover = creatorTeamCover;

    return {
      ...contest,
      searchNames:`${creatorTeam.name} ${claimerTeam.name} ${creator?.fullName}  ${claimer?.fullName}`,
      vs: "VS",
      myTeamSpread: `${
        Number(myTeamSpread) > 0 ? `+${myTeamSpread}` : 0
      }`,
      theirTeamSpread: `${
        Number(theirTeamSpread) > 0 ? `+${theirTeamSpread}` : 0
      }`,
      myDetails,
      theirDetails,
      myTeam,
      myContestTeam,
      theirTeam,
      theirContestTeam,
      myTeamMaxWin: myTeamMaxWin,
      theirTeamMaxWin: theirTeamMaxWin,
      myTeamCover,
      theirTeamCover,
      status: status,
      winLoseDraw: "",
      type: claimerId !== null ? "Active" : "Open",
    };
  });
  return modifiedContests;
};

export default modifyContest;
