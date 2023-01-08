import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackBarPosition: {
      marginRight: "90px",
    },
    pageHeight: {
      height: "80vh",
    },
    ctaText: {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "30px",
      textAlign: "center",
      fontFamily: "Alegreya Sans SC",
      color: "#000000",
    },
    rootHelp: {
      backgroundColor: "#B69056",
    },
    helpButtonActive: {
      "&:active": {
        background: "rgba(21, 18, 18, 0.34)",
        borderRadius: "3px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
      zIndex: 50,
    },
    helpHeading: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
  })
);

export default useStyles;
