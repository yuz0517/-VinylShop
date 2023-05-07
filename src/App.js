import React, { useState } from "react";
//import { Route } from 'react-router-dom';
import "./App.css";
import Mypage_Main from "./pages/Mypage/Mypage_Main";
import Mypage from "./pages/Mypage/Mypage";
import Home from "./pages/Home";
import Bookmark from "./pages/Bookmark";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Board_write from "./pages/Board/Board_write";
import Board_Main from "./pages/Board/Board_Main";
import Board_View from "./pages/Board/Board_View";
import Signin from "./pages/Signin";
import Search from "./pages/Search/Search";
import { Context } from "./components/ContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [sessionUsername, setSessionUsername] = useState(""); //작성자 등록
  const [prevPagenation,setPrevpagenation] = useState(1);
  return (
    <>
      <Router>
        <Context.Provider
          value={{
            isLoggedIn,setIsloggedIn,
            sessionUsername,setSessionUsername,
            prevPagenation,setPrevpagenation,
          }}
        >
          <Navbar />

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Mypage" element={<Mypage_Main/>}>
              <Route path="myinfo" element={ <Mypage/>} />
            </Route>
            <Route path="/Bookmark" element={<Bookmark/>} />
            <Route path="/Signup" element={<Signup/>} />
            <Route path="/Board" element={<Board_Main/>} />
            <Route path="/Board-write" element={<Board_write/>} />
            <Route path="/Board-view/:no" element={<Board_View/>} />
            <Route path="/Signin" element={<Signin/>} />
            <Route path="/Search/:no" element={<Search/>} />
          </Routes>
        </Context.Provider>
      </Router>
    </>
  );
}

export default App;
