import React, { useEffect } from 'react'
import axios from 'axios';
//import * as firebase from 'firebase';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { getAuth, indexedDBLocalPersistence } from "firebase/auth";
import { useState } from 'react'
import Axios from 'axios';
function About() {


  const [User, setUser] = useState({
    email: sessionStorage.key(0)
  });
  var Firebase_ID;
  const auth = getAuth();
  const user = auth.currentUser;

  var email = sessionStorage.key(0);
  console.log(sessionStorage.key(0))

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