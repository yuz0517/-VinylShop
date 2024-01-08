import React, { useState, useRef} from "react";
import { useLocation } from "react-router-dom";
import {
  Div_all,
  Div_flex_column,
  Div_flex,
  Font15px_bold,
  Font14px_darkgray,
  Cylinder_Gray,
  Font14px_gray,
  Font_bold,
  Input_Rect_transparent,
  Select_Rect_transparent,
  Image,
  Font_plain,
  Div_flex_dropdown,
  Font14px_darkgray_600,
  Section,
} from "../../styled-component/style";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
//import Paypal from "../../components/Payment/Paypal";
//import Nhn from "../../components/Payment/Nhn";
import "./Orderdetail.css";
import { Paypal } from "../../components/Payment/Paypal.js";
import { Nhn } from "../../components/Payment/Nhn.js";
import DeliveryADD from "./DeliveryADD";
import Agreement_0 from "./Agreement_0.js";
import Agreement_1 from "./Agreement_1.js";
import { FormCheck } from "react-bootstrap";
//import { IfSettled } from "react-async";

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
export function EnableScroll(){
  document.body.classList.remove('modal-open')
}
export function DisableScroll(){
  document.body.classList.add('modal-open')
}

export default function Orderdetail() {
  const location = useLocation();
  const data = location.state;
  console.log("받아온 데이터", data.finalPrice);

  const [paypalVisible, setPaypalVisible] = useState(false);
  const [normalVisible, setNormalVisible] = useState(false);
  const [depositVisible, setDepositVisible] = useState(false);
  const [agreementAllChecked, setAgreementAllChecked] = useState(false);
  const [agreement0Visible, setAgreement0Visible] = useState(false);
  const [agreement1Visible, setAgreement1Visible] = useState(false);
  const [agreement0Checked, setAgreement0Checked] = useState(false);
  const [agreement1Checked, setAgreement1Checked] = useState(false);
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
      Nhn(data);
    } else if (selectedPayment == "deposit") {
    }
  };
  const onPaypalClick = (e) => {
    setPaypalVisible(!paypalVisible);
  };
  const onAgreementAllChecked = (e) => {
    setAgreementAllChecked(!agreementAllChecked);

    if (agreementAllChecked === false) {
      //원래 false인 상태에서 눌렸따면
      setAgreement0Checked(true);
      setAgreement1Checked(true);
    } else if (agreementAllChecked === true) {
      setAgreement0Checked(false);
      setAgreement1Checked(false);
    }
  };

  const onAgreement0Checked = (e) => {
    setAgreement0Checked(!agreement0Checked);
    if (agreementAllChecked === true) {
      setAgreementAllChecked(false);
    }
    if (agreement0Checked === false && agreement1Checked === true) {
      setAgreementAllChecked(true);
    }
  };
  const onAgreement1Checked = (e) => {
    setAgreement1Checked(!agreement1Checked);
    if (agreementAllChecked === true) {
      setAgreementAllChecked(false);
    }
    if (agreement1Checked === false && agreement0Checked === true) {
      setAgreementAllChecked(true);
    }
  };
  return (
    <Div_all >
      <Section>
        <Div_flex>
          <Font15px_bold className="ordertitle">주문상품</Font15px_bold>

          {""}
          {listdrop ? (
            <AiIcons.AiOutlineDown
              className="AiIcon_orderUpDown"
              onClick={onListdownClick}
            />
          ) : (
            <AiIcons.AiOutlineUp
              className="AiIcon_orderUpDown"
              onClick={onListdownClick}
            />
          )}
        </Div_flex>

        {listdrop ? (
          <></>
        ) : (
          <Div_flex_column  margin_right="10px" margin_left="0px">
            {data.checkList.map((item, index) => {
              return (
                <Div_flex_dropdown >
                  <Image
                    width="60px"
                    src={data.checkList[index].img0}
                    margin_right="20px"
                  />
                  <div>
                    <Font_bold fontsize="12px" color="#5B5B5B">
                      {data.checkList[index].title}
                    </Font_bold>
                    <Font_bold fontsize="12px" color="#979797">
                      {data.checkList[index].artist}
                    </Font_bold>
                    <Font_plain fontsize="11px" color="#5B5B5B">
                      {data.checkList[index].price}
                    </Font_plain>
                  </div>
                </Div_flex_dropdown>
              );
            })}
          </Div_flex_column>
        )}
      </Section>
      <Section>
        <Font15px_bold>주문자 정보</Font15px_bold>
      </Section>
      <Font14px_darkgray>이름</Font14px_darkgray>{" "}
      <Input_Rect_transparent  marginbottom="7px" />
      <Font14px_darkgray>전화번호</Font14px_darkgray>
      <Input_Rect_transparent  />
      <Section>
        <Font15px_bold>배송지</Font15px_bold>

        <DeliveryADD/>
      </Section>
      <Section>
        <Font15px_bold>배송 요청사항</Font15px_bold>
        <Input_Rect_transparent   />
      </Section>
      <Section>
        <Font15px_bold>결제동의</Font15px_bold>
        <Div_flex style={{ marginTop: `3px` }}>
          <FormCheck
            checked={agreementAllChecked}
            onClick={onAgreementAllChecked}
          />{" "}
          <Font14px_darkgray_600>전체동의</Font14px_darkgray_600>{" "}
        </Div_flex>
        <Div_flex style={{ marginTop: `3px` }}>
          <FormCheck
            checked={agreement0Checked}
            onClick={onAgreement0Checked}
          />{" "}
          <Font14px_gray>[필수] 개인정보 수집 및 이용 동의</Font14px_gray>
          <div onClick={() => setAgreement0Visible(!agreement0Visible)}>
            {agreement0Visible ? (
              <Font14px_darkgray_600 font_weight="700">
                닫기
              </Font14px_darkgray_600>
            ) : (
              <Font14px_darkgray_600>자세히</Font14px_darkgray_600>
            )}{" "}
          </div>
        </Div_flex>

        {agreement0Visible ? <Agreement_0 /> : <></>}
        <Div_flex style={{ marginTop: `3px` }}>
          <FormCheck
            checked={agreement1Checked}
            onClick={onAgreement1Checked}
          />
          <Font14px_gray>[필수] 전자금융거래 기본약관 동의</Font14px_gray>
          <div onClick={() => setAgreement1Visible(!agreement1Visible)}>
            {agreement1Visible ? (
              <Font14px_darkgray_600>닫기</Font14px_darkgray_600>
            ) : (
              <Font14px_darkgray_600>자세히</Font14px_darkgray_600>
            )}{" "}
          </div>
        </Div_flex>
        {agreement1Visible ? <Agreement_1 /> : <></>}
      </Section>
      <Section>
        <Font15px_bold>결제하기</Font15px_bold>
        <Div_flex justifycontent="space-around" marginbottom="5px">
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
        </Div_flex>
        {depositVisible && (
          <Div_flex_column>
            <Font_plain  fontsize="12px" color="#5B5B5B">
              🎧 무통장 입금 유의사항
            </Font_plain>
            <Font14px_gray>
              ✔️ 주문 후 12시간 내 미입금시 자동으로 주문이 취소됩니다.{" "}
            </Font14px_gray>
            <Font14px_gray>✔️ 입금 확인은 수동으로 이루어집니다.</Font14px_gray>

            <div>
              <Font_plain fontsize="12px" color="#5B5B5B">
                입금자명
              </Font_plain>{" "}
              <Input_Rect_transparent className="입금자명" />
            </div>
            <Font_plain fontsize="12px" color="#5B5B5B">
              은행
            </Font_plain>
            <Select_Rect_transparent>
              <option value="option1">
                농협은행: xxxx-xx-xxxx (예금주: 이유정)
              </option>
              <option value="option2">
                신한은행: xxxx-xx-xxxx (예금주: 이유정)
              </option>
            </Select_Rect_transparent>
          </Div_flex_column>
        )}
        <Font14px_gray>
          위 주문을 확인 하였으며, 개인정보 수집·이용 및 개인정보 3자 제공에
          동의합니다.
        </Font14px_gray>
        <div className="orderdetail-frame2">
          {paypalVisible ? (
            <div className="orderdetail-paypal-container">
              <div
                className="portone-ui-container"
                data-portone-ui-type="paypal-spb"
              >
                <div className="detailPaymentBtn" onClick={onTestClick}>
                  {data.finalPrice}원 결제하기
                </div>
              </div>
            </div>
          ) : (
            <div className="detailPaymentBtn" onClick={onTestClick}>
              {data.finalPrice}원 결제하기
            </div>
          )}
        </div>
      </Section>
    </Div_all>
  );
}
