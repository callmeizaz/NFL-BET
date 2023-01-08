import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  contestWrapper: {
    border: `2px solid white`,
    "&:hover": {
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow:
        "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)",
    },
  },
}));

export default useStyles;
