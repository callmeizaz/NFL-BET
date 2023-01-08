import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
        backgroundColor: theme.palette.primary.main,
        // border: "1px solid green"
    }
  })
);

export default useStyles;
