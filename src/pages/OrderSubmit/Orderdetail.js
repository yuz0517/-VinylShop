import React, { useState } from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
//import Paypal from "../../components/Payment/Paypal";
//import Nhn from "../../components/Payment/Nhn";
import "./Orderdetail.css";
import { Paypal } from "../../components/Payment/Paypal.js";
import { Nhn } from "../../components/Payment/Nhn.js";
//import { IfSettled } from "react-async";
const Title = styled.div`
  font-size: 17px;
  font-weight: bold;
`;
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
const Btn = styled.div`
  cursor: pointer;
  border: 1px solid #dcdcdc;
  width: 30vh;
  height: 43px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 20px;
`;
const Div_spacearound = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Div_flex_column = styled.div`
    display: flex;
    flex-direction: column;
`
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
    setListdrop(listdrop);
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
          <Title className="ordertitle">주문상품</Title>{" "}
          <AiIcons.AiOutlineDown
            className="orderlisticon"
            onClick={onListdownClick}
          />
        </Section>

        <Section>
          <Title>배송지</Title>
          <Title>배송지 목록</Title>
        </Section>
        <Section>
          <Title>배송 요청사항</Title>
          <input type="text" />
        </Section>

        <Section>
          <Title>결제동의</Title>
        </Section>
        <Section>
          <Title>결제하기</Title>
          <Div_spacearound>
            {payItems.map((item, index) => (
              <Btn
                key={index}
                onClick={() => onPaymentClick(item.type)} // type 받아 set함수에 넣어준다
                className={`${
                  selectedPayment === item.type ? "selectedPayment" : ""
                }`} // 클릭하면 select클래스가 추가
              >
                {item.title}
              </Btn>
            ))}
          </Div_spacearound>
          <div></div>
        </Section>
        {depositVisible && (
            <Div_flex_column>
              <div>- 입금 유의사항 -</div>
              <div>주문 후 12시간 내 미입금시 자동으로 주문이 취소됩니다. </div>
              <div>
                <p>입금자명</p> <input />
                <p>은행</p>
                <select ></select>
              </div>
            </Div_flex_column>
          )}
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
