import * as Yup from "yup";

const createSupportTicket = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  message: Yup.string().required(),
});

export default createSupportTicket;
