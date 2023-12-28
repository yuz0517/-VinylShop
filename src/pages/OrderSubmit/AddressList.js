import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Context } from "../../components/ContextProvider";
import AddressItem from "./AddressItem";
export default function AddressList({ sendDataToADD }) {
  const { sessionUserid, setIsloggedIn } = useContext(Context);
  const [addressdata, setAddressData] = useState([]);

  const handleDataFromItem = (data) => {//AddressItem.js으로부터 데이터를 받으면
    sendDataToADD(data);//AddressAdd.js로 그 데이터를 보낸다. 
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/api/address/getallinfo", {
      params: { key: sessionUserid },
    })

      .then((res) => {
        setAddressData([...res.data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div>배송지 목록</div>
      {addressdata &&
        addressdata.map((item, idx) => {
          return (
            <div key={item.address_id}>
              <AddressItem
                sendDataToItem={handleDataFromItem}
                address_id={item.address_id}
                recipient={item.recipient}
                address1={item.address1}
                address2={item.address2}
                phone={item.phone}
                postal_code={item.postal_code}
                address_name={item.address_name}
                is_default={item.is_default}
              />
            </div>
          );
        })}
    </div>
  );
}
