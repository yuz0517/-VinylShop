import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { IoWalletSharp } from "react-icons/io5";
import { Div_all } from "../../styled-component/style";
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
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(pointData)
  return (
    <Div_all>
      <div>Point</div>

      {pointData&&
        pointData.map((item, idx) => {
        console.log(item)
        return (
          <div key={idx} >
            <PointItem />
          </div>
        );
      })}
    </Div_all>
  );
}
