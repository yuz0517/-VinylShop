import React, { Component, useCallback } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";//파베
import { useState } from 'react';
import { auth } from "../firebase";//파베
import './Signup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { useDaumPostcodePopup } from 'react-daum-postcode';
//import {useNavigate} from "useNavigate";
const Signup = () => {

    const [Persons_db, setPerson_db] = useState({
        id: '',
        nickname: '',
    });
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [PasswordCheck, setPasswordCheck] = useState("");
    const [isPasswordSame, setIsPasswordSame] = useState(false);
    const [isPasswordNull, setIsPasswordNull] = useState(false);
    const [Address, setAddress] = useState("");
    //const state = { display: '등록완료', /*'user_id': 5*/ };
    // const url = '/Board';
    /* Persons(유저 정보 db) db 불러오기 */
    const submitPerson = () => { //등록버튼 onclick에 올려준다. 
        Axios.post('http://localhost:8000/api/signup', {
            nickname: Persons_db.nickname,
            id: Persons_db.id,
            //date: Persons_db.date,
        }).then(() => {
            console.log();
            //여기서 firebase에 올라가지 않아도 여기서 db에는 값이 저장됨... 
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

    /* firebase e-mail login */

    //const navigate = useNavigate();

    const [isEmail, setIsEmail] = useState(false);
    const onChangeID = useCallback(e => {
        var Checkemail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if (Checkemail.test(e.target.value) === true) {
            setIsEmail(true);
        } else setIsEmail(false);
    })
    const onChangePassword = useCallback(e => {
        //setRegisterPassword(e.target.value);  
        const regispw = e.target.value;
        setRegisterPassword(regispw);
        console.log("registerpassword", registerPassword)
        if (regispw === PasswordCheck && (regispw !== "" && PasswordCheck !== "")) {
            setIsPasswordSame(true)
        } else if (regispw === "" && PasswordCheck === "") {
            setIsPasswordNull(true)
        }
        else setIsPasswordSame(false)

    })
    const onChangePasswordSame = useCallback( //isPasswordSame을 t/f로 set해주는 함수. t/f여부에 따라서 jsx에서 password 입력 상태에 따라 나타나는 메세지가 다름. 
        e => {
            const pwcheck = e.target.value;
            console.log("", PasswordCheck)
            setPasswordCheck(pwcheck);
            if (pwcheck === registerPassword && (pwcheck !== "" && registerPassword !== "")) {
                setIsPasswordSame(true);
                //console.log(isPasswordSame, pwcheck,registerPassword);

            } else {
                setIsPasswordSame(false);
                //console.log(isPasswordSame, pwcheck,registerPassword);

            }

        });
    /* ----- react-daum-postcode api 적용 */
    const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(scriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setAddress  = fullAddress;
        console.log(Address); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

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

            <div className='div-all'>

                <div className='div-title'>

                    <p className='p-login'>회원가입</p>
                </div>
                <p className='p-id'>아이디 ( 이메일 형식으로 입력 해 주세요. )</p>
                <input
                    className='input-id'
                    placeholder='id ( email )'
                    type='text'
                    name='id'
                    onChange={(e) => { getValue(e); setRegisterEmail(e.target.value); onChangeID(e) }
                    } />
                <div className='div-checkid'>
                    {isEmail
                        ?
                        <p className='p-checkid-true'>올바른 이메일 형식입니다.</p>
                        : (registerEmail === ""
                            ? <p className='p-checkid-null'>이메일을 입력 해 주세요</p>
                            : <p className='p-checkid-false'>올바른 이메일 형식으로 입력 해 주세요.</p>)

                    }
                </div>


                <p className='p-password'>비밀번호</p>
                <input
                    type="password"
                    className='input-password'
                    placeholder="password: 6자리 이상으로 입력 해 주세요."
                    onChange={onChangePassword} />

                <p className='p-password'>비밀번호 확인</p>
                <input
                    type="password"
                    className='input-password-check'
                    placeholder="password를 한번 더 입력 해 주세요."
                    onChange={onChangePasswordSame}
                />
                <div className='div-passwordcheck'>
                    {isPasswordSame
                        ?
                        <p className='p-passwordcheck-true'> 정확한 비밀번호를 입력하셨습니다.</p>
                        : (registerPassword === "" && PasswordCheck === "" //===null 로 입력 시 이 조건문은 안 돌아감.
                            ? <p className='p-passwordcheck-null'>비밀번호를 입력 해 주세요</p>
                            : <p className='p-passwordcheck-false'>비밀번호가 틀립니다. 다시 입력 해 주세요.  </p>)



                    }
                </div>
                <p className='p-nickname'>닉네임</p>
                <input
                    className='input-nickname'
                    placeholder="nickname"
                    type='text'
                    name='nickname'
                    onChange={getValue}
                />
                <p className='p-address'>주소</p>
                <button
                    className='button-address'
                    onClick={handleClick}>
                    찾기
                </button>
                <input
                    className='input-address'
                    placeholder="address"
                    type='text'
                    //name='address'
                    onChange={getValue}
                >
                
                </input>
                <div className='div-button'>
                    <button
                        className="button-register"
                        disabled={!(registerEmail && registerPassword && Persons_db.nickname && isPasswordSame)}//해당 state의 내용이 없으면 disabled로 표시해주기.
                        onClick={() => { register(); submitPerson(); }}>

                    </button>
                </div>
                <ToastContainer />

            </div>
        </>
    );
}

export default Signup