import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import { AddFundsPromptInterface } from "./interfaces";

import DialogTitle from "../DialogTitle";

const AddFundsPrompt = (props: AddFundsPromptInterface) => {
  const { open, handleClose, handleConfirm } = props;
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={() => handleClose(false)}
    >
      <DialogTitle onClose={() => handleClose(false)}>
        Verify Account
      </DialogTitle>
      <DialogContent>
        <Typography>
          Your account is unverified. Please verify your account to add funds
        </Typography>
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
          Verify Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFundsPrompt;
