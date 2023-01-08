export interface ConfirmationDialogProps {
  open: boolean;
  handleClose: Function;
  handleConfirm: Function;
  titleText: string;
  descriptionText: string;
  agreeText?: string;
  disagreeText?: string;
}
