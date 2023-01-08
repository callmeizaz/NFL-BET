import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageHeight: {
      height: "80vh",
    },
    espnCard: {
      backgroundColor: "#C31010",
    },
    yahooCard: {
      backgroundColor: "#7759FF",
    },
    dialogTitleStyling: {
      fontSize: "36px",
      lineHeight: "62.62px"
    }
  })
);

export default useStyles;
