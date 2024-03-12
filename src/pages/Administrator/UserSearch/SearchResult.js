import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchResult() {
  const location = useLocation();
  const searchKey = location.state.searchKey;
  const searchOption = location.state.option;
  const listOption = location.state.listOption;
  const [searchResult, setSearchResult] = useState([]);
  const [result, setResult] = useState([]);
  useEffect(() => {
    console.log(location.state.option, location.state.searchKey);
    const searchKey = location.state.searchKey;
    const searchOption = location.state.option;
    const listOption = location.state.listOption;
    console.log(searchKey, searchOption, listOption);
    Axios.get(`http://localhost:8000/api/admin/user/search/${searchKey}`, {
      params: {
        searchOption: location.state.option,
        searchKey: location.state.searchKey,
        listOption: listOption,
      },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        {searchKey}
        {searchOption}
        {listOption}에 대한 검색 결과입니다.
      </div>

      
    </>
  );
}

export default SearchResult;
