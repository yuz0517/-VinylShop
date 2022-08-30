import React, { Component } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";//파베
import { useState } from 'react';
import { auth } from "../firebase";//파베
import './Signup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { useHistory } from "react-router";
//import {useNavigate} from "useNavigate";
const Signup = () => {
    const [Persons_db, setPerson_db] = useState({
        id: '',
        nickname: '',
    });
    const history = useHistory();
    //const state = { display: '등록완료', /*'user_id': 5*/ };
    // const url = '/Board';
    /* Persons(유저 정보 db) db 불러오기 */
    const submitPerson = () => { //등록버튼 onclick에 올려준다. 
        Axios.post('http://localhost:8000/api/signup', {
            id: Persons_db.id,
            nickname: Persons_db.nickname
            //date: Persons_db.date,
        }).then(() => {//글이 등록 되면
            console.log();
            toast.success('계정생성완료.', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            });
        })
    };
    const getValue = e => {// 이벤트가 발생하면 그 이벤트의 name과 value를 가지고 오는 함수. input의 내용이 변할 때 마다 그 값을 state에 업데이트 해줌.
        const { name, value } = e.target;
        setPerson_db({
            ...Persons_db,
            [name]: value
        })
        console.log(Persons_db);
    };
    const [viewContent, setViewContent] = useState({

    });
    /* firebase e-mail login */
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [error, setErrorMsg] = useState("  ");
    //const navigate = useNavigate();
    var errormsg;
    const register = async () => { //밑에서 회원가입 버튼 onclick에 할당한다. 
        try {

            const createdUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            //const errmsg = await setErrorMsg(errmsg);
            console.log(createdUser);
            //setRegisterEmail("");
            //setRegisterPassword("");
            toast.success(<h4>회원가입이 완료되었습니다.<br /> 로그인 해 주세요.</h4>, { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
            //setTimeout(()=> {
            //    navigate("/");
            //  }, 2000);

        } catch (error) {
            console.log(error.message);
            let errorCode = error.code;// errorcode 이거로 해야 토스트가 뜸. 
            //let errorMessage = error.message; //error메세지로 하면 안 뜸. 
            console.log(errorCode);
            if (errorCode === "auth/email-already-in-use") {
                toast.error(<h4>이미 가입되어 있는 계정입니다.</h4>, { position: "top-center", });
            } else if (errorCode === "auth/invalid-email") {
                toast.error(<h4>잘못된 이메일 주소입니다.</h4>, { position: "top-center", });
            } else if (errorCode === "auth/weak-password") {
                toast.error(<h4>비밀번호는 6자리 이상으로 설정해주시기 바랍니다.</h4>, { position: "top-center", });
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
                        type='text'
                        name='id'
                        onChange={(e) => { getValue(e); setRegisterEmail(e.target.value); }} /><br />
                    <input
                        className='signup'
                        placeholder="비밀번호"
                        onChange={(e) => { setRegisterPassword(e.target.value); }} /><br></br>
                    <input
                        className='signup'
                        placeholder="이름"
                        type='text'
                        name='nickname'
                        onChange={getValue}
                    /><br></br>

                    <button
                        className="signup_button"
                        onClick={() => { register(); submitPerson(); }}>회원가입

                    </button>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default Signup