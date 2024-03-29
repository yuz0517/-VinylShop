import React from "react";
function Nhn (orderdata) {
  const { IMP } = window;
    console.log(orderdata)
    /* 1. 가맹점 식별하기 */
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */

    IMP.init("imp81818280"); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "kcp", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: orderdata.finalPrice, // 결제금액
      name: `${orderdata.checkList[0].title}`+"외"+`${orderdata.checkList.length-1}`+"건", // 주문명
      buyer_name: {}, // 구매자 이름
      buyer_tel: {}, // 구매자 전화번호
      buyer_email: {}, // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { success, merchant_uid, error_msg } = response;

    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
  
}

export { Nhn };
