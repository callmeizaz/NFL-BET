import React, { useState } from "react";
import clsx from "clsx";
import { nanoid } from "nanoid";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MuiCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DeleteIcon from "@material-ui/icons/Delete";

import { fetchLogo } from "../../helpers/cardBrands";
import ChipLogo from "../../icons/cardProviders/chip.svg";

import { FundingSourceProps } from "./interfaces";

import useStyles from "./styles";

const FundingSource = ({ fundingSource, handleDeleteCard }: FundingSourceProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    handleDeleteCard(fundingSource.id);
  };

  const logoConfig = fetchLogo('bank');

  const cardBG =
    //   card.brand === "visa"
    classes.cardBackgroundVisa
  //     : classes.cardBackgroundMaster;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={clsx("p-2")}>
      <MuiCard
        className={clsx(
          "rounded-2xl",
          "h-64",
          "px-4",
          "pb-2",
          "w-80",
          "m-auto",
          classes.cardBackground,
          cardBG,
        )}
      >
        <Box className="p-2 h-full">
          <Grid container className="h-full">
            <Grid item xs={12} container justify="space-evenly" alignItems='center'>
              <Grid item xs={6} sm={4} md={6}>
                <img
                  className="h-20"
                  src={logoConfig.logo}
                  alt="visa"
                />
              </Grid>
              <Grid
                item
                xs={6}
                container
                justify="flex-end"
                alignContent="center"
                className={clsx('deleteIcon')}
              >
                <DeleteIcon
                  className={classes.cardTextColor}
                  onClick={() => handleDelete()}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container justify="center">
              <Grid
                item
                xs={12}
                container
                justify="center"
                alignContent="flex-start"
                direction="column"
              >
                <Typography className={classes.cardTextColor} variant="h6">
                  {fundingSource.bankName}
                </Typography>
                <Typography className={classes.cardTextColor} variant="h6">
                  {fundingSource.name}
                </Typography>
              </Grid>
            </Grid>

            {/* <Grid item xs={12} container justify="center">

              <Grid item xs={12}
                justify="center"
                alignContent="center">

              </Grid>
            </Grid>
            <Grid
              className={classes.cardTextColor}
              item
              xs={12}
              container
              alignContent="center"
              spacing={1}
            >
              <Grid item xs={1} container direction="column" justify="center">
                <FiberManualRecordIcon className="text-xs" />
              </Grid>
              <Grid item xs={1} container direction="column" justify="center">
                <FiberManualRecordIcon className="text-xs" />
              </Grid>
              <Grid item xs={1} container direction="column" justify="center">
                <FiberManualRecordIcon className="text-xs" />
              </Grid>
              <Grid item xs={1} container direction="column" justify="center">
                <FiberManualRecordIcon className="text-xs" />
              </Grid>
              <Grid item xs={1} />
              <Typography className={classes.cardTextColor} variant="h6">
                {fundingSource.name}
              </Typography>
              {last4.map((digit) => {
                return (
                  <Grid
                    key={nanoid()}
                    item
                    xs={1}
                    container
                    direction="column"
                    justify="center"
                  >
                    <Typography variant="h6">{digit}</Typography>
                  </Grid>
                );
              })}
            </Grid>
            <Grid
              item
              xs={12}
              container
              justify="space-between"
              className="justify-self-end"
            >
              <Grid item xs={4} sm={3}>
                <img className="w-full" src={ChipLogo} alt="chip" />
              </Grid>
              <Grid item xs={4} container direction="column" justify="center">
                <Typography
                  align="right"
                  variant="h5"
                  className={classes.cardTextColor}
                >{`${card.exp_month}/${expYear[2]}${expYear[3]}`}</Typography>
              </Grid>
            </Grid> */}


          </Grid>
        </Box>
      </MuiCard>
    </Grid>
  );
};

export default FundingSource;
