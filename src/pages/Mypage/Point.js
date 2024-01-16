import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Context } from "../../components/ContextProvider";
import { IoWalletSharp } from "react-icons/io5";
import { Div_all, Font_plain } from "../../styled-component/style";
import { Context } from "../../components/ContextProvider";
import PointItem from "./PointItem";
export default function Point() {
  const { sessionUserid } = useContext(Context);
  const [pointData, setPointData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8000/api/point/get", {
      params: { key: sessionUserid },
    })
      .then((res) => {
        setPointData([...res.data]);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(pointData)
  return (
    <Div_all>
      <Font_plain fontsize="30px">나의 포인트</Font_plain>
      {pointData&&
        pointData.map((item, idx) => {
        console.log(item)
        return (
          <div key={idx} >
            <PointItem pointItem={item}/>
          </div>
        );
      })}
    </Div_all>
  );
}
