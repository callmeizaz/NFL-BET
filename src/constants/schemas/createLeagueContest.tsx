import * as Yup from "yup";

const createLeagueContestCardSchema = Yup.object().shape({
  creatorTeam: Yup.object().required(),
  claimerTeam: Yup.object().required(),
  entry: Yup.object().required(),
});

export default createLeagueContestCardSchema;
