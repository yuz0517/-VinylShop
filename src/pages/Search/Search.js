import React,{ useState , useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';

import Axios from "axios";
import List from '../Board/Board_List/List';
function Search() {
  let [dbdata, set_dbdata] = useState([]);
  let [search,setSearch] = useState('');
  let [updatesearch,setUpdatesearch] = useState('');
  let key = '테스트';
  useEffect(() => {
    Axios.get("http://localhost:8000/api/boardsearch", 
    { params: { key: key} })
      .then((res) => {
        set_dbdata([...dbdata, ...res.data]);
        //console.log(res.data[0].title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onSearchchange = (event) => {
    setSearch(event.target.value);

    
  }
  return (
    <>
    <div>'검색어' 의 검색결과입니다.</div>
    <div>총 1개의 게시물이 검색되었습니다.</div>
    
      <div className="div-full">
        <div className="div-board">
          {/* <p className="p-board">FORUM</p> */}
          
          <input
            type="text" className="input-search"
            onChange={onSearchchange}
          />
          <button className="btn" onClick={() => {
                          setUpdatesearch(search);
                          set_dbdata('')}}>검색</button>
          
        </div>

        <div className="board_list">
          <List dbdata={dbdata}></List>{" "}
          {/*배열을 List.js에게 속성값으로 보낸다. */}
        </div>
      </div>
       {/* Board_write에 썼던 toast가 여기서 실행됨. */}
    </>


    
  )
}

export default Search