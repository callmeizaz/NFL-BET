import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: "auto",
      bottom: 2,
      padding: "0.5rem",
      boxShadow: "none",
    },
    fab: {
      color: "#ffffff",
      fontWeight: 1000,
    },
    LobbyTextHeader: {
      fontWeight: 1000,
    },
    LobbyTextSubHeader: {
      color: "grey",
    },
    createAContestButton: {
      color: "#ffffff",
      fontWeight: 1000,
    },
    buttonHover: {
      backgroundColor: "transparent !important",
    }
  })
);

export default useStyles;
