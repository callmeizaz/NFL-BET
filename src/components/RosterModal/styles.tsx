import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    supportBoxTitleContainer: {
        padding: "0.5rem 0.5rem 0 0.5rem ",
      },
    supportBoxContentContainer: {
      padding: "0 1.5rem 1.5rem 1.5rem",
    },
    supportBoxActionContainer: {
        padding: "1rem",
      },
  })
);

export default useStyles;
