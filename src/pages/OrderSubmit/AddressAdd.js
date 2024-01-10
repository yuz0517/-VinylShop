import React, { useContext } from "react";
import styled from "styled-components";
import Axios from "axios";
import { country } from "../../assets/countryList";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { scriptUrl } from "../../components/DaumMap";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { Context } from "../../components/ContextProvider";
import { Scroll } from "../../styled-component/style";
import {
  Font14px_darkgray,
  Font14px_red,
  Font14px_lightRed,
  ModalInput_tpr,
  Select_Rect_transparent,
  Cylinder_Gray,
  FlexCenter,
  Radius_btn,
  Div_flex,
  MarginLR,
} from "../../styled-component/style";
export default function AddressAdd({ sendDataToAADD }) {
  const { sessionUserid, setIsloggedIn } = useContext(Context);

  const [isAddressNameN, setIsAddressNameN] = useState(true);
  const [isReciptientN, setIsRecipientN] = useState(true);
  const [isPostalCodeN, setIsPostalCodeN] = useState(true);
  const [isAddress1N, setIsAddress1N] = useState(true);
  const [isPhoneN, setIsPhoneN] = useState(true);
  const [isCountryNameN, setIsCountryNameN] = useState(false);

  const [addressName, setAddressName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phone, setPhone] = useState("");
  const [countryName, setCountryName] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  //const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const [isComposing, setIsComposing] = useState(false);

  const onAddressNameChange = (e) => {
    var value = e.target.value;
    setAddressName(value);
    if (value.length >= 1 && value.length <= 30) {
      setIsAddressNameN(true);
    } else setIsAddressNameN(false);
  };
  const onPhoneChange = (e) => {
    var value = e.target.value;
    setPhone(value);
    if (value.length >= 1 && value.length <= 15) {
      setIsPhoneN(true);
    } else {
      setIsPhoneN(false);
    }
  };
  const onPostalCodeChange = (e) => {
    var value = e.target.value;
    setPostalCode(value);
    if (value.length >= 1 && value.length <= 10) {
      setIsPostalCodeN(true);
    } else setIsPostalCodeN(false);
  };
  const onAddress1Change = (e) => {
    console.log(e.target.value);
    setAddress1(e.target.value);
  };
  const onAddress2Change = (e) => {
    //console.log(e.target.value)
    setAddress2(e.target.value);
  };
  const onCountryChange = (e) => {
    console.log(e.target.value);
    setCountryName(e.target.value);
  };
  const onDefaultChange = (e) => {
    setIsDefault(e.target.value);
  };
  const onRecipientChange = (e) => {
    var value = e.target.value;
    setRecipient(e.target.value);
    if (value.length >= 1 && value.length <= 30) {
      setIsRecipientN(true);
    } else setIsRecipientN(false);
  };

  const onNumKeyUp = (e) => {
    var forbiddenChars = /[,'";:\/?{}[\]\\\s\n\r]/g;
    var korean = /[\ㄱ-ㅎㅏ-ㅣ|가-힣]/gi;

    if (e.nativeEvent.isComposing) {
      e.target.value = e.target.value.replace(korean, "");
      e.target.value = e.target.value.replace(forbiddenChars, "");
    } else {
      e.target.value = e.target.value.replace(korean, "");
      e.target.value = e.target.value.replace(forbiddenChars, "");
    }
    if (korean.test(e.key)) {
      e.target.value = e.target.value.replace(korean, "");
      e.target.value = e.target.value.replace(forbiddenChars, "");
    }
  };

  const onNumKeyDown = (e) => {
    var forbiddenChars = /[,'"<>.;:\/?{}[\]\\\s\n\r]/g;
    var korean = /[\ㄱ-ㅎㅏ-ㅣ|가-힣]/gi;

    const isitanumber = Number(e.key);
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      if (isNaN(isitanumber) === true) {
        e.preventDefault();
      }
    }

    if (e.nativeEvent.isComposing) {
      e.target.value = e.target.value.replace(korean, "");
      e.target.value = e.target.value.replace(forbiddenChars, "");
    } else {
      e.target.value = e.target.value.replace(korean, "");
      e.target.value = e.target.value.replace(forbiddenChars, "");
    }

    const invalidKeys =
      e.keyCode == 9 ||
      e.keyCode == 13 ||
      e.keyCode == 16 || //Tab, Enter, Shift
      e.keyCode == 32 ||
      e.keyCode == 34 ||
      e.keyCode == 39 || //Space, ", '
      (e.keyCode >= 43 && e.keyCode <= 47) || //기호
      (e.keyCode >= 58 && e.keyCode <= 63) || //기호
      (e.keyCode >= 65 && e.keyCode <= 90) || //알파벳
      (e.keyCode >= 92 && e.keyCode <= 93) || //기호
      (e.keyCode >= 95 && e.keyCode <= 96) || //기호
      (e.keyCode >= 123 && e.keyCode <= 126) || //기호
      (e.keyCode >= 186 && e.keyCode <= 222) || //기호
      (e.keyCode >= 12593 && e.keyCode <= 12687); //기호

    if (invalidKeys) {
      e.preventDefault();
    }

    if (korean.test(e.key)) {
      e.target.value = e.target.value.replace(korean, "");
      e.target.value = e.target.value.replace(forbiddenChars, "");
    }
  };
  /*daum map*/
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let postcode = data.zonecode;
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
    //setText_Address(fullAddress);
    setAddress1(fullAddress);
    setPostalCode(postcode);
    console.log(postalCode, postcode);
    console.log(address1, fullAddress);
    //setPerson_db.address(fullAddress);
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  /* ------- */
  const onDefaultOnClick = () => {
    setIsDefault(false);
  };
  const onDefaultOffClick = () => {
    setIsDefault(true);
  };
  const onSaveClick = () => {
    console.log("클릭");
    if (
      addressName.length === 0 ||
      phone.length === 0 ||
      postalCode.length === 0 ||
      address1.length == 0 ||
      countryName.length == 0
    ) {
      alert("빈 칸을 입력해주세요");
    } else {
      console.log("클릭:가능");
      Axios.post("http://localhost:8000/api/address/postaddress", {
        user_id: sessionUserid,
        postal_code: postalCode,
        address1: address1,
        address2: address2,
        phone: phone,
        country: countryName,
        is_default: isDefault,
        address_name: addressName,
        recipient: recipient,
      }).then(() => {
        //글이 등록 되면
        toast.success("배송지 추가 완료", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: true,
        });
      });
      sendDataToAADD(1);
    }
  };

  return (
    <MarginLR>
      <Font14px_darkgray>배송지 이름</Font14px_darkgray>
      <ModalInput_tpr type="text" onChange={onAddressNameChange} />
      <div>
        {isAddressNameN ? (
          <></>
        ) : (
          <Font14px_red>필수 입력 정보입니다. </Font14px_red>
        )}
      </div>
      <Font14px_darkgray>국가</Font14px_darkgray>
      <p></p>
      <Select_Rect_transparent onChange={onCountryChange}>
        {country.map((name) => {
          return <option value={name} selected={name === 'Korea, Republic of'}>{name}</option>;
        })}
      </Select_Rect_transparent>
      <Font14px_darkgray>수령인</Font14px_darkgray>
      <ModalInput_tpr onChange={onRecipientChange} maxLength={30} />
      <div>
        {isReciptientN ? (
          recipient.length == 1 ? (
            <Font14px_lightRed>2글자 이상 입력해주세요.</Font14px_lightRed>
          ) : null
        ) : (
          <Font14px_red>필수 입력 정보입니다. </Font14px_red>
        )}
      </div>
      <Font14px_darkgray>핸드폰 번호</Font14px_darkgray>
      <ModalInput_tpr
        maxLength={15}
        onChange={onPhoneChange}
        onKeyDown={onNumKeyDown}
        onKeyUp={onNumKeyUp}
      />
      <div>
        {isPhoneN ? (
          phone.length > 0 && phone.length <= 5 ? (
            <Font14px_lightRed>
              전화번호를 정확히 입력해주세요.
            </Font14px_lightRed>
          ) : null
        ) : (
          <Font14px_red>필수 입력 정보입니다. </Font14px_red>
        )}
      </div>
          <Div_flex>
      <Font14px_darkgray>우편번호</Font14px_darkgray>
      <Radius_btn
        font_size="13px"
        background="#f3f3f3"
        height="30px"
        onClick={handleClick}
      >
        우편번호 찾기
      </Radius_btn>
      </Div_flex>
      <ModalInput_tpr
        value={postalCode}
        onChange={onPostalCodeChange}
        maxLength={10}
      />
      {isPostalCodeN ? (
        postalCode.length > 0 && postalCode.length <= 2 ? (
          <Font14px_lightRed>우편번호를 정확히 입력해주세요.</Font14px_lightRed>
        ) : null
      ) : (
        <Font14px_red>필수 입력 정보입니다. </Font14px_red>
      )}
      
      <Font14px_darkgray>주소지</Font14px_darkgray>
      <ModalInput_tpr
        value={address1}
        onChange={onAddress1Change}
        maxLength={80}
      />
      {isAddress1N ? (
        address1.length > 0 && address1.length <= 4 ? (
          <Font14px_lightRed>주소를 정확히 입력해주세요.</Font14px_lightRed>
        ) : null
      ) : (
        <Font14px_red>필수 입력 정보입니다. </Font14px_red>
      )}

      <Font14px_darkgray>상세주소</Font14px_darkgray>
      <ModalInput_tpr onChange={onAddress2Change} maxLength={80} />
      <Font14px_darkgray>
        {isDefault ? (
          <IoMdRadioButtonOn onClick={onDefaultOnClick} />
        ) : (
          <IoMdRadioButtonOff onClick={onDefaultOffClick} />
        )}
        기본 배송지로 설정
      </Font14px_darkgray>
      <FlexCenter>
        <Cylinder_Gray onClick={onSaveClick}>저장하기</Cylinder_Gray>
      </FlexCenter>
    </MarginLR>
  );
}
