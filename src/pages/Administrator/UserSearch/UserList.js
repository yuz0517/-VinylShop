import React, { useState, useEffect } from "react";
import Axios from "axios";
import { HiChevronUpDown } from "react-icons/hi2";
function UserList() {
  const [user, setUser] = useState([]);

  const [SortNO, setSortNO] = useState(0);
  const [SortNAME, setSortNAME] = useState(0);
  const [SortEMAIL, setSortEMAIL] = useState(0);
  const [SortDATE, setSortDATE] = useState(0);
  useEffect(() => {
    Axios.get("http://localhost:8000/api/admin/getuser", {})
      .then((res) => {
        setUser([...res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const onSortNOClick = () => {
    setSortNO(!SortNO);
    SortNO
      ? setUser((prevUser) => [
          ...prevUser.sort((a, b) => b.PersonID - a.PersonID),
        ])
      : setUser((prevUser) => [
          ...prevUser.sort((a, b) => a.PersonID - b.PersonID),
        ]);
  };
  const onSortNAMEClick = () => {
    console.log("눌림")
    setSortNAME(!SortNAME);
    SortNAME
      ? setUser((prevUser) => [
          ...prevUser.sort((a, b) => a.Nickname.localeCompare(b.Nickname)),
        ])
      : setUser((prevUser) => [
          ...prevUser.sort((a, b) => b.Nickname.localeCompare(a.Nickname)),
        ]);
  };
  const onSortEMAILClick = () => {
    setSortEMAIL(!SortEMAIL);
    SortEMAIL
      ? setUser((prevUser) => [
          ...prevUser.sort((a, b) => a.userID.localeCompare(b.userID)),
        ])
      : setUser((prevUser) => [
        ...prevUser.sort((a, b) => b.userID.localeCompare(a.userID)),
        ]);
  };
  const onSortDATEClick = () => {
    setSortDATE(!SortDATE);
    SortDATE
      ? setUser((prevUser) => [
          ...prevUser.sort((a, b) => a.userID.localeCompare(b.userID)),
        ])
      : setUser((prevUser) => [
        ...prevUser.sort((a, b) => b.userID.localeCompare(a.userID)),
        ]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={onSortNOClick}>
              NO <HiChevronUpDown onClick={onSortNOClick} />
            </th>
            <th onClick={onSortNAMEClick}>NAME <HiChevronUpDown onClick={onSortNAMEClick} /></th>
            <th onClick={onSortEMAILClick}>EMAIL <HiChevronUpDown onClick={onSortEMAILClick} /></th>
            <th onClick={onSortEMAILClick}>EMAIL <HiChevronUpDown onClick={onSortEMAILClick} /></th>
            <th>OPTIONS</th>
          </tr>
        </thead>

        <tbody>
          {user.map((item) => {
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
