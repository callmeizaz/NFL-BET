export interface IProps {
  prepareRow: Function;
  getTableBodyProps: Function;
  rows: rows[];
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
