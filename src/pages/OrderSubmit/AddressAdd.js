import React from "react";
import styled from "styled-components";
import { country }  from "../../assets/countryList";
import { useState } from "react";
export default function AddressAdd() {
  const [postalCode,setPostalCode] = useState();
  const [address1,setAddress1] = useState();
  const [address2,setAddress2] = useState();
  const [phone, setPhone] = useState();
  const [countryName,setCountryName] = useState();
  const [isDefault,setIsDefault] = useState();

  return (
    <>
      <div>AddressAdd</div>
      <div>배송지 이름</div>
      <input />
      <p>국가</p>
      <p></p>
      <select>
        {country.map((name) => {
          return (<option value={name}>{name}</option>);
        })}
      </select>
      <p>핸드폰 번호</p>
      <input />
      <p>주소 1</p>
      <input />
      <p>주소 2</p>
      <input />
    </>
  );
}
