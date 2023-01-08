import React from "react";
import Typography from "@material-ui/core/Typography";

import { IProps } from "./interfaces";

const DummyComponent = (props: IProps) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Dummy
    </Typography>
  );
};
export default DummyComponent;
