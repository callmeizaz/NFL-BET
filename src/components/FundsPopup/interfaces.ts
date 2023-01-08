export interface FundsPopUpInterface {
  open: boolean;
  handleClose: Function;
  handleConfirm: Function;
  popupData: {
    id: string;
    title: string;
    offerMessage: string;
    offerDuration: string;
  };
}
