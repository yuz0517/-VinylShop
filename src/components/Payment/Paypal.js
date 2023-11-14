import React from "react";
import styled from "styled-components";

const Btn = styled.div`
  border: none;
  color: #ffffff;
  background-color: #353333;
  font-weight: bold;
  width: 30vh;
  height: 4vh
`;

function Paypal() {
  const { IMP } = window;
  
  function callback(response) {
    const { success, merchant_uid, error_msg } = response;

    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
  function paypal() {
    IMP.init("imp81818280"); // 가맹점 식별코드
    /* 1. 가맹점 식별하기 */
    if (!window.IMP) return;
    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "paypal_v2", // PG사
      pay_method: "paypal", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: "아임포트 결제 데이터 분석", // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "yujeong9805@gmail.com", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    //IMP.request_pay(data, callback);
    IMP.loadUI("paypal-spb", data, callback);
  }

  return (
    <>
      
      <div className="portone-ui-container" data-portone-ui-type="paypal-spb">
        <Btn onClick={paypal}>pay with Paypal</Btn>
      </div>
    </>
  );
}

export default Paypal;
