import React from "react";
import Axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
function SubscribeList(props) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Email", headerName: "Email", width: 130 },
    { field: "Subs_date", headerName: "Subs_date", width: 130 },
  ];

  const rows = props.dataArray;

  const onCheckboxSelect = (e, value) => {
    console.log(e,value)

  }
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection 
 
      />
    </div>
  );
}

export default SubscribeList;
