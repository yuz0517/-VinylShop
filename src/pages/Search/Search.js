import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation , useNavigate} from "react-router-dom";

import Axios from "axios";
import List from "../Board/Board_List/List";
function Search() {
  let navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  //const location = useLocation();
  //const [currentPath, setCurrentPath] = useState('');

  //setCurrentPath(location.pathname);
  let key = location.state.search;
  let prevoption = location.state.option;
  console.log(prevoption);

  console.log(key);
  let [option, setOption] = useState('title'); 
  let [dbdata, set_dbdata] = useState([]);
  let [search, setSearch] = useState(" ");
  
  let [updatesearch, setUpdatesearch] = useState("");
  //let key = '테스트'; //검색 키워드
  useEffect(() => {
    //console.log(prevoption);
    console.log("실행됨")
    if (prevoption === "title") {
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
    }else if(prevoption === 'writer'){
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
    }else if(prevoption === 'content'){
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
    }else if(prevoption === 'titleORcontent'){
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
  console.log(prevoption);
  const onSelectChange = (e) =>{
    setOption(e.target.value)
    console.log(e.target.value);
    
  }
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
          <select className="select-search" onChange={onSelectChange} >
            <option value="title">title</option>
            <option value="writer">writer</option>
            <option value="content">content</option>
            <option value="titleORcontent">title OR writer</option>
          </select>
          <input
            type="text"
            className="input-search"
            onChange={onSearchchange}
          />
          <button
            className="btn"
            onClick={() => {
              if(search===''){
                alert('검색어를 입력 해 주세요')
              }else {
                //setPrevpagenation(1)
                setSearch(search);
                navigate(`/search/${search}`, {state: {search: search, option:option}});}
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