import React, { useEffect, useState } from "react";
import Axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
function SubscribeList(props) {
  useEffect(() => {
    setData(props.dataArray);
  }, [props.dataArray]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Email", headerName: "Email", width: 130 },
    { field: "Subs_date", headerName: "Subs_date", width: 130 },
  ];
  const [Data, setData] = useState([]);
  const [checkArray, setCheckArray] = useState([]);
  const [nowSelectedUser, nowSetSelectedUser] = useState();
  const rows = Data;

  const onCellClick = (e, value) => {
    if (e.field === "__check__" && e.formattedValue === "no") {
      //체크
      setCheckArray((prev) => [...prev, e.row.id]);
      nowSetSelectedUser(e.row);
    } else if (e.field === "__check__" && e.formattedValue === "yes") {
      //체크해제
      setCheckArray(checkArray.filter((user) => user != nowSelectedUser.id));
    }
    console.log(checkArray);
    console.log(e);
  };

  const onRowClick = (e, value) => {
    console.log("onRowClick", e, value);
  };
  const onColumnHeaderClick = (e, value) => {
    console.log("onColumnHeaderClick", e, value);
  };

  const onDeleteClick = () => {
    console.log("delete click");

    Axios.delete("http://localhost:8000/api/admin/subscribe/delete", {
      data: { id: checkArray },
    })
      .then((res) => {
        console.log("삭제 완료", res);
        alert("삭제가 완료되었습니다.");
        setData(
          Data.filter((user) => user != res.data.key.includes(checkArray))
        );
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
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
        onCellClick={(e, value) => onCellClick(e, value)}
        onRowClick={(e, value) => onRowClick(e, value)}
        onColumnHeaderClick={(e, value) => onColumnHeaderClick(e, value)}
      />
      <Button variant="outlined" onClick={(e) => onDeleteClick(e)}>
        삭제
      </Button>
    </div>
  );
}

export default SubscribeList;
