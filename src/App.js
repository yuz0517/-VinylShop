import React, { useState } from "react";
//import { Route } from 'react-router-dom';
import "./App.css";
import Mypage_Main from "./pages/Mypage/Mypage_Main";
import Mypage from "./pages/Mypage/Mypage";
import Home from "./pages/Home/Home";
import Vinyl from "./pages/Vinyl";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Board_write from "./pages/Board/Board_write";
import Board_Mine from "./pages/Board/Board_Mine";
import Board_Main from "./pages/Board/Board_Main";
import Board_View from "./pages/Board/Board_View";
import Board_Update from "./pages/Board/Board_Update";
import Signin from "./pages/Signin";
import Search from "./pages/Search/Search";
import { Context } from "./components/ContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Item from "./pages/Vinyl/Item";
import Cart from "./pages/Cart/Cart";
import Orderdetail from "./pages/OrderSubmit/Orderdetail";
import Point from "./pages/Mypage/Point";
import AdminMain from "./pages/Administrator/AdminMain";
import AdminLogin from "./pages/Administrator/AdminLogin";
import UserSearchContainer from "./pages/Administrator/UserSearch/UserSearchContainer";
import Menubar from "./pages/Administrator/Menubar";
import UserEdit from "./pages/Administrator/UserSearch/UserEdit";
import { Div_flex } from "./styled-component/homeStyle";

function App() {
  const isAdminOpen = window.location.pathname.startsWith("/admin");
  const isAdminSigninOpen =
    window.location.pathname.startsWith("/signin/admin");
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [sessionUserid, setSessionUserid] = useState(""); //작성자 등록
  const [prevPagenation, setPrevpagenation] = useState(1);
  return (
    <>
      <Router>
        <Context.Provider
          value={{
            isLoggedIn,
            setIsloggedIn,
            sessionUserid,
            setSessionUserid,
            prevPagenation,
            setPrevpagenation,
          }}
        >
          {isAdminOpen ? (
            <>
              <Menubar />
              <Routes>
                <Route path="/admin" element={<AdminMain />} />

                <Route
                  path="/admin/user" element={<UserSearchContainer />}
                />
                <Route 
                  path="/admin/user/edit" element={<UserEdit/>}/>
              </Routes>
            </>
          ) : (
            <>
              {isAdminSigninOpen ? (
                <>
                <Routes>
                  <Route path="/signin/admin" element={<AdminLogin/>}/>
                </Routes>
                </>
              ) : (
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/Mypage" element={<Mypage_Main />}></Route>
                    <Route path="/profile" element={<Mypage />} />
                    <Route path="/point" element={<Point />} />
                    <Route path="/vinyl" element={<Vinyl />}></Route>
                    <Route path="/vinyl/:id" element={<Item />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Board" element={<Board_Main />} />
                    <Route path="/Board-write" element={<Board_write />} />
                    <Route path="/Board-view/:no" element={<Board_View />} />
                    <Route path="/Board/update" element={<Board_Update />} />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/Search/:no" element={<Search />} />
                    <Route path="/Search/mine" element={<Board_Mine />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orderdetail" element={<Orderdetail />} />
                  </Routes>
                </>
              )}
            </>
          )}
        </Context.Provider>
      </Router>
    </>
  );
}

export default App;
