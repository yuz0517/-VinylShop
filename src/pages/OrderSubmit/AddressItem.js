import React, { useState } from "react";
import Axios from "axios";
import {
  Font14px_black,
  Font14px_darkgray,

  Transparent_btn,
  Radius_btn,
  Div_flex,
  Font15px_bold,
  Fixed,
  Scroll,
 
} from "../../styled-component/style";
import styled from "styled-components";
export default function AddressItem(props) {
  const [visible, setVisible] = useState(true);
  const slicedPhone = `${props.phone.slice(0, 3)}-${props.phone.slice(
    3,
    7
  )}-${props.phone.slice(7)}`;

  const onSelectClick = () => {
    console.log("선택 클릭");
    props.sendDataToItem(props);
  };
  const onDeleteClick = () => {
    Axios.delete("http://localhost:8000/api/address/delete", {
      data: { id: props.address_id },
    })
      .then((res) => {
        alert("삭제되었습니다.");
        setVisible(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      {visible === false ? (
        <></>
      ) : (
        <div>
          <Div_flex justifycontent="space-between">
            <Font15px_bold>{props.address_name}</Font15px_bold>
            <Radius_btn
              onClick={onSelectClick}
              font_size="13px"
              background="#f3f3f3"
              height="30px"
            >
              선택
            </Radius_btn>
          </Div_flex>

          <Font14px_black>
            {props.recipient + " ・ " + slicedPhone}
          </Font14px_black>
          <Font14px_darkgray>
            {props.address1 +
              " " +
              props.address2 +
              "[" +
              props.postal_code +
              "]"}
          </Font14px_darkgray>
          <div>
          <Transparent_btn onClick={onDeleteClick}
            font_size="12px" font_color="gray" >삭제</Transparent_btn>
            </div>
          <hr/>
        </div>
      )}
    </div>
  );
}
