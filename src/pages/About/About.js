import React, { useEffect } from 'react'
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

function About({ history }) {


  const [User, setUser] = useState({
    email: sessionStorage.key(0)
  });
  

  //var email = sessionStorage.key(0);
  //console.log(User.email)
  let [dbdata, set_dbdata] = useState([]);
  var email, name;
  useEffect(() => {
    Axios.get('http://localhost:8000/api/userinfo',
      { params: { user: User.email } })
      .then((res) => {
        set_dbdata([...dbdata, ...res.data]);
        //name = res.data.Nickname;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
    
    //console.log(user.userID);
  }, []);

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
        return(
          <div  className='div-map' key={item.PersonID}>
            <p>{item.userID}</p>
            <p>{item.Nickname}</p>
          </div>
        );
        })
      }
     </div>
  
  
  
    )
}


export default About