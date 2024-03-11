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
function UserList() {
  const [customer, setCustomer] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [sortNO, setSortNO] = useState(0);
  const [sortNAME, setSortNAME] = useState(0);
  const [sortEMAIL, setSortEMAIL] = useState(0);
  const [sortDATE, setSortDATE] = useState(0);
  const [selectedArray, setSelectedArray] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedListOption, setSelectedListOption] = useState("customer");
  const [selectedSearchOption, setSelectedSearchOption] = useState("Email");
  //let selectedArray = selectedValue === "admin" ? admin : customer;

  //selectedValue admin이면 admin배열을 넣고 아니면 customer 배열을 할당함.
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:8000/api/admin/getuser", {})
      .then((res) => {
        setCustomer([...res.data]);
        setSelectedArray([...res.data]);
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
      console.log(selectedUser.userID);
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

  const onEditClick = (e) => {
    navigate("/admin/user/edit", { state: e });
  };

  const onSelectChange = (e) => {
    if (e.target.value === "customer") {
      setSelectedArray(customer);
      setSelectedListOption("customer");
    } else if (e.target.value === "admin") {
      setSelectedArray(admin);
      setSelectedListOption("admin");
    }
  };
  const onSearchClick = () => {
    navigate("/admin/user/search", { state: { option: selectedSearchOption, searchKey: searchKeyword, listOption: selectedListOption } });
  };
  
  const onSearchSelectChange = (e) => {
    (e.target.value === 'id') ? setSelectedSearchOption("id") :
    (e.target.value === 'nickname') ? setSelectedSearchOption("nickname") : setSelectedSearchOption("email");
  }

  return (
    <div>
      <div>
        <select onChange={onSearchSelectChange}>
          <option value="email">Email</option>
          <option value="id">고유번호</option>
          <option value="nickname">Nickname</option>
        </select>
        <input onChange={(e) => setSearchKeyword(e.target.value)} />

        <div onClick={onSearchClick}>검색</div>
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
