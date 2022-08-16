import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Board_write.css';
import {useState} from 'react'
import ReactHtmlParser from 'html-react-parser';
/* 저장 버튼 중앙 정렬 필요합니다. */
function Board_write() {
  const [BoardContent, setBoardContent] = useState({
    title: '',
    content: ''
  });

  const getValue = e =>{// 이벤트가 발생하면 그 이벤트의 name과 value를 가지고 오는 함수. input의 내용이 변할 때 마다 그 값을 state에 업데이트 해줌.
    const{ name, value } = e.target;
    setBoardContent({
      ...BoardContent,
      [name]: value
    })
    console.log(BoardContent);
  };
  const [viewContent, setViewContent] = useState({
    
  });

  return (
    <div className='total-container'>
      <div className='text-editor'>
        <input className='title-input' type='text' placeholder='제목을 입력해주세요 .'
          onChange={getValue} name='title' />
        <hr className='line'></hr>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setBoardContent({
              ...BoardContent,
              content: data
            })
            console.log(BoardContent)
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
         <button className='save-button'
         onClick={() => {
          setViewContent(viewContent.concat({...BoardContent}));
         }}>저장</button>
      </div>
       

    </div>
  );
}

export default Board_write