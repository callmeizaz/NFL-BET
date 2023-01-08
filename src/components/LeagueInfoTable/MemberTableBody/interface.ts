import { LeaguePayload } from "../../../typings/interfaces/leagues";

export interface IProps {
  prepareRow: Function;
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
