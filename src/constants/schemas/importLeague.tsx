import * as Yup from "yup";

const importLeagueSchema = Yup.object().shape({
  league: Yup.object().required(),
  scoringType: Yup.object().required(),
  
});

export default importLeagueSchema;
