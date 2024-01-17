import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  IoReceiptOutline,
  IoCartOutline,
  IoWalletOutline,
  IoPencil,
  IoPencilOutline,
} from "react-icons/io5";

import Mypage from "./Mypage";
import { Tab } from "bootstrap";
import "./Mypage_Main.css";
import Board_Mine from "../Board/Board_Mine";
import Cart from "../Cart/Cart";
import {
  Div_all,
  Radius_btn,
  Font12px_darkgray,
  Font15px_darkgray,
  Font15px_bold,
  Font_bold_center,
  HrGray,
  HrGray2px,
  Div_flex,
  ColumnCenter,
  Center,
  DivWidth,
} from "../../styled-component/style";
function Mypage_Main() {
  let [nav, setNav] = useState(0);
  console.log("mypagemain");
  let navigate = useNavigate();

  const onCartClick = () => {
    {navigate('/cart');}
  }
  const onRecipientClick = () => {
    navigate('/point');
  }
  const onPointClick = () => {
    navigate('/point');
  }
  const onMyWriteClick = ()  => {
    navigate('/Search/mine');
  }
  const onMyInfoClick = () => {
    navigate('/profile');
  }

  return (
    <Div_all className="Mypage_DivAll">
      <ColumnCenter margin_top="10px">
        <Font_bold_center font_size="16px" font_weight="700">
          마이페이지
        </Font_bold_center>
        <Font15px_darkgray>안녕하세요👋</Font15px_darkgray>
        <Div_flex>
          <Font15px_bold>{"이유정"}</Font15px_bold>
          <Font15px_darkgray>님</Font15px_darkgray>
        </Div_flex>
        <Font12px_darkgray marginbottom="10px">{"yujeong9805@naver.com"}</Font12px_darkgray>
        <Radius_btn
          background="#262626"
          font_size="15px"
          border="3px"
          height="35px"
          onClick={onMyInfoClick}
        >
          내 정보
        </Radius_btn>
      </ColumnCenter>
      <HrGray2px/>
      <DivWidth>
        <Div_flex marginbottom="14px">
          <IoCartOutline color="#000000" className="MypageIcon" />{" "}
          <Font_bold_center cursor="pointer" font_size="16px" font_weight="600" onClick={onCartClick}>
            장바구니
          </Font_bold_center>
        </Div_flex>
        <Div_flex marginbottom="14px">
          <IoReceiptOutline color="#000000" className="MypageIcon" />{" "}
          <Font_bold_center cursor="pointer" font_size="16px" font_weight="600">
            주문내역
          </Font_bold_center>
        </Div_flex>
        <Div_flex marginbottom="14px" onClick={onPointClick}>
          <IoWalletOutline color="#000000" className="MypageIcon" />{" "}
          <Font_bold_center cursor="pointer" font_size="16px" font_weight="600" >
            포인트
          </Font_bold_center>
        </Div_flex>
        <Div_flex marginbottom="14px">
          <IoPencil color="#000000" className="MypageIcon"onClick={onMyWriteClick} />{" "}
          <Font_bold_center cursor="pointer" font_size="16px" font_weight="600" onClick={onMyWriteClick}>
            작성한 글
          </Font_bold_center>
        </Div_flex>
      </DivWidth>
      <HrGray2px />
    </Div_all>
  );
}



export default Mypage_Main;
