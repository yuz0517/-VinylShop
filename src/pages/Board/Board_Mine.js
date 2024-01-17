import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import Axios from "axios";
import List from "../Board/Board_List/List";
import {
  Div_all,
  Div_all_table,
  Font_bold,
  Font13px_darkgray,
  ColumnCenter,
} from "../../styled-component/style";
function Board_Mine() {
  let navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  //const location = useLocation();
  //const [currentPath, setCurrentPath] = useState('');

  //setCurrentPath(location.pathname);
  let key = sessionStorage.key(0);
  console.log(key);

  let [dbdata, set_dbdata] = useState([]);

  //let key = '테스트'; //검색 키워드
  useEffect(() => {
    console.log("실행됨");

    Axios.get("http://localhost:8000/api/boardsearch/mine", {
      params: { key: key },
    })
      .then((res) => {
        set_dbdata([...dbdata, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Div_all_table>
      <ColumnCenter>
        <Font_bold fontsize="17px"> 나의 게시물입니다.</Font_bold>
      </ColumnCenter>
      <Font13px_darkgray>
        총 {dbdata.length}개의 게시물을 작성하였습니다.{" "}
      </Font13px_darkgray>

      <div>
        <div>{/* <p className="p-board">FORUM</p> */}</div>

        <div>
          <List dbdata={dbdata}></List>{" "}
          {/*배열을 List.js에게 속성값으로 보낸다. */}
        </div>
      </div>
      {/* Board_write에 썼던 toast가 여기서 실행됨. */}
    </Div_all_table>
  );
}

export default Board_Mine;
