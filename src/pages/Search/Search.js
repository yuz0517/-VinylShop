import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import Axios from "axios";
import List from "../Board/Board_List/List";
function Search() {
  const location = useLocation();
  const { state } = useLocation();
  //const location = useLocation();
  //const [currentPath, setCurrentPath] = useState('');

  //setCurrentPath(location.pathname);
  let key = location.state.search;
  let option = location.state.option;
  console.log(option);

  console.log(key);
  //let [option,setOption] =
  let [dbdata, set_dbdata] = useState([]);
  let [search, setSearch] = useState(" ");
  let [updatesearch, setUpdatesearch] = useState("");
  //let key = '테스트'; //검색 키워드
  useEffect(() => {
    console.log(option);
    if (option === "title") {
      Axios.get("http://localhost:8000/api/boardsearch/title", {
        params: { key: key },
      })
        .then((res) => {
          set_dbdata([...dbdata, ...res.data]);
          //console.log(res.data[0].title);
        })
        .catch((err) => {
          console.log(err);
        });
    }else if(option === 'writer'){
      Axios.get("http://localhost:8000/api/boardsearch/writer", {
        params: { key: key },
      })
        .then((res) => {
          set_dbdata([...dbdata, ...res.data]);
          //console.log(res.data[0].title);
        })
        .catch((err) => {
          console.log(err);
        });
    }else if(option === 'content'){
      Axios.get("http://localhost:8000/api/boardsearch/content", {
        params: { key: key },
      })
        .then((res) => {
          set_dbdata([...dbdata, ...res.data]);
          //console.log(res.data[0].title);
        })
        .catch((err) => {
          console.log(err);
        });
    }else if(option === 'titleORcontent'){
      Axios.get("http://localhost:8000/api/boardsearch/titleORcontent", {
        params: { key: key },
      })
        .then((res) => {
          set_dbdata([...dbdata, ...res.data]);
          //console.log(res.data[0].title);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  }, []);
  console.log(option);
  const onSearchchange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <div> {key} 의 검색결과입니다.</div>
      <div>총 {dbdata.length}개의 게시물이 검색되었습니다.</div>

      <div className="div-full">
        <div className="div-board">
          {/* <p className="p-board">FORUM</p> */}

          <input
            type="text"
            className="input-search"
            onChange={onSearchchange}
          />
          <button
            className="btn"
            onClick={() => {
              //setUpdatesearch(search);
              set_dbdata("");
            }}
          >
            검색
          </button>
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

export default Search;