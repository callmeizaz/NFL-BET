import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Close } from "@material-ui/icons";
import routes from "../../constants/routes";
import { FundsPopUpInterface } from "./interfaces";
import DialogTitle from "../DialogTitle";
import { selectUserData } from "../../redux/selectors/authentication";
import { useAppSelector } from "../../redux/store";

const FundsPopUp = (props: FundsPopUpInterface) => {
  const { open, handleClose, handleConfirm, popupData } = props;
  const userData = useAppSelector(selectUserData);

  // handlers
  const handleCheckbox = (e: any) => {
    if (!e.target.checked) {
      return;
    }
    const popUpEmails = localStorage.getItem("popUpEmails") || "{}";
    const popUpEmailsObject = JSON.parse(popUpEmails);
    const userEmail = userData?.email.trim();
    popUpEmailsObject[userEmail] = popupData?.id;

    localStorage.setItem("popUpEmails", JSON.stringify(popUpEmailsObject));
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={() => handleClose(false)}
    >
      <DialogTitle onClose={() => handleClose(false)}>
        {/* Your first $50 in Contests are risk-free */}
        {popupData.title}
      </DialogTitle>

      <DialogContent>
        <Typography>
          {/* Deposit at least $50 and get $50 in risk-free contests. Double your
          money when you win. We give your entry fee back if you lose. */}
          {popupData.offerMessage}
        </Typography>
        <Typography variant="caption">
          {/* Offer valid week of deposit only. State restrictions apply. */}
          {popupData.offerDuration}
        </Typography>

        <FormControlLabel
          value="end"
          className="w-full"
          control={
            <Checkbox color="primary" size="small" onChange={handleCheckbox} />
          }
          label={
            <Typography variant="caption">
              Don't show me this message again.
            </Typography>
          }
          labelPlacement="end"
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => handleClose(false)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleConfirm()}
        >
          Add Funds
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FundsPopUp;
