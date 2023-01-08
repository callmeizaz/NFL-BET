import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadButtons: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);

export default useStyles;
