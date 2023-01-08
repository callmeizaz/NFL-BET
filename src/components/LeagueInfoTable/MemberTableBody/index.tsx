import clsx from "clsx";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import { cardConfig, textAlignment, useStyles } from "../../../utils/table";

import { IProps } from "./interface";

// import useStyles from "./styles";

const MemberTableBody = (props: IProps) => {
  const classes = useStyles();
  const { getTableBodyProps, rows, prepareRow } = props;

  return (
    <Card className="table-row-group rounded-lg pb-16" {...getTableBodyProps()}>
      {
        // Loop over the table rows
        rows.map((row, index) => {
          const contestData = row?.original;
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <div
              className={clsx("table-row")}
              {...row.getRowProps()}
            >
              {
                // Loop over the rows cells
                row.cells.map((cell) => {
                  // Apply the cell props
                  return (
                    <div
                      className={clsx("table-cell")}
                      {...cell.getCellProps()}
                      // @ts-ignore
                    >
                      <div>
                        <Grid
                          // elevation={0}
                          container
                          justify={cell.column?.meta?.justify || "flex-start"}
                          alignContent="center"
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </Grid>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          );
        })
      }
    </Card>
  );
};

export default MemberTableBody;
