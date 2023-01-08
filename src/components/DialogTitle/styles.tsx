import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      // padding: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    typography: {
      textTransform: "none"
    }
  })
);

export default useStyles;
