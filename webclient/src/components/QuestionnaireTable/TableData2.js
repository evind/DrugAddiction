import React from "react";
import { getLabel } from "../../Utils";

const tdStyle = {
  textAlign: "center",
};

const TableData = ({ name, ans }) => {
  return (
    <td style={tdStyle} className="tData">
      {getLabel(name, ans)}
    </td>
  );
};

export default TableData;
