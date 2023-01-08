import React, { Fragment } from "react";
import { useSnackbar } from "notistack";
import { axiosInstance } from "../../services/api";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import { ProviderProps } from "./interfaces";

const CustomSnackbarProvider = (props: ProviderProps) => {
  const { enqueueSnackbar } = useSnackbar();

  axiosInstance.interceptors.response.use(undefined, (error) => {
    const message = error.response.data.error.message;
    enqueueSnackbar(message, {
      variant: "default",
      preventDuplicate: true,
    });

    return Promise.reject(error);
  });

  return (
    <Fragment>
      <div>{props.children}</div>
    </Fragment>
  );
};

export default CustomSnackbarProvider;
