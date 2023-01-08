import React, { Fragment, useState, createRef, FC } from "react";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { FileUploadProps } from "./interfaces";

import useStyles from "./styles";

const DEFAULT_ACCEPTABLE_FILE_TYPES = ".jpg, .jpeg, .png";

const FileUploadField = (props: FileUploadProps) => {
  const classes = useStyles();
  const {
    form: { errors, touched, setFieldValue },
    field: { name },
    label,
    defaultValue,
    disabled,
  } = props;
  const [file, setFile] = useState<undefined | { name: string } | File>(
    defaultValue ? { name: defaultValue } : undefined
  );

  const fileRef = createRef<HTMLInputElement>();
  // const isError: boolean = false;

  const renderAction = () => {
    const element = (
      <Fragment>
        {file ? (
          <Typography className={classes.fileName} align="left">
            {file.name}
          </Typography>
        ) : (
          <Typography className="text-gray-400" align="left">
            Upload File
          </Typography>
        )}

        <Box>
          <CloudUploadIcon />
        </Box>
      </Fragment>
    );
    return element;
  };

  const showFileUpload = () => {
    fileRef.current ? fileRef.current.click() : null;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // @ts-ignore: Object is possibly 'null'.;
    let file = e.target.files[0];
    if (file) {
      setFile(file);
      setFieldValue(name, file);

    }
  };

  return (
    <div className="w-full">
      <input
        accept={DEFAULT_ACCEPTABLE_FILE_TYPES}
        readOnly
        name="filename"
        className="hidden"
        onChange={(e) => {
          handleImageChange(e);
        }}
        disabled={disabled}
        ref={fileRef}
        type="file"
      />
      <TextField
        variant="outlined"
        size="small"
        className="cursor-pointer w-full"
        type="text"
        value={file ? file.name : ""}
        label={label || "Upload File"}
        error={touched.hasOwnProperty(name) && errors.hasOwnProperty(name)}
        helperText={
          touched.hasOwnProperty(name) && errors ? errors[name] : false
        }
        disabled={disabled}
        onClick={() => {
          showFileUpload();
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" className="pr-4">
              {file ? (
                <CheckCircleIcon className={disabled ? "text-green-700" : "text-green-500"} />
              ) : (
                <CloudUploadIcon className="cursor-pointer text-gray-500" />
              )}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default FileUploadField;
