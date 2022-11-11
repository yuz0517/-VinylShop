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
import './About.css'
import { IfFulfilled } from 'react-async';

function About({ history }) {


  const [User, setUser] = useState({
    email: sessionStorage.key(0)
  });
  

  //var email = sessionStorage.key(0);
  //console.log(User.email)
  const [text_email, setText_email] =useState("sss");
  let [dbdata, set_dbdata] = useState([]);
  const [db, set_db] = useState({userid:'', nickname:''});
  var email, name;
  useEffect(() => {
    Axios.get('http://localhost:8000/api/userinfo',
      { params: { user: User.email } })
      .then((res) => {
        set_dbdata([...dbdata, ...res.data]);
        console.log(res.data[0].userID)
        //set_db(res.data[0].userID,res.data[0].Nickname);
        db.nickname = res.data[0].Nickname;
        db.userid = res.data[0].userID
        setText_email(db.userid)
        
        
      })
      .catch((err) => {
        console.log(err.message);
      })
    
      

    //console.log(user.userID);
  }, []);
  //console.log(db.nickname,db.userid)
  //console.log(dbdata[0].userID,dbdata[0].Nickname)
  const ref = useRef(null); //ref 선언.
  
  
  //const [text_nickname, setText_nickname] = useState([dbdata]);
  const [isEditable, setEditable] = useState(false);
  const handleDoubleClick = () => {
    setEditable(true);
  };
  const handleChange = (e) => {
    setText_email(e.target.value);
    //setText_nickname(e.target.value);
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


  //https://codingapple.com/unit/react-if-else-patterns-enum-switch-case/
  if (User.email === null) {
    //history.push("/signin"); //render 안에서 history를 사용하면 안 된다.
    console.log("logout상태입니다.");
    return <Redirect to={'/signin'} />

  }


  return (
    <div className='div-all'>
      <div className='div-about'>
        <p className='p-title'>Information</p>
      </div>
      {dbdata.map((item) => {
        return (
          <div className='div-map' key={item.PersonID} >
            {/*<p value={text}>{item.userID}</p>*/}

            <div ref={ref}>{/* ref를 input 안에 써줬을 때 오류났음 div에 썼을때 안 남 */}
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
            <div>
            
            </div>
            {/*<p>{item.Nickname}</p>*/}
            
          </div>
        );
      })
      }
    </div>



  )
}


export default About