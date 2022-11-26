import React, { Component, useEffect } from 'react';
import ReactTable from "react-table";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ReactDOM } from 'react';
import Pagination from 'react-js-pagination';
import './List.css';
function List(dbdata) { //Board_Main.js에서 넘겨준 값을 props로 받아옴. 

    const [page, setPage] = useState(1); //page-> current page
    const [currentPost, setCurrentPost] = useState([]);

    const [BoardData, setBoardData] = useState([]) //reverse해서 저장할 데이터
    const [itemPerPage] = useState(10) //한 페이지 당 포스트 개수
    const indexLastPage = page * itemPerPage;
    const indexFirstPage = indexLastPage - itemPerPage;
    //currentPost = dbdata.dbdata.slice(1);
    const reverse = dbdata.dbdata.reverse();
    const handlePageChange = (page) => {
        //setBoardData([...dbdata.dbdata].reverse()); //순서 reverse
        setPage(page);
    }
    useEffect(() => {

        //console.log(BoardData)
        //setCurrentPost(dbdata.dbdata.slice(indexFirstPage, indexLastPage))
        //setBoardData([...dbdata.dbdata].reverse());

        setCurrentPost(reverse.slice(indexFirstPage, indexLastPage));
        console.log("useeffec");
    }
        , [indexFirstPage, indexLastPage, reverse, BoardData, page] //length 부분을 추가하니  페이지 로딩 시 바로 목록이 뜸.  => length 부분 변화 

    )





    // console.log(currentPost); //성공
    //console.log("itemPerPage",itemPerPage);
    console.log("page", page);
    console.log("currentPost", currentPost);
    //console.log("page")
    return (
        <div className='list-full'>
            {/*<h4>총 {itemPerPage} 개의 데이터가 있습니다. </h4> */}
            <table>
                <thead>
                    <tr>
                        <th className='th-title'>Title</th>
                        <th className='th-date'>Date</th>
                        <th className='th-writer'>Writer</th>
                    </tr>
                </thead>

                <tbody>



                    {currentPost.map((item) => {
                        var date_kst = new Date(Date.parse(item.date) + 9 * 60 * 60000).toISOString(Date(Date.parse(item.data) + 9 * 60 * 60000))
                        var kst = date_kst.slice(0, 4) + '년' + date_kst.slice(5, 7) + '월' + date_kst.slice(8, 10) + '일' + date_kst.slice(11, 16);


                        return (
                            <tr key={item.id}>
                                <td>
                                    <Link
                                        style={{

                                            textDecoration: 'none'
                                        }}
                                        to={{

                                            pathname: `/Board-view/${item.id}`,
                                            state: { select_data: item }//selected data로 board_view.js에서 받음 
                                        }}    //성공
                                        className='list'
                                        key={item.id} >{item.title}</Link>
                                </td>
                                <td>{kst}</td>
                                <td></td>
                            </tr>
                        );
                    })}

                   



                </tbody>
            </table>

            <Pagination
                // 현제 보고있는 페이지 
                activePage={page}
                // 한페이지에 출력할 아이템수
                itemsCountPerPage={itemPerPage}
                // 총 아이템수
                totalItemsCount={dbdata.dbdata.length - 1}
                // 표시할 페이지수
                pageRangeDisplayed={5}
                // 함수
                prevPageText="<"
                nextPageText=">"
                onChange={handlePageChange}>
            </Pagination>

        </div>
    )
}

export default List