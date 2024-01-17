import React, { useEffect, useRef } from "react";
import axios from "axios";
//import * as firebase from 'firebase';

import { useState } from "react";
import Axios from "axios";
import { isReactNative } from "@firebase/util";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Navigate } from "react-router-dom";
//import styles from './Mypage.module.css'
import { IfFulfilled } from "react-async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { scriptUrl } from "../../components/DaumMap";
import {
  InputRectAddress,
  Font12px_darkgray,
  Input_Rect_transparent,
  Cylinder_Gray,
  Radius_btn,
  Font15px_darkgray,
  Transparent_btn,
  ColumnCenter,
  FlexCenter,
  CustomMini,
  Font_bold,
  Div_all,
  Rect_transparent,
  Div_flex,
} from "../../styled-component/style";
function Mypage({ history }) {
  const [User, setUser] = useState({
    email: sessionStorage.key(0),
  });

  //var email = sessionStorage.key(0);
  //console.log(User.email)
  const [text_email, setText_email] = useState("");
  const [text_nickname, setText_nickname] = useState("");
  const [text_personid, setPersonid] = useState("");
  const [text_address, setText_Address] = useState("");
  const [text_address1, setText_Address1] = useState("");
  let [dbdata, set_dbdata] = useState([]);
  //const [db, set_db] = useState({ userid: '', nickname: '' });
  let userid = "",
    nickname = "",
    personid = "",
    address = "",
    address1 = "";
  useEffect(() => {
    Axios.get("http://localhost:8000/api/userinfo", {
      params: { user: User.email },
    })
      .then((res) => {
        set_dbdata([...dbdata, ...res.data]);
        console.log(res.data[0].userID);
        nickname = res.data[0].Nickname;
        userid = res.data[0].userID;
        personid = res.data[0].PersonID;
        address = res.data[0].Address;
        address1 = res.data[0].Address1;
        setText_email(userid);
        setText_nickname(nickname);
        setPersonid(personid);
        setText_Address(address);
        setText_Address1(address1);
        console.log(personid);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const ref = useRef(null); //ref 선언.
  const refNickname = useRef(null); //ref 선언.
  const refAddress1 = useRef(null);
  const refAddress0 = useRef(null);
  //--------address----------
  /* ----- react-daum-postcode api 적용 */
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setText_Address(fullAddress);
    //setPerson_db.address(fullAddress);
    console.log(text_address);
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  //--------address1---------
  const [isAddress1Editable, setAddress1Editable] = useState(false);
  const handleAddress1DoubleClick = () => {
    setAddress1Editable(true);
  };
  const handleAddress1Change = (e) => {
    setText_Address1(e.target.value);
  };
  const handleAddress1PageClick = (e) => {
    if (isAddress1Editable === true && !refAddress1.current.contains(e.target))
      setAddress1Editable(false);
  };
  // const [isAddress0Editable, setAddress0Editable] = useState(false);
  // const handleAddress0DoubleClick = () => {
  //   setAddress1Editable(true);
  // };
  // const handleAddress0Change = (e) => {
  //   setText_Address1(e.target.value);
  // };
  // const handleAddress0PageClick = (e) => {
  //   if (isAddress0Editable === true && !refAddress0.current.contains(e.target))
  //     setAddress0Editable(false);
  //};
  useEffect(() => {
    window.addEventListener("click", handleAddress1PageClick, true);
  });
  const handleAddress1KeyDown = (e) => {
    if (e.key === "Enter") {
      setAddress1Editable(false);
    }
  };
  // -------nickname------
  const [isNicknameEditable, setNicknameEditable] = useState(false);
  const handleNicknameDoubleClick = () => {
    setNicknameEditable(true);
  };
  const handleNicknameChange = (e) => {
    setText_nickname(e.target.value);
  };
  const handleNicknamePageClick = (e) => {
    if (isNicknameEditable === true && !refNickname.current.contains(e.target))
      setNicknameEditable(false);
  };
  // useEffect(() => {
  //   window.addEventListener("click", handleNicknamePageClick, true);
  // });
  const handleNicknameKeyDown = (e) => {
    if (e.key === "Enter") {
      setNicknameEditable(false);
    }
  };
  // -------email--------
  const [isEditable, setEditable] = useState(false);
  const handleDoubleClick = () => {
    setEditable(true);
  };
  const handleChange = (e) => {
    setText_email(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditable(false);
    }
  };

  const handlePageCLick = (e) => {
    if (isEditable === true && !ref.current.contains(e.target))
      setEditable(false);
  };
  useEffect(() => {
    window.addEventListener("click", handlePageCLick, true);
  });
  //---------------
  const onEditClick = (e) => {
    //수정버튼 클릭 시 Personsdb update
    Axios.post("http://localhost:8000/api/userinfoupdate", {
      nickname: text_nickname,
      //userid: userid,
      personid: text_personid,
      address: text_address,
      address1: text_address1,
    }).then(() => {
      //글이 등록 되면
      console.log("정보 수정 완료");
      // history.push({ pathname: "/Board", submit: 'done' });
      toast.success("정보가 수정되었습니다. ", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
    });
  };

  if (User.email === null) {
    //history.push("/signin"); //render 안에서 history를 사용하면 안 된다.
    console.log("logout상태입니다.");
    return <Navigate to={"/signin"} />;
  }

  return (
    <Div_all padding="30px 0 0 10px ">
      <ToastContainer />
      <ColumnCenter>
        <Font_bold fontsize="17px">회원 정보 수정</Font_bold>

        <Font12px_darkgray>더블클릭 후 수정하세요.</Font12px_darkgray>
      </ColumnCenter>

      <div ref={ref}>
        {/* ref를 input 안에 써줬을 때 오류났음 div에 썼을때 안 남 */}
        <Font15px_darkgray>이메일</Font15px_darkgray>
        {isEditable ? (
          <Input_Rect_transparent
            type="text"
            value={text_email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Rect_transparent onDoubleClick={handleDoubleClick}>
            {text_email}
          </Rect_transparent>
        )}
      </div>

      <div ref={refNickname}>
        {/* ref를 input 안에 써줬을 때 오류났음 div에 썼을때 안 남 */}
        <Font15px_darkgray>닉네임</Font15px_darkgray>
        {isNicknameEditable ? (
          <Input_Rect_transparent
            type="text"
            value={text_nickname}
            onChange={handleNicknameChange}
            onKeyDown={handleNicknameKeyDown}
          />
        ) : (
          <Rect_transparent onDoubleClick={handleNicknameDoubleClick}>
            {text_nickname}
          </Rect_transparent>
        )}
      </div>

      <div ref={refAddress0}>
        <Font15px_darkgray>주소 1</Font15px_darkgray>
        <Div_flex justifycontent="space-between">
          <InputRectAddress
            placeholder="address"
            type="text"
            name="address"
            defaultValue={text_address}
          />
          <CustomMini
            fontsize="14px"
            background="#000000"
            fontcolor="#ffff00"
            width="50px"
            height="43px"
            onClick={handleClick}
          >
            {" "}
            찾기{" "}
          </CustomMini>
        </Div_flex>
      </div>

      <div ref={refAddress1}>
        {/* ref를 input 안에 써줬을 때 오류났음 div에 썼을때 안 남 */}
        <Font15px_darkgray>주소 2</Font15px_darkgray>
        {isAddress1Editable ? (
          <Input_Rect_transparent
            type="text"
            value={text_address1}
            onChange={handleAddress1Change}
            onKeyDown={handleAddress1KeyDown}
          />
        ) : (
          <Rect_transparent onDoubleClick={handleAddress1DoubleClick}>
            {text_address1}
          </Rect_transparent>
        )}
      </div>
      <FlexCenter>
        <Radius_btn
          height="40px"
          width="140px"
          background="#000000"
          font_size="15px"
          onClick={onEditClick}
        >
          저장
        </Radius_btn>
      </FlexCenter>

      {/*<p>{item.Nickname}</p>*/}
    </Div_all>
  );
}

export default Mypage;
