import React, { Component, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; //파베
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase"; //파베
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import * as Navbar from "../components/Navbar.js";
import {
  Div_all,
} from "../styled-component/style";
import "./Signin.css";

//sign in
import { Context, UserContextProvider } from "../components/ContextProvider";
//
const Signin = () => {
  const [Email, setLoginEmail] = useState("");
  const [Password, setLoginPassword] = useState("");
  const [User, setUser] = useState({
    email: sessionStorage.key(0),
  });
  const { sessionUserid, setSessionUserid } = useContext(Context);
  const navigate=useNavigate();
  const login = async () => {
    try {
       //session storage
      

      const user = await signInWithEmailAndPassword(auth, Email, Password);
      sessionStorage.setItem(user.user.email, user.user.accessToken);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
    console.log(Email)
    Axios.get("http://localhost:8000/api/userinfo/personid", {
        params: { user: Email },
        
      }).then((res) => {
        console.log(res.data);
        setSessionUserid(res.data[0].PersonID)
        
      });
  };

  return (
    <>
      <Div_all>
        <div className="div-title">
          <p className="p-login">로그인</p>
        </div>
        <div>
          <p className="p-id">아이디 ( 이메일 형식 )</p>
          <input
            className="input-signin-id"
            placeholder="Email"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <p className="p-password">비밀번호</p>
          <input
            className="input-signin-password"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
        </div>
        <div className="div-signin-button">
          <button className="button-signin" onClick={login}>
            Sign In
          </button>

          <Link to="/SignUp">
            <button className="button-signup">Sign Up</button>
          </Link>
        </div>
      </Div_all>
    </>
  );
};

export default Signin;
