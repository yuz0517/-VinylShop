import React, {useState} from "react";
function Paypal() {
  const { IMP } = window;
  const [isBtnOver,setBtnOver] = useState(false)
  const [mouseLoacation, setMouseLocation] = useState({
    x: 0,
    y: 0
  });
  const handleMouseMove=(e)=>{
    setMouseLocation({x:e.clientX,y:e.clientY})
  }
  const handleMouseOver=()=>{
    setBtnOver(true);
    console.log(isBtnOver);
  }
  const handleMouseOut=()=>{
    setBtnOver(false);
    console.log(isBtnOver)
  }
  function normal() {
    /* 1. 가맹점 식별하기 */
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */

    IMP.init("imp81818280"); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "kcp", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: "아임포트 결제 데이터 분석", // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { success, merchant_uid, error_msg } = response;

    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
  

  return (
    <>
      <button
        onClick={normal}
        onMouseMove={handleMouseMove}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>일반 결제</button>
        {isBtnOver&&( 
            <div style={{ position: 'absolute', top: (mouseLoacation.y)+10, left: (mouseLoacation.x)+10 }}>
                카드결제,카카오페이, 네이버페이, 토스 등의 일반결제. 
            </div>

        )}
    </>
  );
}

export default Paypal;
