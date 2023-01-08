export interface ImportLeagueForm {
  league: {
    label: string;
    value: {
      key: string;
      teams: any[];
    };
  } | null;
  scoringType: {
    label: string;
    value: number;
  } | null;
}
