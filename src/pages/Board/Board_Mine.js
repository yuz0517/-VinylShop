import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation , useNavigate} from "react-router-dom";

import Axios from "axios";
import List from "../Board/Board_List/List";
function Board_Mine() {
  let navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  //const location = useLocation();
  //const [currentPath, setCurrentPath] = useState('');

  //setCurrentPath(location.pathname);
  let key = sessionStorage.key(0)
  console.log(key)

  let [dbdata, set_dbdata] = useState([]);
  
  
  //let key = '테스트'; //검색 키워드
  useEffect(() => {

    console.log("실행됨")
    
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
    <>
      <div> 나의 게시물입니다.</div>
      <div>총 {dbdata.length}개의 게시물.</div>

      <div className="div-full">
        <div className="div-board">
          {/* <p className="p-board">FORUM</p> */}
         
        </div>

        <div className="board_list">
          <List dbdata={dbdata}></List>{" "}
          {/*배열을 List.js에게 속성값으로 보낸다. */}
        </div>
      </div>
      {/* Board_write에 썼던 toast가 여기서 실행됨. */}
    </>
  );
}

export default Board_Mine;