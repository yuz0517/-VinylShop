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

function About({history}) {


  const [User, setUser] = useState({
    email: sessionStorage.key(0)
  });
  //https://codingapple.com/unit/react-if-else-patterns-enum-switch-case/
  if(User.email===null){
    //history.push("/signin"); //render 안에서 history를 사용하면 안 된다.
    return <Redirect to={'/signin'} />
    
  }

  //var email = sessionStorage.key(0);
  //console.log(User.email)

  Axios.get('http://localhost:8000/api/userinfo',
    { params: { user: User.email } })
    .then((res) => {
      //set_dbdata([...dbdata, ...res.data]);

      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    })
  console.log("로그인 O");






  //console.log(User.email);
  /*useEffect(() => {
    Axios.get('http://localhost:8000/api/userinfo', { user: User.email})
      .then((res) => {
        //set_dbdata([...dbdata, ...res.data]);
          
            console.log(res.data);
  })
    .catch((err) => {
      console.log(err.message);
    })

}, []);*/

  return (
    <div>About</div>
  )
}

export default About