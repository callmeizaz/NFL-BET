import * as Yup from "yup";

const createContestSchema = Yup.object().shape({
  player: Yup.object().required(),
  opponent: Yup.object().required(),
  entry: Yup.object(),
});

export default createContestSchema;
