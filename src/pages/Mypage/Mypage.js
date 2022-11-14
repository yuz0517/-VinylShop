import React, { useEffect, useRef } from 'react'
import axios from 'axios';
//import * as firebase from 'firebase';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { getAuth, indexedDBLocalPersistence } from "firebase/auth";
import { useState } from 'react'
import Axios from 'axios';
import { isReactNative } from '@firebase/util';
import Signin from '../Signin';//수정필요
import { Redirect } from 'react-router-dom';
import './Mypage.css'
import { IfFulfilled } from 'react-async';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Mypage({ history }) {


  const [User, setUser] = useState({
    email: sessionStorage.key(0)
  });


  //var email = sessionStorage.key(0);
  //console.log(User.email)
  const [text_email, setText_email] = useState("");
  const [text_nickname, setText_nickname] = useState("");
  const [text_personid, setPersonid] = useState("");
  let [dbdata, set_dbdata] = useState([]);
  //const [db, set_db] = useState({ userid: '', nickname: '' });
  let userid = '', nickname = '', personid = '';
  useEffect(() => {
    Axios.get('http://localhost:8000/api/userinfo',
      { params: { user: User.email } })
      .then((res) => {
        set_dbdata([...dbdata, ...res.data]);
        console.log(res.data[0].userID)
        nickname = res.data[0].Nickname;
        userid = res.data[0].userID;
        personid = res.data[0].PersonID;
        setText_email(userid);
        setText_nickname(nickname);
        setPersonid(personid);
        //console.log(personid)
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  //console.log(db.nickname,db.userid)
  //console.log(dbdata[0].userID,dbdata[0].Nickname)
  const ref = useRef(null); //ref 선언.
  const refNickname = useRef(null); //ref 선언.

  //const [text_nickname, setText_nickname] = useState([dbdata]);

  // -------nickname------
  const [isNicknameEditable, setNicknameEditable] = useState(false);
  const handleNicknameDoubleClick = () => {
    setNicknameEditable(true);
  };
  const handleNicknameChange = (e) => {
    setText_nickname(e.target.value);
  }
  const handleNicknamePageClick = (e) => {
    if (isNicknameEditable === true && !refNickname.current.contains(e.target))
      setNicknameEditable(false);
  };
  useEffect(() => {
    window.addEventListener("click", handleNicknamePageClick, true);
  });
  const handleNicknameKeyDown = (e) => {
    if (e.key === "Enter") {
      setNicknameEditable(false);
    }
  };
  // -------email--------
  const [isEditable, setEditable] = useState(false);
  const handleDoubleClick = () => {
    setEditable(true);
  };
  const handleChange = (e) => {
    setText_email(e.target.value);

  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditable(false);
    }
  };

  const handlePageCLick = (e) => {
    if (isEditable === true && !ref.current.contains(e.target))
      setEditable(false);
  };
  useEffect(() => {
    window.addEventListener("click", handlePageCLick, true);
  });
  //---------------
  const onEditClick = (e) => { //수정버튼 클릭 시 Personsdb update
    Axios.post('http://localhost:8000/api/userinfoupdate', {

      nickname: text_nickname,
      //userid: userid,
      personid: text_personid
    }).then(() => {//글이 등록 되면
      console.log("정보 수정 완료");
      // history.push({ pathname: "/Board", submit: 'done' });
      toast.success('정보가 수정되었습니다. ', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        hideProgressBar: true
      });
    })

  };


  //https://codingapple.com/unit/react-if-else-patterns-enum-switch-case/
  if (User.email === null) {
    //history.push("/signin"); //render 안에서 history를 사용하면 안 된다.
    console.log("logout상태입니다.");
    return <Redirect to={'/signin'} />

  }


  return (
    <div className='div-all'>
      <div className='div-about'>
        <p className='p-title'>Mypage</p>
        <button className='btn-edit' onClick={onEditClick} >수정</button>
        <ToastContainer/>
      </div>





      <div ref={ref}  >{/* ref를 input 안에 써줬을 때 오류났음 div에 썼을때 안 남 */}
        {isEditable ? (
          <input
            type="text"
            value={text_email}

            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <p onDoubleClick={handleDoubleClick}>{text_email}</p>
        )}
      </div>
      <div ref={refNickname}  >{/* ref를 input 안에 써줬을 때 오류났음 div에 썼을때 안 남 */}
        {isNicknameEditable ? (
          <input
            type="text"
            value={text_nickname}

            onChange={handleNicknameChange}
            onKeyDown={handleNicknameKeyDown}
          />
        ) : (
          <p onDoubleClick={handleNicknameDoubleClick}>{text_nickname}</p>
        )}
      </div>
      <div>

      </div>
      {/*<p>{item.Nickname}</p>*/}





    </div>



  )
}


export default Mypage