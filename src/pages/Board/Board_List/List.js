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
    
    const [BoardData,setBoardData] = useState([]) //reverse해서 저장할 데이터
    const [itemPerPage] = useState(10) //한 페이지 당 포스트 개수
    const indexLastPage = page * itemPerPage;
    const indexFirstPage = indexLastPage - itemPerPage;
    //currentPost = dbdata.dbdata.slice(1);
    useEffect(() => {
        
        console.log(BoardData)
        //setCurrentPost(dbdata.dbdata.slice(indexFirstPage, indexLastPage))
        setCurrentPost(BoardData.slice(indexFirstPage, indexLastPage))
        console.log("useEffect rendering");
    }
        , [indexFirstPage, indexLastPage,BoardData,page] //length 부분을 추가하니  페이지 로딩 시 바로 목록이 뜸.  => length 부분 변화 

    )
   
    const handlePageChange = (page) => {
        setBoardData([...dbdata.dbdata].reverse()); //순서 reverse
        setPage(page);
    }
   

   
   // console.log(currentPost); //성공
    //console.log("itemPerPage",itemPerPage);
    console.log("page",page);
    console.log("currentPost",currentPost);
    //console.log("page")
    return (
        <>
            <h4>총 {itemPerPage} 개의 데이터가 있습니다. </h4>
            <table align='center'>
                <tbody>
                    <tr>
                        <td>

                            {currentPost.map((data)=>{
                            {/*{dbdata.dbdata.map((data) => {*/}
                                return (
                                    <Link to={{
                                        pathname: `/Board-view/${data.id}`,
                                        state: { select_data: data }
                                    }}    //성공!!!!!!!!! 
                                        key={data.id} >{data.title}<br /></Link>
                                );
                            })}

                            {/* })} */}
                        </td>
                    </tr>
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

        </>
    )
}

export default List