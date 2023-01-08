import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        width: '100%',
      justifyContent: "space-between",
    },
  })
);

export default useStyles;
