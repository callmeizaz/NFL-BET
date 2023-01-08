import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { IProps, BannerAction } from "./interfaces";

const InfoBanner = (props: IProps) => {
  const { icon, title, action } = props;

  const renderButton = (action: BannerAction) => {
    let button = null;

    if (action.callback) {
      const { callback } = action;
      button = (
        <Button
          variant="outlined"
          color="primary"
          className="mt-4"
          onClick={() => (callback ? callback() : {})}
        >
          {action.text}
        </Button>
      );
    }

    if (action.link) {
      button = (
        <Button
          variant="outlined"
          color="primary"
          className="mt-4"
          component={RouterLink}
          to={action.link}
        >
          {action.text}
        </Button>
      );
    }

    return button;
  };

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className="h-64 w-full"
    >
      <Grid item xs={12} container justify="center" className="mt-2">
        <Icon color="primary" className="text-8xl">
          {icon}
        </Icon>
      </Grid>
      <Grid
        item
        xs={11}
        sm={10}
        md={10}
        lg={9}
        xl={8}
        container
        justify="center"
        className="mt-2"
      >
        <Typography variant="h4" color="primary" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} container justify="center" className="mt-2">
        {action ? renderButton(action) : ""}
      </Grid>
    </Grid>
  );
};
export default InfoBanner;
