import React from "react";

import { components } from "react-select";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

// import { OptionProps } from "./interfaces";

const ReactSelectPlayerOption = (props: any) => {
  const { isDisabled, data } = props;
  return !isDisabled ? (
    <components.Option {...props}>
      <Box p={1} className="cursor-pointer">
        <Grid container alignContent="center">
          <Grid item xs={2} sm={1} md={1}>
            <Avatar
              variant="square"
              className="rounded-lg"
              alt={data.label}
              src={data.value.photoUrl}
            />
          </Grid>

          <Grid item xs={10} sm={11} md={11} container justify="space-between">
            <Grid
              item
              xs
              container
              direction="column"
              justify="center"
              className="pl-2"
            >
              <Typography className="font-bold">{data.label}</Typography>
              <Typography color="textSecondary" variant="subtitle2">{`${
                data.value.position
              } | ${data.value.teamName}`}</Typography>
            </Grid>
            <Grid
              item
              xs
              container
              direction="column"
              alignContent="flex-end"
              justify="center"
            >
              <Typography
                color="textSecondary"
                variant="subtitle1"
                align="right"
              >
                {`${data.value.homeOrAway === "AWAY" ? "@ " : ""}
                  ${
                    data.value.opponentName ? data.value.opponentName : ""
                  }`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </components.Option>
  ) : null;
};
export default ReactSelectPlayerOption;
