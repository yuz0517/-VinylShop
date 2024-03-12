import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { auth } from "../../../firebase";
import { getAuth, deleteUser } from "firebase/auth";
import "firebase/compat/storage";
import "firebase/auth";
import firebase from "firebase/compat/app";

//import  { firebase } from "firebase/app"
import Axios from "axios";
import List from "./List";
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
  
  const [selectedArray, setSelectedArray] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedListOption, setSelectedListOption] = useState(0);
  const [selectedSearchOption, setSelectedSearchOption] = useState("userID");
  //let selectedArray = selectedValue === "admin" ? admin : customer;

  //selectedValue admin이면 admin배열을 넣고 아니면 customer 배열을 할당함.
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:8000/api/admin/getuser", {})
      .then((res) => {
        setCustomer([...res.data]);
        setSelectedArray([...res.data]);
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

  
  

  

 

  const onSelectChange = (e) => {
    if (e.target.value === "customer") {
      setSelectedArray(customer);
      setSelectedListOption("0");
    } else if (e.target.value === "admin") {
      setSelectedArray(admin);
      setSelectedListOption("1");
    }
  };
  const onSearchClick = () => {
    navigate("/admin/user/search", { state: { option: selectedSearchOption, searchKey: searchKeyword, listOption: selectedListOption } });
  };
  
  const onSearchSelectChange = (e) => {
    (e.target.value === 'id') ? setSelectedSearchOption("PersonID") :
    (e.target.value === 'nickname') ? setSelectedSearchOption("Nickname") : setSelectedSearchOption("userID");
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
      <List dataArray={selectedArray}/>
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
