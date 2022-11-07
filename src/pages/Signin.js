import React, { Component }from 'react'
import {signInWithEmailAndPassword} from "firebase/auth";//파베
import {onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { auth } from "../firebase";//파베
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';

//sign in 
const Signin = () => {
    
    const [Email, setLoginEmail] = useState("");
    const [Password, setLoginPassword] = useState("");
    const [user, setUser] = useState({});
   
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, Email, Password
            );
           console.log(user.email);
        }catch(error){
            console.log(error.message);
                
        }
    }

    
  

    return (
    <>
        <input 
            placeholder='Email'
            onChange={(e)=> { setLoginEmail(e.target.value);}}
            />
        <input 
            placeholder="Password"
            onChange={(e) => {setLoginPassword(e.target.value);}}
            />
        <button onClick={login}>Sign In</button>
        
        
        <Link to="/SignUp">
            <button >Sign Up</button>
        </Link> 
    </>
  )
}

export default Signin ;