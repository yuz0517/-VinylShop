import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Pagination from 'react-js-pagination';
//import 'bootstrap/dist/css/bootstrap.min.css';
import List from './Board_List/List'
import { Navigate } from 'react-router-dom';
import { render } from '@testing-library/react';
import './Board_Main.scss'
function Board_Main({ location }) {

    
    let issubmit = location.submit;
    console.log(issubmit);    // 결과:  value
    if (issubmit == 'done') {
    }
    /*const ViewBoardList = () => { //등록버튼 onclick에 올려준다. 
        Axios.get('http://localhost:8000/api/boardread', {
            title: BoardData.title,
            date: BoardData.date
        }).then((res) => { //연동 완료 되면 다음을 실행. 
            console.log(res.data);// 이렇게 찍으면 server의 index.js에서 받아온 데이터를 로그에 찍기 가능!                           
        })
    };*/

    let [dbdata, set_dbdata] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:8000/api/boardread', encodeURIComponent(""))
            .then((res) => {
                set_dbdata([...dbdata, ...res.data]);
                //console.log(dbdata);
            })
            .catch((err) => {
                console.log(err);
            })

    }, []);

    // 로그아웃 상태일 시 signin으로 push해버리기.
    const [User, setUser] = useState({
        email: sessionStorage.key(0)
      }); 
      if (User.email === null) {
        //history.push("/signin"); //render 안에서 history를 사용하면 안 된다.
        console.log("logout상태입니다.");
        return <Navigate to={'/signin'} />
    
    }

    return (
        <>
            <div className='div-full'>
                <div className='div-board'>
                    <p className='p-board'>FORUM</p>
                    <Link to='/Board-write'>
                        <button className='btn'>글쓰기</button>
                    </Link>
                    <Link to='/Board-mine'>
                        <button className='btn-mine'>나의 글</button>
                    </Link>
                </div>
            
            <div className='board_list'>
                <List dbdata={dbdata}></List> {/*배열을 List.js에게 속성값으로 보낸다. */}
            </div>
            </div>
            <ToastContainer /> {/* Board_write에 썼던 toast가 여기서 실행됨. */}


        </>
    );

}



export default Board_Main