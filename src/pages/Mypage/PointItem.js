import React from "react";
import styled from "styled-components";
import { IoWallet, IoRemoveCircle, IoAddCircle } from "react-icons/io5";
import {
  Div_flex,
  Div_all,
  Font_bold,
  Inner_Container,
  Font13px_darkgray,
  Font14px_pinkred,
} from "../../styled-component/style";
import { numberWithCommas } from "../../Utils/Utils";
const PointAddIcon = styled(IoAddCircle)`
  margin-top: 6px;
`;
const PointRemoveIcon = styled(IoRemoveCircle)`
  margin-top: 6px;
`;
function PointItem(props) {
  //className=
  
  let IconSize = "25px";
  let year = props.pointItem.date.substr(0, 4);
  let month = props.pointItem.date.substr(5,2);
  let date = props.pointItem.date.substr(8, 2);
  return (
    <Inner_Container  borderradius="6px" >
      <Font13px_darkgray>{year+"/"+month+"/"+date}</Font13px_darkgray>
      <Div_flex justifycontent="space-between">
        {props.pointItem.point_earned === 0 ? (
          <>
            <Font_bold font-size="12px" color="#ff009B">적립</Font_bold>
          </>
        ) : (
          <>
            <Font_bold font-size="12px" color="#a9a9a9">차감</Font_bold>
          </>
        )}

        <Font_bold $font-size="12px" $color="#545454">
          {props.pointItem.details}
        </Font_bold>
        
        <Div_flex>
          {props.pointItem.point_earned === 0 ? (
            <>
              <PointAddIcon className="point-addcircle"color="#ff009B" fontSize={IconSize} />
            </>
          ) : (
            <>
              <PointRemoveIcon color="#a9a9a9" fontSize={IconSize} />
            </>
          )}
      
          {props.pointItem.point_earned === 0 ? (
            <>
              <Font_bold fontsize="18px" color="#ff009B">
                {numberWithCommas(props.pointItem.points)}
              </Font_bold>
            </>
          ) : (
            <>
              <Font_bold fontsize="18px" color="#a9a9a9">
                {numberWithCommas(props.pointItem.points)}
              </Font_bold>
            </>
          )}
        </Div_flex>
      </Div_flex>
    </Inner_Container>
  );
}

export default PointItem;
