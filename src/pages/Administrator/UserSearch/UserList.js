import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { auth } from "../../../firebase";
import { getAuth, deleteUser } from "firebase/auth";
import "firebase/compat/storage";
import "firebase/auth";
import firebase from "firebase/compat/app";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
//import  { firebase } from "firebase/app"
import Axios from "axios";
import List from "./List";

import {
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
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

  const [alignment, setAlignment] = useState("customer");
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

  const onToggleChange = (e, value) => {
    value === 0 ? setSelectedArray(customer) : setSelectedArray(admin);
    setSelectedListOption(value);
    console.log(selectedListOption);
  };
  const onSearchClick = () => {
    const isComplete =
      searchKeyword.length === 0
        ? alert("검색어를 한 글자 이상 입력 해 주세요.")
        : navigate("/admin/user/search", {
            state: {
              option: selectedSearchOption,
              searchKey: searchKeyword,
              listOption: selectedListOption,
            },
          });
  };

  const onSearchSelectChange = (e) => {
    e.target.value === "id"
      ? setSelectedSearchOption("PersonID")
      : e.target.value === "nickname"
      ? setSelectedSearchOption("Nickname")
      : setSelectedSearchOption("userID");
  };

  return (
    <div>
      <div>
  
        <FormControl sx={{ m: 0, minWidth: 120 }}>
          <InputLabel id="user-list-search-select-label">Option</InputLabel>
          <Select
            labelId="user-list-search-select-label"
            id="demo-controlled-open-select"
            label="Option"
            onChange={onSearchSelectChange}
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="id">고유번호</MenuItem>
            <MenuItem value="nickname">닉네임</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button variant="outlined" onClick={onSearchClick}>
          검색
        </Button>
      </div>
      <ToggleButtonGroup
        value={selectedListOption}
        onChange={onToggleChange}
        exclusive
        aria-label="Platform"
        color="primary"
      >
        <ToggleButton value={0} size="small">
          Customer
        </ToggleButton>
        <ToggleButton value={1} size="small">
          Admin
        </ToggleButton>
      </ToggleButtonGroup>

      <List dataArray={selectedArray} />
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
