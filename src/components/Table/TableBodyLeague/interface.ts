export interface IProps {
  prepareRow: Function;
  getTableBodyProps: Function;
  rows: rows[];
  hideHover?: boolean;
}

interface rows {
  getRowProps: Function;
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
