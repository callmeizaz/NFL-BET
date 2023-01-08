export interface SupportModalProps {
  open: boolean;
  handleClose: Function;
}

export interface SupportForm {
  name: string;
  email: string;
  message: string;
}

export interface SupportTicketPaylod {
  message: string;
  userId: number;
}
