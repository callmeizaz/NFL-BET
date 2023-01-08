import React from "react";
import moment from "moment";

import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const renderCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const renderDate = (value: string) => {
  return moment(value).format("MM/DD/YYYY");
};

const renderChip = (text: string) => {
  return <Chip label={text} color="secondary" />;
};

const renderText = (text: string | number, className?: string) => (
  <Typography variant="body1" className={className || ""}>
    {text}
  </Typography>
);

export { renderCurrency, renderDate, renderText, renderChip };
