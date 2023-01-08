import TEAMS from "../constants/teams";
// B69056
const generateGradientString = (
  makeOpponent: boolean,
  topPlayerTeam: string,
  team: string
) => {
  // @ts-ignore
  const teamColor = TEAMS[team]?.PrimaryColor || "B69056";
  // @ts-ignore
  const topPlayerTeamColor = TEAMS[topPlayerTeam]?.PrimaryColor || "B69056";

  let string = "";
  if (makeOpponent) {
    string = `linear-gradient(to right,#${teamColor},#${teamColor},#${teamColor},#${topPlayerTeamColor}`;
  } else {
    string = `linear-gradient(to right,#${topPlayerTeamColor},#${teamColor},#${teamColor},#${teamColor}`;
  }
  return string;
};

const roundValue = (value: number, step: number) => {
  step || (step = 1.0);
  const inv = 1.0 / step;
  let total = 0;
  if (value < 0) {
    total = Math.floor(value * inv) / inv;
  } else {
    total = Math.ceil(value * inv) / inv;
  }
  return total;
};

export { generateGradientString, roundValue };
