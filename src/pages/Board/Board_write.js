import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Board_write.css";
import { useState } from "react";
//import ReactHtmlParser from 'html-react-parser';
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { auth } from "../../firebase"; //파베
import { Context, UserContextProvider } from "../../components/ContextProvider";

/* 
1.저장 버튼 중앙 정렬 필요합니다.
2. 이모지를 입력했을 때 db에 저장이 안 됨. (페이지는 정상적으로 넘어감.)
3. 사진 입력도 따로 처f리해야 함. 
4. 사용자 이름을 따로 db에 저장해야 할 듯. -> 완료
5. 작성 날짜도 표시해줘야 한다. 
*/
function Board_write() {
  var user = auth.currentUser;
  var name, email, photoUrl, uid, emailVerified;

  const [BoardContent, setBoardContent] = useState({
    title: "",
    content: "",
    date: "",
    writer: "",
    writer_email: "",
  });
//  const { sessionUsername } = useContext(Context); //session storage

 // console.log("Board_write.js:", sessionUsername);
  /*if (user != null) {

    name = user.displayName;
    email = user.email;
    console.log(email)
    //photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }else if(user == null){
    history.push("/");
  }*/
  //db에서 유저 정보 가져오기. (작성자 등록 위함)
  let [dbdata, set_dbdata] = useState([]);
  const [Writer, setWriter] = useState("");
  const [Writer_email, setWriter_email] = useState("");
  let userid = "",
    nickname = "";
  useEffect(() => {
    Axios.get("http://localhost:8000/api/userinfo", {
      params: { user: sessionStorage.key(0) },
    })
      .then((res) => {
        set_dbdata([...dbdata, ...res.data]);
        console.log(res.data[0].userID);
        nickname = res.data[0].Nickname;
        userid = res.data[0].userID;
        BoardContent.writer = nickname;
        BoardContent.writer_email = userid;
        console.log(BoardContent.writer, BoardContent.writer_email);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(Writer_email);
  //const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  /* board_write에서 제출 버튼 누르면 등록 완료시킴.  */

  const history = useNavigate();
  const state = { display: "등록완료" /*'user_id': 5*/ };
  const url = "/Board";

  const submitBoardPost = () => {
    //등록버튼 onclick에 올려준다.
    Axios.post("http://localhost:8000/api/insert", {
      title: BoardContent.title,
      content: BoardContent.content,
      date: BoardContent.date,
      writer: BoardContent.writer,
      writer_email: BoardContent.writer_email,
    }).then(() => {
      //글이 등록 되면
      history({ pathname: "/Board", submit: "done" });
      toast.success("작성하신 글이 등록되었습니다.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
    });
  };

  const getValue = (e) => {
    // 이벤트가 발생하면 그 이벤트의 name과 value를 가지고 오는 함수. input의 내용이 변할 때 마다 그 값을 state에 업데이트 해줌.
    const { name, value } = e.target;
    setBoardContent({
      ...BoardContent,
      [name]: value,
    });
    console.log(BoardContent);
  };
  const [viewContent, setViewContent] = useState({});

  return (
    <div className="total-container">
      <div className="text-editor">
        <input
          className="title-input"
          type="text"
          placeholder="제목을 입력해주세요 ."
          onChange={getValue}
          name="title"
        />
        <hr className="line"></hr>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setBoardContent({
              ...BoardContent,
              content: data,
            });
            console.log(BoardContent);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />

        <Link to="/Board">
          <button
            className="save-button"
            onClick={submitBoardPost}
            /*onClick={() => {history.push({
              pathname: "/Board",
            state: {displays: '게시글 등록 완료'}})}}*/
          >
            저장
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Board_write;
