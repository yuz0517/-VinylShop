import React from "react";
import { IoWalletSharp } from "react-icons/io5";
import { Div_flex, Div_flex_column } from "../../styled-component/style";
function PointItem() {
  return (
    <>
      <div>2024년 1월 8일</div>
      <Div_flex>
        <Div_flex_column>
          <IoWalletSharp />
          적립
        </Div_flex_column>
        <div>회원가입</div>
        <div> + 1000</div>
      </Div_flex>
    </>
  );
}

export default PointItem;
