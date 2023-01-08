import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      height: "unset !important",
      width: "250px !important",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      //   alignItems: "center",
    },
    checklistIcon: {
      width: "0.5em",
    },
    checklistIconColor: {
      width: "0.5em",
      color: "green",
    },
    spacer: {
      margin: "0.5rem 0",
    },
    Button: {
      "&:focus": {
        outline: "none !important",
      },
    },
    signUpButton: {
      padding: "8px 18px !important",
    },
    externalLink: {
      color: "#007bff",
      "&:hover": {
        "text-decoration": "underline"
      }
    },
    tos: {
      fontSize: '0.55rem',
    }
  })
);

export default useStyles;
