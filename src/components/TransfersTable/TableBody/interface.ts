// import { ContestsPayload } from "../interfaces";

import { WalletTransfer } from "../interfaces";

export interface IProps {
  prepareRow: Function;
  getTableBodyProps: Function;
  rows: row[];
}

interface row {
  getRowProps: Function;
  original: WalletTransfer;
  cells: {
    render: Function;
    getCellProps: Function;
    column: {
      align?: string;
      meta?: {
        justify?: "flex-start" | "flex-end" | "center";
        position: string;
      };
    };
  }[];
}
