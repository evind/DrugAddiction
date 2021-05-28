import React from "react";
import TableData from "./TableData";

const TableRowList = (props) => {
  let i = 0;
  const tableRows = props.results.map((row) => {
    i++;
    return (
      <tr key={row.id}>
        <td>
          {i}. {row.question}
        </td>
        <TableData name="Never" ans={row.answer} />
        <TableData name="Rarely" ans={row.answer} />
        <TableData name="Sometimes" ans={row.answer} />
        <TableData name="Fairly Often" ans={row.answer} />
        <TableData name="Often" ans={row.answer} />
        <TableData name="Almost Always" ans={row.answer} />
        <TableData name="Always" ans={row.answer} />
      </tr>
    );
  });

  return tableRows;
};

export default TableRowList;
