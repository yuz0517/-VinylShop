import React,{ useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Context } from "../../components/ContextProvider";
export default function AddressList(props) {
    const { sessionUserid, setIsloggedIn } = useContext(Context);
    const [addressdata, setAddressData] = useState([]);
    const zero = 0;
    useEffect(()=>{
        Axios.get("http://localhost:8000/api/address/getallinfo", {
      params: { key: sessionUserid },
    })

      .then((res) => {
        setAddressData([ ...res.data]);
        //setAddressData(res.data)
        //temp_reward_points = res.data[0].reward_points;
        //setRewardPoints(temp_reward_points);
        console.log("getnewdata",res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    },[])
    

  return (
    <div>
      {addressdata &&
        addressdata.map((item, idx) => {
            console.log(item)
        return (
          <>
            <div>{item.address1}</div>
          </>
        );
      })}
    </div>
  );
}
