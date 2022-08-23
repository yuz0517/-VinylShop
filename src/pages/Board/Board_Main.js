import React from 'react'
import { Link } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Board_write from './Board_write'
import { useLocation } from "react-router";
function Board_Main({location}) {
    let issubmit = location.submit;
    console.log(issubmit);    // 결과:  value
    if(issubmit=='done'){
        //toast.success('작성하신 글이 등록되었습니다.', { position: toast.POSITION.BOTTOM_CENTER,autoClose: 1000,hideProgressBar: true});
        //alert('등록 완료!');
    }

  return (
    <>
    <Link to='/Board-write'>
        <button className='write-button'>글쓰기</button>
    </Link>
    <ToastContainer/>
    </>
  );
}

export default Board_Main