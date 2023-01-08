import React, { useState } from "react";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useFormikContext } from "formik";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MuiCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import DeleteIcon from "@material-ui/icons/Delete";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import { fetchLogo } from "../../helpers/cardBrands";
import ChipLogo from "../../icons/cardProviders/chip.svg";

import { FundingSourceProps } from "./interfaces";

import useStyles from "./styles";
import { selectUserInfoData } from "../../redux/selectors/users";
import { useAppSelector } from "../../redux/store";

const SelectionFundingSource = ({
  fundingSource,
  selectedFundingSource,
  handleDeleteCard,
}: FundingSourceProps) => {
  const { setFieldValue } = useFormikContext();
  const classes = useStyles();
  const { id, bankName, name, bankAccountType } = fundingSource;

  const userInfoData = useAppSelector(selectUserInfoData);

  const logoConfig = fetchLogo("bank");
  // const last4 = card.last4.split("");
  // const expYear = card.exp_year.toString().split("");

  const cardBG =
    /* card.brand === "visa"
      ? classes.cardBackgroundVisa
      : */ classes.cardBackgroundVisa;

  const handleDelete = () => {
    handleDeleteCard(fundingSource.id);
  };

  return (
    <Grid className={classes.flexContainer} item xs={6} sm={6} md={4} lg={2}>
      <MuiCard
        className={clsx(
          "rounded-2xl",
          "h-64",
          "px-4",
          "pb-2",
          "w-80",
          cardBG,
          classes.cardRadius,
          selectedFundingSource?.id === fundingSource.id
            ? classes.cardBackgroundActive
            : classes.cardBackgroundInactive
        )}
      >
        <Box className="p-2 h-full">
          <Grid container className="h-full">
            <Grid item xs={12} container justify="space-between">
              <Grid item xs={6} sm={4} md={6}>
                <img
                  className={clsx("h-20", classes.logoColor)}
                  src={logoConfig.logo}
                  alt={bankName}
                />
              </Grid>
              <Grid item xs={3} container justify="flex-end">
                <Radio
                  checked={
                    selectedFundingSource
                      ? selectedFundingSource.id === fundingSource.id
                      : false
                  }
                  onChange={() => {
                    setFieldValue("fundingSourceDetails", fundingSource);
                  }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                container
                justify="flex-end"
                alignContent="center"
                className={clsx("deleteIcon")}
              >
                <DeleteIcon
                  className={classes.cardTextColor}
                  onClick={() => handleDelete()}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography className={"text-white"} variant="h6">
                {bankName}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              container
              justify="space-between"
              className="justify-self-end"
            >
              {/* <Grid item xs={4} sm={3}>
                <img className="w-full" src={ChipLogo} alt="chip" />
              </Grid> */}
              <Grid item xs={12} container direction="column" justify="center">
                <Typography align="left" variant="h5" className={"text-white"}>
                  {name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </MuiCard>
    </Grid>
  );
};

export default SelectionFundingSource;
