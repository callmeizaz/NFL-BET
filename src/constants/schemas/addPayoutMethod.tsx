import * as Yup from "yup";

const addPayoutMethodSchema = Yup.object().shape({
  name: Yup.string().required(),
  accountNo: Yup.string().required(),
  routingNo: Yup.string()
    .test("len", "Must be exactly 9 characters", (val) => val?.length === 9)
    .required(),
});

export default addPayoutMethodSchema;
