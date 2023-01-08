import { ContestPayload } from "./interface";

const getWin = (
  winnerId: number | null,
  userId: number | string,
  winnerLabel: string | null
) => {
  let status = "N.A";
  if (winnerId === userId) {
    status = "Win";
  } else {
    status = "Lose";
  }

  if (winnerId === null) {
    if(winnerLabel==="unmatched"){
      status = "Unmatched";
    }else{
      status = "Draw";
    }
    
  }
  return status;
};

const modifyContest = (
  userId: string | number,
  contestData: Array<ContestPayload>
) => {
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
  const modifiedContests = sortedArray
    ?.filter((contest: any) => contest !== null)
    ?.map((contest: ContestPayload) => {
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
        winnerId,
        winnerLabel,
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
      const iAmClaimer = userId === claimerId;

      if (iAmClaimer) {
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
        status = `Matched`;
      } else {
        myDetails = creator;
        theirDetails = claimer;
        myTeam = creatorTeam;
        myContestTeam = creatorContestTeam;
        theirTeam = claimerTeam;
        theirContestTeam = claimerContestTeam;
        myTeamSpread = creatorTeamSpread;
        theirTeamSpread = claimerTeamSpread;
        myTeamMaxWin = creatorTeamMaxWin;
        theirTeamMaxWin = claimerTeamMaxWin;
        myTeamCover = claimerTeamCover;
        theirTeamCover = creatorTeamCover;
        status = `Created`;
      }

      return {
        ...contest,
        vs: "VS",
        myTeamSpread: `${Number(myTeamSpread) > 0 ? `+${myTeamSpread}` : 0}`,
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
        myTeamSpreadValue: Number(myTeamSpread),
        theirTeamSpreadValue: Number(theirTeamSpread),
        status: status,
        winLoseDraw: "",
        statusColumn: `${status} ${claimerId !== null ? "Active" : "Open"}`,
        type: claimerId !== null ? "Active" : "Open",
      };
    });
  return modifiedContests;
};

export default modifyContest;
