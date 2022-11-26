import React, { Component, useContext } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";//파베
import { onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { auth } from "../firebase";//파베
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import * as Navbar from '../components/Navbar.js'
import './Signin.css'
//sign in 
import { Context, UserContextProvider } from "../components/ContextProvider";
//
const Signin = () => {

    const [Email, setLoginEmail] = useState("");
    const [Password, setLoginPassword] = useState("");
    const [user, setUser] = useState({});
    //const [isLoggedIn, setIsloggedIn] = useState(false);
    const { isLoggedIn, setIsloggedIn } = useContext(Context);
    const { sessionUsername, setSessionUsername } = useContext(Context);
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, Email, Password
            );
            sessionStorage.setItem(user.user.email, user.user.accessToken);
            setIsloggedIn(true);
            Axios.get('http://localhost:8000/api/userinfo',
      { params: { user: sessionStorage.key(0) } })
      .then((res) => {
        set_dbdata([...dbdata, ...res.data]);
        console.log(res.data[0].userID)
        nickname = res.data[0].Nickname;
        userid = res.data[0].userID;
        BoardContent.writer = nickname;
        BoardContent.writer_email=userid;
        console.log(BoardContent.writer,BoardContent.writer_email)

      })
      .catch((err) => {
        console.log(err.message);
      })
            //context.setIsloggedIn(true);
            //Navbar.signinupdate();
            //console.log("login success",isLoggedIn);
        } catch (error) {
            console.log(error.message);

        }
    }

    return (
        <>
            <div className='div-all'>
                <div className='div-title'>
                    <p className='p-login'>로그인</p>
                </div>
                <div>
                    <p className='p-id'>아이디 ( 이메일 형식 )</p>
                    <input
                        className='input-signin-id'
                        placeholder='Email'
                        onChange={(e) => { setLoginEmail(e.target.value); }}
                    />
                    <p className='p-password'>비밀번호</p>
                    <input
                        className='input-signin-password'
                        placeholder="Password"
                        type='password'
                        onChange={(e) => { setLoginPassword(e.target.value); }}
                    />
                </div>
                <div className='div-signin-button'>
                    <button
                        className='button-signin'
                        onClick={login}>Sign In</button>


                    <Link to="/SignUp">
                        <button className='button-signup'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Signin;