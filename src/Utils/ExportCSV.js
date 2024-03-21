import React from "react";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";
import { convertToKst } from "./Utils";

function ExportCSV(props) {
  //console.log((props.data).length)
  console.log(props.data.length);
  const today = convertToKst(new Date()).fullDate
  props.data.forEach((obj) => delete obj.withdrawal);

  return (
    <>
      {props.data.length > 0 ? (
        <CSVLink filename={today} data={props.data}>
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
