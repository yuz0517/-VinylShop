import React, { useEffect, useState, Component, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { Context } from "../../components/ContextProvider";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";
import Axios from "axios";
import "./Board_View.css";

//수정 버튼은 작성자에게만 보이게.  => private route로 처리.

const Board_View = ({}) => {
  //const [data, set_data] = useState({});

  //const { no } = match.params; //match.parms-> 글 번호
  //console.log(location.state); // List.js에서 Props 보낸 값 확인 가능. select_data 로 표시됨.
  const location = useLocation();
  console.log(location);
  const { state } = useLocation();
  let key = state.pagenum;

  console.log(state);
  //const pagenum = location.state.pagenum; //목록 페이지 번호 저장
  const { prevPagenation, setPrevpagenation } = useContext(Context);
  setPrevpagenation(key);
  const title = state.select_data.title; // List.js에서 Link to 로 보낸 값 받아오는 코드.
  const content = state.select_data.content;
  const writer = state.select_data.writer;
  const date = state.select_data.date;
  const writer_email = state.select_data.writer_email;
  const id = state.select_data.id;
  // const id = location.state.select_data.u
  //console.log(location.state.select_data)
  /*그냥 date를 출력하면 ust (r국제표준시)로 나옴 
  따라서 이것을 kst로 변환하는 작업이 필요함. */
  var date_parse = Date.parse(date);
  var date_milli_plus = date_parse + 9 * 60 * 60000;
  var date_milli = new Date(date_milli_plus);
  var date_kst = new Date(date_milli_plus).toISOString(date_milli);
  //console.log(date_kst);
  const new_date =
    date_kst.slice(0, 4) +
    "년 " +
    date_kst.slice(5, 7) +
    "월 " +
    date_kst.slice(8, 10) +
    "일 " +
    date_kst.slice(11, 16);
  //let [mine, setMine]  = useState(false);
  let mine = 0;
  //let deletebtn = document.getElementsByClassName('button-boarddelete')
  const [loginId, setLoginId] = useState("");
  const [User, setUser] = useState({
    email: sessionStorage.key(0),
  });
  console.log(User.email, writer_email);
  if (User.email === writer_email) {
    mine = true;
  } else if (User.email !== writer_email) {
    mine = false;
  }
  let userid = "",
    nickname = "",
    personid = "",
    address = "",
    address1 = "";

  // useEffect(() => {
  //   if (mine === true) {
  //     Axios.get("http://localhost:8000/api/board/delete", {
  //       params: { user: User.email },
  //     })
  //       .then((res) => {
  //         //set_dbdata([...dbdata, ...res.data]);
  //         //userid = res.data[0].userID;
  //         //setLoginId(userid);
  //         //console.log();
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // }, []);

  //좋아요 기능 구현.
  async function like_click() {
    //alert('좋아요 버튼 클릭');
  }

  return (
    <div className="div-full">
      <div className="div-title">
        <h3>{title}</h3>
      </div>
      {mine === true && (
        <div>
          <Link to="/Board" >
            <button
              className="button-boarddelete"
              onClick={() => {
                if (mine === true) {
                  Axios.delete("http://localhost:8000/api/board/delete", {
                    data: { id: id },
                  })
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err.message);
                    });
                }
              }}
            >
              삭제
            </button>
          </Link>
          <Link to="/board/update" state={ {select_data: state.select_data, pagenum: key}}>
            <button
              className="button-boardupdate"
              onClick={() => {
                }}
            >
              수정
            </button>
          </Link>
        </div>
      )}
      <div className="div-content">
        <div className="div-info">
          <p className="p-date"> {new_date}</p>
          <p className="p-writer">글쓴이: {writer}</p>
        </div>
        <div
          className="div-htmlcontent"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <Link to="/Board">
          {/*<button className='contents'>Back to contents</button>*/}
        </Link>
        <div className="div-icons">
          <IconContext.Provider value={{ color: "#000", size: 30 }}>
            <div className="Like">
              <AiIcons.AiOutlineHeart
                className="icon_Like"
                onClick={() => like_click()}
              />

              <Link to="/Board">
                <RiIcons.RiArrowGoBackFill className="icon-back" />
              </Link>
            </div>
          </IconContext.Provider>
        </div>
      </div>
      {/*div content */}
    </div>
  );
};

export default Board_View;
