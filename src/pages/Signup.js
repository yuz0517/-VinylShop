import React, { Component }from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";//파베
import { useState } from 'react';
import { auth } from "../firebase";//파베
import './Signup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import {useNavigate} from "useNavigate";
const Signup  = () => {
    /* firebase e-mail login */
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [error, setErrorMsg]=useState("  ");
    //const navigate = useNavigate();
    var errormsg;
    const register = async () => { //밑에서 회원가입 버튼 onclick에 할당한다. 
        try{

            const createdUser = await createUserWithEmailAndPassword(auth, registerEmail,registerPassword);
            //const errmsg = await setErrorMsg(errmsg);
            console.log(createdUser);
            //setRegisterEmail("");
            //setRegisterPassword("");
            toast.success(<h4>회원가입이 완료되었습니다.<br /> 로그인 해 주세요.</h4>,{position:toast.POSITION.TOP_RIGHT,autoClose:2000});
            //setTimeout(()=> {
            //    navigate("/");
            //  }, 2000);
        
        }catch(error){
            console.log(error.message);
            let errorCode = error.code;// errorcode 이거로 해야 토스트가 뜸. 
            //let errorMessage = error.message; //error메세지로 하면 안 뜸. 
            console.log(errorCode);
            if(errorCode==="auth/email-already-in-use"){
                toast.error(<h4>이미 가입되어 있는 계정입니다.</h4> ,{position:"top-center",});
            }else if(errorCode==="auth/invalid-email"){
                toast.error(<h4>잘못된 이메일 주소입니다.</h4> ,{position:"top-center",});
            }else if(errorCode==="auth/weak-password"){
                toast.error(<h4>비밀번호는 6자리 이상으로 설정해주시기 바랍니다.</h4> ,{position:"top-center",});
            }
        

        }
    };
  return (
    <>
    
    <div className='bg'>
        
    <div className='input_contents'>
    
        <span>회원가입</span><br /><br />
        <input 
                className='signup'
                placeholder='아이디'
                onChange={(e)=> { setRegisterEmail(e.target.value);}}/><br/>
        <input 
                className='signup'
                placeholder="비밀번호"
                onChange={(e) => {setRegisterPassword(e.target.value);}}/><br></br>
            
            <button 
                className="signup_button"
                onClick={register}>회원가입
                
            </button>
            <ToastContainer />
    </div>
    </div>
    </>
  );
}

export default Signup