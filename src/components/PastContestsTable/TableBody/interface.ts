import { ContestsPayload } from "../interfaces";

export interface IProps {
  prepareRow: Function;
  handleContestShareClick: Function;
  getTableBodyProps: Function;
  rows: row[];
}

interface row {
  getRowProps: Function;
  original: any;
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
