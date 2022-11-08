import React, { Component } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";//파베
import { onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { auth } from "../firebase";//파베
import firebase from 'firebase/compat/app'
//import * as firebase from 'firebase';
//import firebase from "firebase/app";
import { Link } from 'react-router-dom';
import LoginModal from './Login/LoginModal';
//sign in 
const Loginform = () => {

    const [Email, setLoginEmail] = useState("");
    const [Password, setLoginPassword] = useState("");
    //const [user, setUser] = useState({});


    
    const login = async () => {
        try {
            
            const user = await signInWithEmailAndPassword(
                auth, Email, Password
            );
            //console.log(user.user.accessToken); //accesstoken
            sessionStorage.setItem(user.user.email,user.user.accessToken)
            //console.log(user.user.email);//email

        } catch (error) {
            console.log("실패");

        }
    }




    return (
        <>
            <input
                placeholder='Email'
                onChange={(e) => { setLoginEmail(e.target.value); }}
            />
            <input
                placeholder="Password"
                onChange={(e) => { setLoginPassword(e.target.value); }}
            />
            <button onClick={login}>Sign In</button>


            <Link to="/SignUp">
                <button >Sign Up</button>
            </Link>
        </>
    )
}

export default Loginform;