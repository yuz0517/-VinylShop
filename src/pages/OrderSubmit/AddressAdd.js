import React, { useEffect } from "react";
import styled from "styled-components";
import { country } from "../../assets/countryList";
import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { scriptUrl } from "../../components/DaumMap";
export default function AddressAdd() {
  const [addressName, setAddressName] = useState();
  const [postalCode, setPostalCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [phone, setPhone] = useState("");
  const [countryName, setCountryName] = useState();
  const [isDefault, setIsDefault] = useState();
  //const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  
  const [isComposing, setIsComposing] = useState(false);

  const onAddressNameChange = (e) => {
    setAddressName(e.target.value);
  };
  const onPhoneChange = (e) => {
    //  setTimeout(() => {
    //     setPhone(e.target.value);
    //   }, 0);
    setPhone(e.target.value);
  };
  const onPostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };
  const onAddress1Change = (e) => {
    setAddress1(e.target.value);
   
  };
  const onAddress2Change = (e) => {
    setAddress2(e.target.value);
  };
  const onCountryChange = (e) => {
    setCountryName(e.target.value);
  };
  const onDefaultChange = (e) => {
    setIsDefault(e.target.value);
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
    //setText_Address(fullAddress);
    setAddress1(fullAddress)
    setPostalCode(postcode)
    //setPerson_db.address(fullAddress);
    
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });

  };
  const onSaveClick = () => {

  }

  return (
    <>
      <div>AddressAdd</div>
      <div>배송지 이름</div>
      <input onChange={onAddressNameChange} />
      <p>국가</p>
      <p></p>
      <select onChange={onCountryChange}>
        {country.map((name) => {
          return <option value={name}>{name}</option>;
        })}
      </select>
      <p>핸드폰 번호</p>
      <input
        onChange={onPhoneChange}
        onKeyDown={onNumKeyDown}
        onKeyUp={onNumKeyUp}
      />
      <p>우편번호</p>
      <input defaultValue={postalCode} onChange={onPostalCodeChange} />
      <p>주소 1</p> 
      <input defaultValue={address1} onChange={onAddress1Change}/>
      
      <button onClick={handleClick} >주소 검색</button>
      <p>주소 2</p>
      <input onChange={onAddress2Change} />
      <button onClick={onSaveClick}>저장</button>
    </>
  );
}
