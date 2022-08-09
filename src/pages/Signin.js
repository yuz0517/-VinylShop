import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { auth } from "../firebase";
const Signin = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [error, setErrorMsg]=useState("  ");

    const register = async () => { //회원가입 버튼 onclick에 할당한다. 
        try{

            const createdUser = await createUserWithEmailAndPassword(auth, registerEmail,registerPassword);
            //const errmsg = await setErrorMsg(errmsg);
            console.log(createdUser);
            //setRegisterEmail("");
            //setRegisterPassword("");
            
        }catch(error){
            console.log(error.message);
            switch(error.message){
                case 'auth/weak-password':
                    setErrorMsg('비밀번호는 6자리 이상으로 설정해주세요.');
                    break;
                case 'auth/invalid-email':
                    setErrorMsg('잘못된 이메일 주소입니다.');
                    break;
                case 'auth/email-already-in-use':
                    setErrorMsg('이미 가입되어 있는 계정입니다. ');
                    break;
            }
        

        }
    };
  return (
    <div>
        <input 
                placeholder='Email'
                onChange={(e)=> { setRegisterEmail(e.target.value);}}/>
            <input 
                placeholder="EmailPassword"
                onChange={(e) => {setRegisterPassword(e.target.value);}}/>
            <button onClick={register}>CreateUser</button>
         
    </div>
  )
}

export default Signin