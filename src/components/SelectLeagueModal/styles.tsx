import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageHeight: {
      height: "80vh",
    },
    espnCard: {
      backgroundColor: "#C31010",
    },
    espnCardDisabled: {
      backgroundColor: "gray",
    },
    yahooCard: {
      backgroundColor: "#7759FF",
    },
    importButtons: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    externalLink: {
      // display: "block",
      // width: "130px",
      // height: "50px",
      // background: "#B69056",
      // padding: "3px",
      // textAlign: "center",
      // borderRadius: "5px",
      // fontWeight: "bold",
      // lineHeight: "25p",
      color: "#B69056",
      "&:hover": {
        "text-decoration": "underline"
      }
    }
  })
);

export default useStyles;
