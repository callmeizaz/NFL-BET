import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogTitleText: {
        fontSize: "36px",
        fontWeight: 400,
        lineHeight: "62.62px",
        color: "#000000"
    },
    fantasyText: {
        fontSize: "20px",
        fontWeight: 400,
        lineHeight: "20px",
        textAlign: "center",
        color: "#000000",
        paddingTop: "4px"
    },
    pageHeight: {
        height: "80vh"
    },
    cardTextColor: {
        color: '#fff',
    },
    buttonRadius: {
      borderRadius: 36,
    },
  })
);

export default useStyles;
