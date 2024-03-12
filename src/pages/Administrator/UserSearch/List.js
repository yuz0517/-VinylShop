import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { auth } from "../../../firebase";
import { getAuth, deleteUser } from "firebase/auth";
import "firebase/compat/storage";
import "firebase/auth";
import firebase from "firebase/compat/app";

//import  { firebase } from "firebase/app"
import Axios from "axios";

import {
  HiChevronUpDown,
  HiPencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
function List(props) {
  console.log(props.dataArray)
  const [selectedArray,setSelectedArray] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [sortNO, setSortNO] = useState(0);
  const [sortNAME, setSortNAME] = useState(0);
  const [sortEMAIL, setSortEMAIL] = useState(0);
  const [sortDATE, setSortDATE] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedArray(props.dataArray);

  },[props.dataArray])
  const onEditClick = (e) => {
    navigate("/admin/user/edit", { state: e });
  };

  const onSortNOClick = () => {
    setSortNO(!sortNO);
    sortNO
      ? setSelectedArray((prevUser) => [
          ...prevUser.sort((a, b) => b.PersonID - a.PersonID),
        ])
      : setSelectedArray((prevUser) => [
          ...prevUser.sort((a, b) => a.PersonID - b.PersonID),
        ]);
  };
  const onSortNAMEClick = () => {
    console.log("눌림");
    setSortNAME(!sortNAME);
    sortNAME
      ? setSelectedArray((prevUser) => [
          ...prevUser.sort((a, b) => a.Nickname.localeCompare(b.Nickname)),
        ])
      : setSelectedArray((prevUser) => [
          ...prevUser.sort((a, b) => b.Nickname.localeCompare(a.Nickname)),
        ]);
  };
  const onSortEMAILClick = () => {
    setSortEMAIL(!sortEMAIL);
    sortEMAIL
      ? setSelectedArray((prevUser) => [
          ...prevUser.sort((a, b) => a.userID.localeCompare(b.userID)),
        ])
      : setSelectedArray((prevUser) => [
          ...prevUser.sort((a, b) => b.userID.localeCompare(a.userID)),
        ]);
  };
  const onSortDATEClick = () => {
    setSortDATE(!sortDATE);
    sortDATE
      ? setSelectedArray((prevUser) => [
          ...prevUser.sort((a, b) => a.SignUpDate.localeCompare(b.SignUpDate)),
        ])
      : setSelectedArray((prevUser) => [
          ...prevUser.sort((a, b) => b.SignUpDate.localeCompare(a.SignUpDate)),
        ]);
  };



  const onDeleteClick = async (e) => {
    const email = e.userID;
    setSelectedUser(e);

    try {
      //console.log(selectedUser.userID);
      const firebaseDeleteResponse = await fetch(
        "http://localhost:8000/users/api/admin/user/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await firebaseDeleteResponse.json();

      if (data.success) {
        try {
          const dbDeleteResponse = await Axios.delete(
            "http://localhost:8000/api/admin/user/delete",
            {
              data: { id: email },
            }
          )
            .then((res) => {
              console.log(
                selectedArray.filter((item) => item.userID !== email)
              );
              setSelectedArray(
                selectedArray.filter((item) => item.userID !== email)
              );
              alert("삭제 완료되었습니다.");
            })
            .catch((err) => {
              console.log("db에러");
              console.log(err.message);
            });
        } catch (err) {
          console.error(err.message);
        }
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
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
            ).toISOString(Date(Date.parse(item.SignUpDate) + 9 * 60 * 60000));
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
                  <HiPencilSquare onClick={() => onEditClick(item)} />
                  <HiOutlineTrash onClick={() => onDeleteClick(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default List;