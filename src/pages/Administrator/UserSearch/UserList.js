import React, { useState, useEffect } from "react";
//import { auth } from "../../../firebase";
import { getAuth, deleteUser } from "firebase/auth";
import firebase from "firebase-admin"
import 'firebase/auth'
//import  { firebase } from "firebase/app"
import Axios from "axios";
import {
  HiChevronUpDown,
  HiPencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
function UserList() {
  const [customer, setCustomer] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [sortNO, setSortNO] = useState(0);
  const [sortNAME, setSortNAME] = useState(0);
  const [sortEMAIL, setSortEMAIL] = useState(0);
  const [sortDATE, setSortDATE] = useState(0);
  
  const selectedArray = selectedValue === "admin" ? admin : customer;
  //selectedValue admin이면 admin배열을 넣고 아니면 customer 배열을 할당함.
  useEffect(() => {
    Axios.get("http://localhost:8000/api/admin/getuser", {})
      .then((res) => {
        setCustomer([...res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    Axios.get("http://localhost:8000/api/admin/getadmin", {})
      .then((res) => {
        setAdmin([...res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const onSortNOClick = () => {
    setSortNO(!sortNO);
    sortNO
      ? setCustomer((prevUser) => [
          ...prevUser.sort((a, b) => b.PersonID - a.PersonID),
        ])
      : setCustomer((prevUser) => [
          ...prevUser.sort((a, b) => a.PersonID - b.PersonID),
        ]);
  };
  const onSortNAMEClick = () => {
    console.log("눌림");
    setSortNAME(!sortNAME);
    sortNAME
      ? setCustomer((prevUser) => [
          ...prevUser.sort((a, b) => a.Nickname.localeCompare(b.Nickname)),
        ])
      : setCustomer((prevUser) => [
          ...prevUser.sort((a, b) => b.Nickname.localeCompare(a.Nickname)),
        ]);
  };
  const onSortEMAILClick = () => {
    setSortEMAIL(!sortEMAIL);
    sortEMAIL
      ? setCustomer((prevUser) => [
          ...prevUser.sort((a, b) => a.userID.localeCompare(b.userID)),
        ])
      : setCustomer((prevUser) => [
          ...prevUser.sort((a, b) => b.userID.localeCompare(a.userID)),
        ]);
  };
  const onSortDATEClick = () => {
    setSortDATE(!sortDATE);
    sortDATE
      ? setCustomer((prevUser) => [
          ...prevUser.sort((a, b) => a.SignUpDate.localeCompare(b.SignUpDate)),
        ])
      : setCustomer((prevUser) => [
          ...prevUser.sort((a, b) => b.SignUpDate.localeCompare(a.SignUpDate)),
        ]);
  };


  // const fbadmin = require("firebase-admin")
  // const serviceAccount = require("../../../firebase-admin-key.json")
  // fbadmin.initializeApp({
  //   credential: fbadmin.credential.cert(serviceAccount)
  //   //credential: admin.credential.cert(serviceAccount)
  // })
  const onDeleteClick = async (e) => {
     await firebase.auth().getUserByEmail("test02@yuz.co.kr")
    .then((userRecord) => {
      console.log("이메일갖고오기성공")
    })
    .catch((error) => {
      console.log(error)
    })
    // try {
    //   setSelectedUser(e);
  
    //   // getUserByEmail 메서드를 사용하여 사용자를 비동기적으로 가져옴
    //   const userRecord = await auth.getUserByEmail(selectedUser.userID);
  
    //   // deleteUser 메서드를 사용하여 사용자를 삭제하고 완료될 때까지 기다림
    //   await auth.deleteUser(userRecord.uid);
  
    //   console.log("Firebase 삭제 성공");
    // } catch (error) {
    //   console.error("Firebase 삭제 실패", selectedUser.userID, error);
    // }
  };
  // const onDeleteClick = (e) => {
  //   setSelectedUser(e);
  //   const deleteUserFromFirebase = new Promise((resolve,reject) => {
  //     const delUser = firebase.auth().getUserByEmail(selectedUser.userID);
  //     await firebase.auth().deleteUser(delUser.uid);
  //     .then(() => {
  //       console.log("Firebase 삭제 성공");
  //       resolve(console.log("firebase 삭제 성공"));
  //     })
  //     .catch((error) => {
  //       console.log("Firebase 삭제 실패",selectedUser.userID);
  //       reject(console.log(error))
  //     })
  //   });
  //   // const deleteUSerFromDB = new Promise((resolve) => {
  //   //   Axios.delete("http://localhost:8000/api/admin/user/delete", {
  //   //     data: { id: selectedUser.userID },
  //   //   })
  //   //     .then((res) => {
  //   //       console.log(res);
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log(err.message);
  //   //     });
  //   // });
    

  //   Promise.all([
  //     deleteUserFromFirebase()
  //   ])//위 두 개의 비동기 코드를 병렬로 처리함.
  //   .then()
  //   // try{
  //   //   //deleteUser(selectedUser.userID)\
  //   //   console.log(삭제완료);

  //   // } catch (error) {
  //   //   console.error("사용자 삭제 실패")
  //   // }

  //   console.log(e);
  // };

  const onEditClick = () => {};

  const onSelectChange = (e) => {
    if (e.target.value === "customer") {
      setSelectedValue("customer");
      console.log(selectedValue);
    } else {
      setSelectedValue("admin");
    }
  };

  return (
    <div>
      <div>
        filter{" "}
        <select onChange={onSelectChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={onSortNOClick}>
              NO <HiChevronUpDown onClick={onSortNOClick} />
            </th>
            <th onClick={onSortNAMEClick}>
              NAME <HiChevronUpDown onClick={onSortNAMEClick} />
            </th>
            <th onClick={onSortEMAILClick}>
              EMAIL <HiChevronUpDown onClick={onSortEMAILClick} />
            </th>
            <th onClick={onSortDATEClick}>
              DATE <HiChevronUpDown onClick={onSortDATEClick} />
            </th>
            <th>OPTIONS</th>
          </tr>
        </thead>

        <tbody>
          {selectedArray.map((item) => {
            var date_kst = new Date(
              Date.parse(item.SignUpDate) + 9 * 60 * 60000
            ).toISOString(Date(Date.parse(item.data) + 9 * 60 * 60000));
            var kst =
              date_kst.slice(0, 4) +
              "/" +
              date_kst.slice(5, 7) +
              "/" +
              date_kst.slice(8, 10);
            return (
              <tr>
                <td>{item.PersonID}</td>
                <td>{item.Nickname}</td>
                <td>{item.userID}</td>
                <td>{kst}</td>
                <td>
                  <HiPencilSquare onClick={onEditClick} />
                  <HiOutlineTrash onClick={() => onDeleteClick(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
            <Pagination
                // 현재 보고있는 페이지 
                activePage={page}
                // 한페이지에 출력할 아이템수
                itemsCountPerPage={itemPerPage}
                // 총 아이템수
                totalItemsCount={dbdata.dbdata.length - 1}
                // 표시할 페이지수
                pageRangeDisplayed={5}
                // 함수
                prevPageText="<"
                nextPageText=">"
                onChange={handlePageChange}>
            </Pagination> */}
    </div>
  );
}

export default UserList;
