import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Context } from "../../components/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; //파베
import Modal from "react-modal";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";

import AddressAdd from "./AddressAdd";
import AddressList from "./AddressList";
import "./DeliveryADD.css";
import {
  FlexCenter,
  Div_flex,
  Address_Modal,
  Font15px_darkgray,
  Radius_btn,
  Font14px_gray,
  Cylinder_Gray,
  Font_bold_center,
  MarginLR,
} from "../../styled-component/style";
import styled from "styled-components";

export function EnableScroll(){
  document.body.classList.remove('modal-open')
}
export function DisableScroll(){
  document.body.classList.add('modal-open')
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px  0px 20px 0px",
  },
};
export default function DeliveryADD() {
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
    }
  }, []);
  function getAddressdata() {}
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
    DisableScroll()
  }

  function closeModal() {
    if (!(dataFromList.length == 0)) {
      setIsSelect(true);
    } else if (dataFromList.length == 0) {
      setIsSelect(false);
    }
    setModalOpen(false);
    setAddBtn(false);
    EnableScroll();
  }

  return (
    <div>
      <Div_flex $justifycontent="flex-start">
        <Font14px_gray>배송지 추가 및 변경</Font14px_gray>
        <Radius_btn onClick={openModal} $font_size="13px" $background="#F3F3F3">
          배송지목록
        </Radius_btn>
      </Div_flex>

      {/* <div>{address_name}</div> */}
      {isSelect === true ? (
        dataFromList !== undefined ? (
          <div>
            <Font15px_darkgray>{dataFromList.address_name}</Font15px_darkgray>
            <Font15px_darkgray>
              {dataFromList.recipient + " ・ " + dataFromList.phone}
            </Font15px_darkgray>
            <Font14px_gray>
              {dataFromList.address1 +
                ", " +
                dataFromList.address2 +
                "[" +
                dataFromList.postal_code +
                "]"}
            </Font14px_gray>
          </div>
        ) : (
          <> 배송지선택요망</>
        )
      ) : (
        <Font15px_darkgray>배송지를 선택해주세요.</Font15px_darkgray>
      )}

      <div>
        <Modal
          contentLabel="Pop up Message"
          style={customStyles}
          isOpen={modalOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={true}
        >
          <div className="DADD-flex-box">
            {addBtn == true ? (
              <Font_bold_center
                $font_size="17px"
                $font_weight="700"
                className="DADD-centered-center"
              >
                배송지 추가
              </Font_bold_center>
            ) : (
              <Font_bold_center
                $font_size="17px"
                $font_weight="700"
                className="DADD-centered-center"
              >
                배송지 목록
              </Font_bold_center>
            )}

            <IoMdClose onClick={closeModal} className="DADD-aligned-right">
              close
            </IoMdClose>
          </div>
          <Address_Modal>
            {addBtn == true ? (
              <></>
            ) : (
              <>
                <AddressList sendDataToADD={handleDataFromList} />
              </>
            )}
            
            <div>
              {addBtn == true ? (
                <AddressAdd sendDataToAADD={handleDataFromAAdd} />
              ) : (
                null
              )}
            </div>
          </Address_Modal>
          {addBtn == true ? (
              <IoMdArrowRoundBack onClick={() => setAddBtn(false)} />
            ) : (
              <FlexCenter>
                <Cylinder_Gray
                  onClick={backModal}
                  $margin_top="13px"
                  $width="100%"
                >
                  배송지 추가
                </Cylinder_Gray>
              </FlexCenter>
            )}
        </Modal>
      </div>
      <div></div>
    </div>
  );
}


