import * as Yup from "yup";

const createCardSchema = Yup.object().shape({
  player: Yup.object().required(),
  opponent: Yup.object().required(),
  entry: Yup.object().required(),
});

export default createCardSchema;
