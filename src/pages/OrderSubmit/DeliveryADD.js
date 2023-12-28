import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Context } from "../../components/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; //파베
import Modal from "react-modal";
import { IoMdArrowRoundBack } from "react-icons/io";

import AddressAdd from "./AddressAdd";
import AddressList from "./AddressList";
import "./DeliveryADD.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function DeliveryADD() {
  const [ADDcnt, setADDcnt] = useState(0);
  const { sessionUserid, setIsloggedIn } = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [addBtn, setAddBtn] = useState(false);
  const [addressdata, setAddressData] = useState([]);
  const [isSelect, setIsSelect] = useState(false);
  const [dataFromList, setDataFromList] = useState([]);
  const [dataFromAAdd, setDataFromAAdd] = useState(null);

  const logout = async () => {
    await signOut(auth);
    sessionStorage.clear();
    setIsloggedIn(false);
  };
  const handleDataFromAAdd = (data) => {
    setDataFromAAdd(data);
    if (data === 1) {
      setAddBtn(false);
    }
  };

  const onAddrClick = () => {};
  useEffect(() => {
    if (
      sessionUserid === undefined ||
      sessionUserid === null ||
      sessionUserid === ""
    ) {
      //로그인 하면 db에서 불러와 저장되는 sessionuserid 부분에 아무것도 없다면
      //재로그인창으로 이동
      alert("재로그인 해 주세요");
      logout();
    } else {
      //console.log("삭제", sessionUserid);
    }
  }, []);
  function getAddressdata() {
    // Axios.get("http://localhost:8000/api/address/getallinfo", {
    //   params: { key: sessionUserid },
    // })
    //   .then((res) => {
    //     setAddressData([...addressdata, ...res.data]);
    //     //setAddressData(res.data)
    //     //temp_reward_points = res.data[0].reward_points;
    //     //setRewardPoints(temp_reward_points);
    //     console.log("getnewdata",res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }
  const handleDataFromList = (data) => {
    setDataFromList({ ...data });
    setModalOpen(false);
    setIsSelect(true);
  };
  function backModal() {
    getAddressdata();
    setAddBtn(true);
    // Axios.get("http://localhost:8000/api/address/getallinfo", {
    //   params: { key: sessionUserid },
    // })

    //   .then((res) => {
    //     setAddressData([...addressdata, ...res.data]);
    //
    //     //setAddressData(res.data)
    //     //temp_reward_points = res.data[0].reward_points;
    //     //setRewardPoints(temp_reward_points);
    //     console.log("getnewdata",res.data);

    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }

  function openModal() {
    setModalOpen(true);
    getAddressdata();
  }

  function closeModal() {
    if (!(dataFromList.length == 0)) {
      setIsSelect(true);
    } else if (dataFromList.length == 0) {
      setIsSelect(false);
    }
    setModalOpen(false);
    setAddBtn(false);
  }


  return (
    <div>
      {/* <div>{address_name}</div> */}
      {isSelect === true ? (
        dataFromList !== undefined ? (
          <div>
            <div>{dataFromList.address_name}</div>
            <div>{dataFromList.recipient}</div>
            <div>{dataFromList.phone}</div>
            <div>
              {dataFromList.address1 +
                " " +
                dataFromList.address2 +
                "[" +
                dataFromList.postal_code +
                "]"}
            </div>
          </div>
        ) : (
          <> 배송지선택요망</>
        )
      ) : (
        <div>배송지를 선택해주세요.</div>
      )}

      <div>
        <button onClick={openModal}>배송지 목록</button>

        <Modal
          contentLabel="Pop up Message"
          style={customStyles}
          isOpen={modalOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={true}
        >
          {addBtn == true ? (
            <p>배송지 추가</p>
          ) : (
            <>
              <AddressList sendDataToADD={handleDataFromList} />
            </>
          )}
          {addBtn == true ? (
            <IoMdArrowRoundBack onClick={() => setAddBtn(false)} />
          ) : (
            <button onClick={backModal}>배송지 추가</button>
          )}
          <div>
            {addBtn == true ? (
              <AddressAdd sendDataToAADD={handleDataFromAAdd} />
            ) : (
              <div></div>
            )}
          </div>
          <button onClick={closeModal}>close</button>
        </Modal>
      </div>
      <div></div>
    </div>
  );
}
