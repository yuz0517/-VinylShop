import React, { useState } from "react";
import Axios from "axios";
export default function AddressItem(props) {
  const [visible, setVisible] = useState(true);
  const onSelectClick = () => {
    console.log("선택 클릭");
    props.sendDataToItem(props);
  };
  const onDeleteClick = () => {
    Axios.delete("http://localhost:8000/api/address/delete", {
      data: { id: props.address_id },
    })
      .then((res) => {
        alert("삭제되었습니다.");
        setVisible(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      {visible ===false? (
        <></>
      ) : (
        <>
          <div>{props.address_name}</div>
          <button onClick={onSelectClick}>선택</button>
          <div>{props.recipient}</div>
          <div>{props.phone}</div>
          <div>
            {props.address1 +
              " " +
              props.address2 +
              "[" +
              props.postal_code +
              "]"}
          </div>
          <button onClick={onDeleteClick}>삭제</button>
        </>
      )}
    </div>
  );
}
