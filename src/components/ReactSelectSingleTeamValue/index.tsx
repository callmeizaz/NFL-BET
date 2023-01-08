import React from "react";

import { components } from "react-select";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

// import { OptionProps } from "./interfaces";

const ReactSelectSingleTeamValue = (props: any) => {
  const { isDisabled, data } = props;
  return !isDisabled ? (
    <components.SingleValue {...props}>
      <Box className="w-full">
        <Grid container justify="flex-start" alignContent="center">
          <Grid item xs={1} sm={1} md={1}>
            <Avatar
              className="h-7 w-7 bg-gray-200"
              alt={data.label}
              src={data.value.logoUrl}
            />
          </Grid>

          <Grid item xs={11} sm={11} md={11} container justify="space-between">
            <Grid
              item
              xs
              container
              direction="column"
              justify="center"
              className="pl-2"
            >
              <Typography className="font-bold">{data.label}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </components.SingleValue>
  ) : null;
};
export default ReactSelectSingleTeamValue;
