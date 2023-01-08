import { makeStyles } from "@material-ui/core/styles";
import { FullscreenExitTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // contestWrapper: {
  //   border: `2px solid white`,
  //   "&:hover": {
  //     border: `2px solid ${theme.palette.primary.main}`,
  //     boxShadow:
  //       "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)",
  //   },
  //   playerHighlight: {
  //     border: "2px solid gold",
  //     borderRadius: 15
  //   },
  //   playerHighlightMobile: {
  //     color: "gold"
  //   },
  // },
  claimPlayerHighlight: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 24
  },
  versusPosition: {
    height: 50,
    width: 50,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "50%",
    boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.2)",
    
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  versusText: {
    lineHeight: "1",
    fontWeight: 700,
    fontSize: 20,
    color: "rgba(6, 78, 59, 1)",
  }
}));

export default useStyles;
