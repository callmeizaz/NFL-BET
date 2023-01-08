import { Fragment } from "react";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";

import { TransfersData } from "./interfaces";

const TransfersTable = ({
  data,

}: TransfersData) => {
  return (
    <Fragment>
      <TableDesktop
        data={data}
      />

      {/* Mobile view table */}
      <TableMobile
        data={data}
      />
    </Fragment>
  );
};

export default TransfersTable;
