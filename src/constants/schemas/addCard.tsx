import * as Yup from "yup";
var validCard = require("card-validator");

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString()
}

const addCardSchema = Yup.object().shape({
  cardName: Yup.string().required(),
  cardNo: Yup
      .string()
      .test('test-number',
          'Card number is invalid',
          value => validCard.number(value).isValid)
      .required(),
  cardExpiry: Yup.date().min(
      Yup.ref('originalEndDate'),
      ({ min }) => `Date needs to be before ${formatDate(min)}!!`,
  ),
  cardCvc: Yup.string().
  test("len", "Must be exactly 3 characters", (val) => val?.length === 3)
      .required(),
});

export default addCardSchema;
