import React, { useContext, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Context, UserContextProvider } from "../../components/ContextProvider";
import Axios from "axios";
function AdminLogin() {
  const [Email, setLoginEmail] = useState("");
  const [Password, setLoginPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [User, setUser] = useState({
    email: localStorage.key(0),
  });

  const { sessionUserid, setSessionUserid } = useContext(Context);
  const navigate = useNavigate();
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, Email, Password);
      //로그인은 되었지만 관리자 db에서 확인 되지 않는다면 일반 사용자임.
      Axios.get("http://localhost:8000/api/admin/login", {
        params: { key: Email },
      })
        .then((res) => {
          console.log((res.data))
          if (res.data.length == 0) {
            alert("로그인에 성공했으나 관리자가 아님.");
            navigate("/admin/login");
          } else {
            setIsAdmin(0); //관리자임
            localStorage.setItem(user.user.email, user.user.accessToken);
            navigate("/admin");
          }
        })
        .catch((err) => {
          alert("관리자에게 문의하세요");
          navigate("/admin/login");
        });
    } catch (error) {
      console.log(error.message);
      if (error.message == "Firebase: Error (auth/invalid-email).") {
        alert("올바른 이메일을 입력해주세요.");
      }
      setIsAdmin(1); //관리자가 아님
      //navigate('/')
    }

  };

  return (
    <>
      <div>관리자 페이지</div>
      <div>아이디</div>
      <input
        className="input-signin-id"
        placeholder="Email"
        onChange={(e) => {
          setLoginEmail(e.target.value);
        }}
      ></input>
      <div>비밀번호</div>
      <input
        className="input-signin-password"
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setLoginPassword(e.target.value);
        }}
      ></input>
      <button onClick={login}>로그인</button>
    </>
  );
}

export default AdminLogin;
