export const processLeagueDropdownData = (
  type: string,
  yahooData: any,
  espnData: any
) => {
  let returnData = [];
  switch (type) {
    case "espn":
      returnData = espnData
        ?.filter((league: any) => league != null)
        ?.map((league: any) => {
          return {
            label: league.name,
            value: {
              id: league.id,
              key: league.id,
              logoURL: league.logoURL,
              teams: league.teams,
              scoringType: league.scoringType,
            },
          };
        });
      break;
    case "yahoo":
      returnData = yahooData?.map((league: any) => {
        return {
          label: league.name,
          value: {
            id: league.league_id,
            key: league.league_key,
            logoURL: league.logo_url,
            teams: league.teams,
            scoringType: league.scoring_type,
          },
        };
      });
      break;
  }

  return returnData;
};

export const processLeagueTeamsData = (type: string, teams: any) => {
  let returnData = [];
  switch (type) {
    case "espn":
      returnData = teams.map((team: any) => {
        return {
          name: team.name,
          logoURL: team?.logoURL,
        };
      });
      break;
    case "yahoo":
      returnData = teams.map((team: any) => {
        return {
          name: team.name,
          logoURL: team?.team_logos[0]?.url,
        };
      });
      break;
  }

  return returnData;
};

export const processLeagueScoringData = (
  type: string,
  yahooData: any,
  espnData: any
) => {
  let returnData = null;
  switch (type) {
    case "espn":
      returnData = {
        label: "Standard",
        value: 3,
      };
      break;
    case "yahoo":
      returnData = {
        label: "Standard",
        value: 3,
      };

      break;
  }

  return returnData;
};
