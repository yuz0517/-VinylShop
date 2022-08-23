import React from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import Board_write from './Board_write'
import { useLocation } from "react-router";
function Board_Main({location}) {
    let issubmit = location.submit;
    console.log(issubmit);    // 결과:  value
    if(issubmit=='done'){
        //toast.success('작성하신 글이 등록되었습니다.', { position: toast.POSITION.BOTTOM_CENTER,autoClose: 1000,hideProgressBar: true});
        //alert('등록 완료!');
    }

    /* 게시글 목록 표시 */
    const [viewBoardList, setviewBoardList] = useState({
        title: '',
        
      });

    const BoardList = () => { //등록버튼 onclick에 올려준다. 
        Axios.get('http://localhost:8000/api/insert', {
          title: viewBoardList.title,
          content: viewBoardList.content
        }).then(() => { //연동 완료 되면 다음을 실행. 
        })
    };

  return (
    <>
    <Link to='/Board-write'>
        <button className='write-button'>글쓰기</button>
    </Link>
    <ToastContainer/> {/* Board_write에 썼던 toast가 여기서 실행됨. */}
    </>
  );
}

export default Board_Main