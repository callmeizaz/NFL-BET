import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import { Props } from "./interfaces";

const BaseLayout: React.VFC<Props> = ({ component: Component, ...rest }) => (
  <Fragment>
    <div>
      <Component {...rest} />
    </div>
  </Fragment>
);

export default BaseLayout;
