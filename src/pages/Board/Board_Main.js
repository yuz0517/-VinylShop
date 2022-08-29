import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import Pagination from 'react-js-pagination';
//import 'bootstrap/dist/css/bootstrap.min.css';
import List from './List'
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

    const [page, setPage] = useState(1);

    const handlePageChange = (page) => { 
        //console.log(`active page is ${pageNumber}`)
        //this.setPage({activePage: pageNumber}); };
        setPage(page);
        console.log(page);
    }
    return (
        <>
            <Link to='/Board-write'>
                <button className='write-button'>글쓰기</button>
            </Link>
            <List dbdata={dbdata}></List> {/*배열을 List.js에게 속성값으로 보낸다. */}

            <Pagination
                // 현제 보고있는 페이지 
                activePage={page}
                // 한페이지에 출력할 아이템수
                itemsCountPerPage={10}
                // 총 아이템수
                totalItemsCount={dbdata.length - 1}
                // 표시할 페이지수
                pageRangeDisplayed={5}
                // 함수
                prevPageText = "prev"
                nextPageText = "next"
                onChange={handlePageChange}>
            </Pagination>

            <ToastContainer /> {/* Board_write에 썼던 toast가 여기서 실행됨. */}
        </>
    );
}



export default Board_Main