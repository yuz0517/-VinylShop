import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Context } from "../../components/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; //파베
import Modal from "react-modal";
import { IoMdArrowRoundBack } from "react-icons/io";

import AddressAdd from "./AddressAdd";
import AddressList from "./AddressList";
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

  console.log(sessionUserid);

  const logout = async () => {
    await signOut(auth);
    sessionStorage.clear();
    setIsloggedIn(false);
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
  function getAddressdata(){
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
  function backModal(){
    console.log("backmodal");
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
    console.log(modalOpen);
    setModalOpen(true);
    getAddressdata();

    
  }
  function closeModal() {
    setModalOpen(false);
    setAddBtn(false);
  }
  console.log(addressdata);

  return (
    <div>
      <div>배송지를 추가해주세요.</div>
      <div> 배송지를 등록하시면 더욱 더 편리하게 선택하실 수 있습니다. </div>
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
              <AddressList/>
              <p>배송지 목록</p>
            </>
          )}
          {addBtn == true ? (
            <IoMdArrowRoundBack onClick={() => setAddBtn(false)} />
          ) : (
            <button onClick={backModal}>배송지 추가</button>
          )}
          <div>{addBtn == true ? <AddressAdd /> : <div>배송지선택</div>}</div>
          <button onClick={closeModal}>close</button>
        </Modal>
      </div>
      <div></div>
    </div>
  );
}
