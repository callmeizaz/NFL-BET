export interface IProps {
  headerGroups: headerGroup[];
  dense?: boolean;
}

interface headerGroup {
  getFooterGroupProps: Function;
  getHeaderGroupProps: Function;
  headers: {
    render: Function;
    getHeaderProps: Function;
    getSortByToggleProps: Function;
    isSorted?: boolean;
    isSortedDesc?: boolean;
    canSort?: boolean;
    meta?: {
      colSpan?: number;
      align?: string;
      position?: string;
    };
  }[];
}
