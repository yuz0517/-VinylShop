import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { IoWalletSharp } from "react-icons/io5";
import {
  Div_all,
  Font_plain,
  ColumnCenter,
  Font_bold,
  Font13px_darkgray,
  HrGray2px,
} from "../../styled-component/style";
import { Context } from "../../components/ContextProvider";
import PointItem from "./PointItem";
import { numberWithCommas } from "../../Utils/Utils";
export default function Point() {
  const { sessionUserid } = useContext(Context);
  const [pointData, setPointData] = useState([]);
  const [remainPoint, setRemainPoint] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8000/api/point/get", {
      params: { key: sessionUserid },
    })
      .then((res) => {
        setPointData([...res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    Axios.get("http://localhost:8000/api/userinfo/point", {
      params: { key: sessionUserid },
    })
      .then((res) => {
        setRemainPoint(res.data[0].reward_points);
        console.log(res.data[0].reward_points);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(pointData);
  return (
    <Div_all >
      <ColumnCenter margin="30px 0 20px 0" bg_color="#F2F2F2" borderradius="10px" padding="20px 30px 20px 30px">
        
        <div style={{ textAlign: 'left' }}>
          <Font_bold color="#545454" fontsize="20px">
            사용가능 포인트
          </Font_bold>
          </div>
        <Font_plain fontsize="40px" color="#ff009B">{numberWithCommas(remainPoint)}P</Font_plain>
      </ColumnCenter>
      <Font13px_darkgray>총 {pointData.length}건의 내역이 있습니다. </Font13px_darkgray>
      <HrGray2px/>
      {pointData &&
        (pointData.reverse()).map((item, idx) => {
          console.log(item);
          return (
            <div key={idx}>
              <PointItem pointItem={item} />
            </div>
          );
        })}
    </Div_all>
  );
}
