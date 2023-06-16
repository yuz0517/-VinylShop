import React, {useEffect, useState} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
function Board_Update() {
    const { state } = useLocation();
    const pagenum = state.pagenum;

    console.log("pagenum",pagenum)
  const [BoardContent, setBoardContent] = useState({
    title: "",
    content: "",
    date: "",
    writer: "",
    writer_email: "",
  });
  const prevurl = "/Board-view/"+ state.select_data.id;
  const getValue = (e) => {
    // 이벤트가 발생하면 그 이벤트의 name과 value를 가지고 오는 함수. input의 내용이 변할 때 마다 그 값을 state에 업데이트 해줌.
    const { name, value } = e.target;
    setBoardContent({
      ...BoardContent,
      [name]: value,
    });
    console.log(BoardContent);
    
  };

  
  return (
    <div className="total-container">
      <p>글 수정</p>
      <div className="text-editor">
        <input
          className="title-input"
          type="text"
          defaultValue={state.select_data.title}
          onChange={getValue}
          name="title"
        />
        <hr className="line"></hr>
        <CKEditor
          editor={ClassicEditor}
          data={state.select_data.content}
          onReady={(editor) => {
            
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

        <Link to={prevurl}  state= {{ select_data: state.select_data, pagenum: pagenum}}
>
          <button
            className="save-button"
            onClick={()=>{
                let finaltitle, finalcontent;
                /* 변경된게없으면원래값을갖다넣고 변경된게있으면 state 변경된거 넣기  */
                if(BoardContent.title===""){
                    finaltitle = state.select_data.title;
                }else if(BoardContent.title===null){
                    finaltitle = state.select_data.title;
                }else {
                    finaltitle = BoardContent.title;
                    state.select_data.title = BoardContent.title;
                }
                if(BoardContent.content===""){
                    finalcontent = state.select_data.content;
                }else if(BoardContent.content===null){
                    finalcontent = state.select_data.content;
                }else {
                    finalcontent = BoardContent.content;
                    state.select_data.content = BoardContent.content;
                }
               
                Axios.put("http://localhost:8000/api/board/update",{
                    id: state.select_data.id,
                    title: finaltitle,
                    content: finalcontent
                })
                    .then((res) => {
                        console.log(res);
                    }).catch((err) =>{
                        console.log(err.message);
                    });

            }}  
            //onClick={submitBoardPost}
            /*onClick={() => {history.push({
              pathname: "/Board",
            state: {displays: '게시글 등록 완료'}})}}*/
          >
            저장
          </button>
        </Link>
        <Link to={prevurl}  state= {{ select_data: state.select_data, pagenum: pagenum}}
        >
          <button
            className="save-button"
          >
            취소
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Board_Update;
