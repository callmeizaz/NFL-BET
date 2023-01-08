import moment from "moment";

const renderCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const dateRender = (value: string) => {
  return moment(value).format("MM/DD/YYYY");
};
const dateTimeRender = (value: string) => {
  return moment(value).format("MM/DD/YYYY @ hh:mm a");
};

const d2c = (value: string | number) => {
  return Number(value) * 100;
};

const c2d = (value: string | number) => {
  return Number(value) / 100;
};

export { renderCurrency, dateRender, dateTimeRender, d2c, c2d };
