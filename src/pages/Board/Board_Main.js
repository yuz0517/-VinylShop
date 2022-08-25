import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import Board_write from './Board_write'
//import { useLocation } from "react-router";
function Board_Main({ location }) {
    let issubmit = location.submit;
    console.log(issubmit);    // 결과:  value
    if (issubmit == 'done') {
        //toast.success('작성하신 글이 등록되었습니다.', { position: toast.POSITION.BOTTOM_CENTER,autoClose: 1000,hideProgressBar: true});
        //alert('등록 완료!');
    }

    /* 게시글 목록 표시 */
    /*const [viewBoardList, setviewBoardList] = useState({
        title: '',
        
      });*/
    const [BoardData, setBoardData] = useState([{
        id: '',
        title: '',
        date: ''

    }]);

    //const [AllIndex, setAllIndex] = useState(0) //총 게시글 수



    /*const ViewBoardList = () => { //등록버튼 onclick에 올려준다. 
        Axios.get('http://localhost:8000/api/boardread', {
            title: BoardData.title,
            date: BoardData.date
        }).then((res) => { //연동 완료 되면 다음을 실행. 
            console.log(res.data);// 이렇게 찍으면 server의 index.js에서 받아온 데이터를 로그에 찍기 가능!                           
        })
    };*/

    let [dbdata,set_dbdata] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:8000/api/boardread',encodeURIComponent(""))
        .then((res)=>{
              set_dbdata([...dbdata, ...res.data]);
              //console.log(res.data);
        })
      .catch((err)=>{
        console.log(err);
      })
        
      }, []);

  

    /*
    useEffect(async() => {
        try{
            const res = await Axios.get('http://localhost:8000/api/boardread')
            const viewData = await res.data.map((rowData) => (
                setAllIndex(rowData.id),
                {
                    id: rowData.id,
                    title: rowData.title,
                    date: rowData.date

                }))
                ///BoardData 그릇에 concat으로 추가.
                setBoardData(BoardData.concat(viewData))
        }catch(e){
            console.error(e.message)
        }
    },[])

    useEffect(() => {
        dispatch(init_Data(BoardData))
        dispatch(init_lastIdx(Allindex))},
        [BoardData])
*/



    return (
        <>

            
            <Link to='/Board-write'>
                <button className='write-button'>글쓰기</button>
                <br />{dbdata[3]?.title}
            </Link>
            <ToastContainer /> {/* Board_write에 썼던 toast가 여기서 실행됨. */}
        </>
    );
}

export default Board_Main