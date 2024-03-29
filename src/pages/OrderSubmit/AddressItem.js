import React, { useState } from "react";
import Axios from "axios";
import {
  Font14px_black,
  Font14px_darkgray,
  Transparent_btn,
  Radius_btn,
  Div_flex,
  Font15px_bold,
  Font14px_gray,
  Fixed,
  Scroll,
} from "../../styled-component/style";
import styled from "styled-components";
import "./AddressItem.css";
import { EnableScroll } from "./DeliveryADD";
export default function AddressItem(props) {
  const [visible, setVisible] = useState(true);
  const slicedPhone = `${props.phone.slice(0, 3)}-${props.phone.slice(
    3,
    7
  )}-${props.phone.slice(7)}`;

  const onSelectClick = () => {
    console.log("선택 클릭");
    props.sendDataToItem(props);
    EnableScroll();
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
          <div className="AddressItem-margin-bottom">
            <Div_flex
              className="AddressItem-container"
              justifycontent="space-between"
            >
              <Font15px_bold>{props.address_name}</Font15px_bold>
              <Radius_btn
                onClick={onSelectClick}
                $font_size="13px"
                $background="#f3f3f3"
              >
                선택
              </Radius_btn>
            </Div_flex>

            <div>
              <div className="AddressItem-container">
                <Font14px_black>
                  {props.recipient + " ・ " + slicedPhone}
                </Font14px_black>
                <Div_flex $justifycontent="space-between" $marginbottom="20px">
                  <Font14px_gray>
                    {props.address1 +
                      " " +
                      props.address2 +
                      "[" +
                      props.postal_code +
                      "]"}
                  </Font14px_gray>
                  <Transparent_btn
                    onClick={onDeleteClick}
                    $font_size="12.5px"
                    $font_color="#cdcdcd"
                    $margin_top="7px"
                  >
                    삭제
                  </Transparent_btn>
                </Div_flex>
              </div>
            </div>
            <div className="AddressItem-dividebox"></div>
          </div>
        </div>
      )}
    </div>
  );
}
