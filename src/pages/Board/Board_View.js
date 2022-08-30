import React, { useEffect, useState, Component } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import './Board_View.css';

//수정 버튼은 작성자에게만 보이게.  => private route로 처리. 

const Board_View = ({ history, location, match }) => {
  //const [data, set_data] = useState({});


  const { no } = match.params; //match.parms-> 글 번호 
  console.log(location.state.select_data); // List.js에서 Props 보낸 값 확인 가능. select_data 로 표시됨.  
  const title = location.state.select_data.title; // List.js에서 Link to 로 보낸 값 받아오는 코드. 
  const content = location.state.select_data.content;

  const date = location.state.select_data.date;
  const new_date = date.slice(0, 3) + '년 ' +
    date.slice(6, 7) + '월 ' +
    date.slice(9, 10) + '일 ' +
    date.slice(11, 16);

  useEffect(() => {

  }, []);

  //좋아요 기능 구현. 
  async function like_click() {
    //alert('좋아요 버튼 클릭');
  }



  return (
    <>


      <h3>{title}</h3>
      <h4>{new_date}</h4>
      <div dangerouslySetInnerHTML={{ __html: content }} ></div>
      <Link to="/Board">
        <button className='contents'>Back to contents</button>
      </Link>
      <div className='div.Like'>
        <IconContext.Provider value={{ color: '#000', size:30 }}>
          <div className='Like'>
            <AiIcons.AiOutlineHeart className='icon_Like' onClick={() => like_click()} /><h5>좋아요</h5>

          </div>
        </IconContext.Provider>
      </div>
    </>

  );
}

export default Board_View;