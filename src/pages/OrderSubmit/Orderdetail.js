import React, { useState } from "react";
import {
  Font15px_bold,
  Font14px,
  Cylinder_Gray,
  Font14px_gray,
  Input_Rect_transparent,
  Select_Rect_transparent,

} from "../../styled-component/style";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
//import Paypal from "../../components/Payment/Paypal";
//import Nhn from "../../components/Payment/Nhn";
import "./Orderdetail.css";
import { Paypal } from "../../components/Payment/Paypal.js";
import { Nhn } from "../../components/Payment/Nhn.js";
//import { IfSettled } from "react-async";

const Section = styled.div`
  background-color: white;
  width: auto;
  margin-bottom: 10px;
`;
const Frame = styled.div`
  background-color: #dcdcdc
  width: auto;
  height: auto;
  display: felx;
  justify-content: space-around;
`;
const DivTable = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Div_spacearound = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Div_flex_column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

function Orderdetail() {
  const [paypalVisible, setPaypalVisible] = useState(false);
  const [normalVisible, setNormalVisible] = useState(false);
  const [depositVisible, setDepositVisible] = useState(false);
  const price = 13000;
  const payItems = [
    { type: "normal", title: "일반 결제" },
    { type: "deposit", title: "무통장 입금" },
    { type: "paypal", title: "Paypal" },
  ];
  const [selectedPayment, setSelectedPayment] = useState();
  const [listdrop, setListdrop] = useState(false);
  const onListdownClick = (e) => {
    setListdrop(!listdrop);
  };
  const onPaymentClick = (e) => {
    //결제수단선택에 따른 state 상태 변경
    setSelectedPayment(e);
    console.log(
      "paypal",
      paypalVisible,
      "normal",
      normalVisible,
      "deposit",
      depositVisible
    );
    if (e == "paypal") {
      setPaypalVisible(true);
      setNormalVisible(false);
      setDepositVisible(false);
    } else if (e == "normal") {
      console.log("normal클릭됨");
      setNormalVisible(true);
      setPaypalVisible(false);
      setDepositVisible(false);
    } else if (e == "deposit") {
      setDepositVisible(true);
      setPaypalVisible(false);
      setNormalVisible(false);
    }
  };
  const onTestClick = (e) => {
    console.log(selectedPayment);
    if (selectedPayment == "paypal") {
      Paypal();
    } else if (selectedPayment == "normal") {
      Nhn();
    } else if (selectedPayment == "deposit") {
    }
  };
  const onPaypalClick = (e) => {
    setPaypalVisible(!paypalVisible);
  };
  return (
    <div className="orderdetail-frame0">
      <div className="frame1">
        <Section>
          <Font15px_bold className="ordertitle">주문상품</Font15px_bold>{" "}
          <AiIcons.AiOutlineDown
            className="AiIcon_orderDown"
            onClick={onListdownClick}
          />
        </Section>

        <Section>
          <Font15px_bold>배송지</Font15px_bold>
          <Font15px_bold>배송지 목록</Font15px_bold>
        </Section>
        <Section>
          <Font15px_bold>배송 요청사항</Font15px_bold>
          <Input_Rect_transparent type="text" />
        </Section>

        <Section>
          <Font15px_bold>결제동의</Font15px_bold>
        </Section>
        <Section>
          <Font15px_bold>결제하기</Font15px_bold>
          <Div_spacearound>
            {payItems.map((item, index) => (
              <Cylinder_Gray
                key={index}
                onClick={() => onPaymentClick(item.type)} // type 받아 set함수에 넣어준다
                className={`${
                  selectedPayment === item.type ? "selectedPayment" : ""
                }`} // 클릭하면 select클래스가 추가
              >
                {item.title}
              </Cylinder_Gray>
            ))}
          </Div_spacearound>
          {depositVisible && (
            <Div_flex_column>
              <Font14px>🎧 무통장 입금 유의사항</Font14px>
              <Font14px_gray>✔️ 주문 후 12시간 내 미입금시 자동으로 주문이 취소됩니다.{" "}</Font14px_gray>
              <Font14px_gray>✔️ 입금 확인은 수동으로 이루어집니다.</Font14px_gray>
              <div>
                <div>
                  <Font14px>입금자명</Font14px> <Input_Rect_transparent className="입금자명" />
                </div>
                <Font14px>은행</Font14px>
                <Select_Rect_transparent>
                  <option value="option1">농협은행: xxxx-xx-xxxx (예금주: 이유정)</option>
                  <option value="option2">신한은행: xxxx-xx-xxxx (예금주: 이유정)</option>
                </Select_Rect_transparent>
              </div>
            </Div_flex_column>
          )}
        </Section>

        <div className="orderdetail-frame2">
          {paypalVisible ? (
            <div className="orderdetail-paypal-container">
              <div
                className="portone-ui-container"
                data-portone-ui-type="paypal-spb"
              >
                <div className="detailPaymentBtn" onClick={onTestClick}>
                  {price}원 결제하기
                </div>
              </div>
            </div>
          ) : (
            <div className="detailPaymentBtn" onClick={onTestClick}>
              {price}원 결제하기
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orderdetail;
