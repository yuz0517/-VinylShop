import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ColumnCenter,
  Font_bold,
  Font15px_darkgray,
  Div_all,
  Input_Rect_transparent,
  Rect_transparent,
  Select_Rect_transparent,
  InputRectAddress,
  Transparent_btn,
  Radius_btn,
  CustomMini,
  Div_flex,
} from "../../../styled-component/style.js";
import { convertToKst } from "../../../Utils/Utils.js";
import Axios from "axios";
export default function UserEdit() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [nickName, setNickName] = useState(data.Nickname);
  const [address, setAddress] = useState(data.Address);
  const [address1, setAddress1] = useState(data.Address1);
  const [role, setRole] = useState(data.admin);

  const { year, month, day, hour, minute } = convertToKst(data.SignUpDate);

  const onSaveClick = () => {
    Axios.patch(
      `http://localhost:8000/api/admin/user/update/${data.PersonID}`,
      {
        nickname: nickName,
        address: address,
        address1: address1,
        role: role,
      }
    )
      .then((res) => {
        console.log(res);
        const isInputAll = nickName == '' && address == '' && address1 == '';
        isInputAll ? navigate("/admin/user") : alert("모든 필드가 입력되지 않았습니다.")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onCancelClick = () => {
    navigate("/admin/user");
  };
  console.log(data.Address);
  return (
    <Div_all>
      <ColumnCenter>
        <Font_bold fontSize="18px">Edit User Information</Font_bold>
      </ColumnCenter>

      <Font15px_darkgray>ID {`(email)`}</Font15px_darkgray>
      <Rect_transparent> {data.userID} </Rect_transparent>
      <Font15px_darkgray>고유번호</Font15px_darkgray>
      <Rect_transparent> {data.PersonID} </Rect_transparent>
      <Font15px_darkgray>가입일자</Font15px_darkgray>
      <Rect_transparent>
        {" "}
        {year}-{month}-{day} {hour}:{minute}{" "}
      </Rect_transparent>
      <Font15px_darkgray>Nickname</Font15px_darkgray>
      <Input_Rect_transparent
        type="text"
        defaultValue={nickName}
        onChange={(e) => {
          setNickName(e.target.value);
        }}
      />
      <Font15px_darkgray>Address</Font15px_darkgray>
      <Input_Rect_transparent
        type="text"
        defaultValue={data.Address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <Font15px_darkgray>상세주소</Font15px_darkgray>
      <Input_Rect_transparent
        type="text"
        defaultValue={address1}
        onChange={(e) => {
          setAddress1(e.target.value);
        }}
      />
      <Font15px_darkgray>Role</Font15px_darkgray>
      <Select_Rect_transparent
        onChange={(e) => {
          setRole(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option value="1">Admin</option>
        <option value="0">Customer</option>
      </Select_Rect_transparent>
      <Div_flex justifycontent="end">
        <CustomMini
          onClick={onSaveClick}
          border="1px solid #000000"
          height="33px"
          width="60px"
          fontSize="13px"
          background="#fff000"
          margin="10px 4px"
        >
          저장
        </CustomMini>
        <CustomMini
          onClick={onCancelClick}
          border="1px solid #000000"
          height="33px"
          width="60px"
          fontSize="13px"
          background="#dcdcdc"
          margin="10px 0px 0px 0px"
        >
          취소
        </CustomMini>
      </Div_flex>
    </Div_all>
  );
}
