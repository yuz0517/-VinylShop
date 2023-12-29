import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Context } from "../../components/ContextProvider";
import AddressItem from "./AddressItem";
import { Font_bold, Font15px_bold,Scroll,Font14px_gray, Font_bold_center } from "../../styled-component/style";
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
    <>
    <div>
      <Font_bold_center font_size="17px" font_weight="700" >배송지 목록</Font_bold_center>
      </div>
      <Scroll>
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
    </Scroll>
    </>
  );
}
