import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { borderRadius } from "react-select/src/theme";

const useStyles = makeStyles((theme) => ({
  checkBox:  { checkedColor: 'grey' },
  bonusPoints: {
    backgroundColor: "green",
    borderRadius: "5px",
    color: "white",
    fontSize: "12px",
    whiteSpace: "nowrap",
    padding: "2px",
    overflow: "none"
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 150,
    width: '100%',
  },
}));

export default useStyles;
