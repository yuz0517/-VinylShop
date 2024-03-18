import React from "react";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";

function ExportCSV(props) {
  //console.log((props.data).length)
  console.log(props.data.length);
  const today = new Date();
  const todayFull =
    today.getFullYear() +
    "" +
    (today.getMonth() + 1) +
    "" +
    today.getDate() +
    "" +
    (today.getHours()+''.length === 1
      ? 0 + (today.getHours() + "")
      : today.getHours()) +
    "" +
    (today.getMinutes()+''.length === 1
      ? 0 + (today.getMinutes() + "")
      : today.getMinutes()) +
    "" 

  props.data.forEach((obj) => delete obj.withdrawal);

  return (
    <>
      {props.data.length > 0 ? (
        <CSVLink filename={todayFull} data={props.data}>
          <Button>CSV download</Button>
        </CSVLink>
      ) : (
        <Button onClick={() => alert("데이터를 선택해주세요.")}>
          CSV download
        </Button>
      )}
    </>
  );
}

export default ExportCSV;
