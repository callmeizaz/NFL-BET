import React, { Fragment, useEffect } from "react";
import { useFormikContext } from "formik";

import { IProps } from "./interfaces";

const FormikAsyncFieldHandler = (props: IProps) => {
  const { setFieldValue } = useFormikContext();
  const { name, newValue } = props;

  useEffect(() => {
    setFieldValue(name, newValue);
  }, [setFieldValue, name, newValue]);

  return <Fragment />;
};
export default FormikAsyncFieldHandler;
