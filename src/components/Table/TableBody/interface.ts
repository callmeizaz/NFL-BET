export interface IProps {
  prepareRow: Function;
  getTableBodyProps: Function;
  rows: rows[];
  onClickHandler?: Function;
}

interface rows {
  getRowProps: Function;
  original: Object;
  cells: {
    render: Function;
    getCellProps: Function;
    column: {
      align?: string;
      meta?: {
        justify?: "flex-start" | "flex-end" | "center";
        position: string;
        width?: string;
      };
    };
  }[];
}
