import React from "react";
import { Outlet } from "react-router-dom";

function Mypage_Main() {
  console.log("mypagemain");
  return (
    <>
      <div>Mypage_Main</div>
      <Outlet></Outlet>
    </>
  );
}

export default Mypage_Main;
