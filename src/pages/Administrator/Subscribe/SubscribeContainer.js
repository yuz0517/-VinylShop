import React, { useState, useEffect } from "react";
import Axios from "axios";
import SubscribeList from "./SubscribeList";

export default function SubscribeContainer() {
  const [subscribeData, setSubscribeData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8000/api/admin/subscribe/get", {})
      .then((res) => {
        setSubscribeData([...res.data]);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <SubscribeList dataArray={subscribeData} />
    </>
  );
}
