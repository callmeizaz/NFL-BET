import React from "react";
import { Route } from "react-router-dom";
import { Props } from "./interfaces";

const UnChangedRoute: React.VFC<Props> = ({
  component,
  layout: Layout,
  ...rest
}) => {
  return (
    <Route render={(props) => <Layout component={component} />} {...rest} />
  );
};

export default UnChangedRoute;
