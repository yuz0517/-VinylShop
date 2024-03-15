import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { auth } from "../../../firebase";
import { getAuth, deleteUser } from "firebase/auth";
import "firebase/compat/storage";
import "firebase/auth";
import firebase from "firebase/compat/app";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
//import  { firebase } from "firebase/app"
import Axios from "axios";

import {
  HiChevronUpDown,
  HiPencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3, //여백
};
function List(props) {
  console.log(props.dataArray);
  const [selectedArray, setSelectedArray] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [sortNO, setSortNO] = useState(0);
  const [sortNAME, setSortNAME] = useState(0);
  const [sortEMAIL, setSortEMAIL] = useState(0);
  const [sortDATE, setSortDATE] = useState(0);
  const [checkedData, setCheckedData] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedArray(props.dataArray);
  }, [props.dataArray]);
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
  const onDeleteOptionClick = (e) => {
    const email = e.userID;
    const name = e.Nickname;
    setSelectedUser(e);
    setSelectedUserName(name);
  };

  const onDeleteClick = async (e) => {
    // const email = e.userID;
    // const name = e.Nickname;
    // setSelectedUser(e);
    // setSelectedUserName(name);
    const email = selectedUser.userID;
    try {
      console.log(selectedUser.userID);
      const firebaseDeleteResponse = await fetch(
        "http://localhost:8000/users/api/admin/user/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify({ email }),
        body: JSON.stringify({ email }),
        }
      );
      const data = await firebaseDeleteResponse.json();

      //   if (data.success) {

      try {
        const dbDeleteResponse = await Axios.delete(
          "http://localhost:8000/api/admin/user/delete",
          {
            data: { id: email },
          }
        );

        console.log(selectedArray.filter((item) => item.userID !== email));
        setSelectedArray(selectedArray.filter((item) => item.userID !== email));
        alert("삭제 완료되었습니다.");
        handleClose();
      } catch (err) {
        console.log("db에러");
        console.log(err.message);
      }
    } catch (err) {
      console.error(err.message);
    }
    //   } else {
    //     console.error(data.error);
    //   }
  };

  const createHandleMenuClick = (menuItem) => {
    console.log(`Clicked on ${menuItem}`);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Checkbox</th>
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
                <td>
                  <Checkbox onChange={() => console.log(item)} label="Label" />
                </td>
                <td>{item.PersonID}</td>
                <td>{item.Nickname}</td>
                <td>{item.userID}</td>
                <td>{kst}</td>
                <td>
                  <Dropdown>
                    <MenuButton>
                      <KeyboardArrowDownIcon />
                    </MenuButton>
                    <Menu slots={{ listbox: AnimatedListbox }}>
                      <MenuItem onClick={() => createHandleMenuClick("edit")}>
                        <div
                          onClick={() => {
                            onEditClick(item);
                          }}
                        >
                          정보 수정
                        </div>
                      </MenuItem>
                      <MenuItem onClick={() => createHandleMenuClick("delete")}>
                        <div
                          open={open}
                          onClose={handleClose}
                          onClick={() => {
                            handleOpen(); onDeleteOptionClick(item);
                          }}
                        >
                          사용자 삭제
                        </div>
                      </MenuItem>
                    </Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Button>CSV</Button>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            Warning: 사용자 삭제
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 0.5 }}>
            이 동작은 사용자 {selectedUserName}를 firebase와 database에서 완전히
            삭제합니다. 삭제를 원하시면 'Yes' 취소를 원하시면 'Cancel'를
            클릭해주세요.
          </Typography>
          <Button onClick={() => {onDeleteClick()}}>Yes(삭제)</Button>{" "}
          <Button onClick={handleClose}>cancel(취소)</Button>
        </Box>
      </Modal>
    </>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      "The `AnimatedListbox` component cannot be rendered outside a `Popup` component"
    );
  }

  const verticalPlacement = popupContext.placement.split("-")[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
};

const Listbox = styled("ul")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 100px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? grey[900] : grey[200]
    };
    z-index: 1;
  
    .closed & {
      opacity: 10;
      transform: scale(0.95, 0.8);
      transition: opacity 200ms ease-in, transform 200ms ease-in;
    }
    
    .open & {
      opacity: 1;
      transform: scale(1, 1);
      transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
    }
  
    .placement-top & {
      transform-origin: bottom;
    }
  
    .placement-bottom & {
      transform-origin: top;
    }
    `
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
    list-style: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
    background: #ffffff;
    font-size: 13px;
   
    &:last-of-type {
      border-bottom: none;
    }
  
    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
    `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: none;
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    {/*box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);*/}
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === "dark" ? blue[300] : blue[200]
      };
      outline: none;
    }
    `
);

export default List;
