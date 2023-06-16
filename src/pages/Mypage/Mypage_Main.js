import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Mypage from "./Mypage";
import { Tab } from "bootstrap";
import styles from './Mypage_Main.module.css'
import Board_Mine from "../Board/Board_Mine";
function Mypage_Main() {
  let [nav, setNav] = useState(0);
  console.log("mypagemain");

  
  return (
    <>
      
      <Nav className={styles.navtabs}fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="link-0"onClick={() => {setNav(0)}} > 기본 정보 수정</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={() => {setNav(1)}} >주문 내역</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" onClick={() => {setNav(3)}} > ❤️ </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3" onClick={() => {setNav(4)}} > 작성한 글 </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item> */}
    </Nav>
    <TabContent nav={nav}> </TabContent>
      <Outlet></Outlet>
    </>
  );
}

function TabContent(props){
  if(props.nav === 0){
    return <Mypage></Mypage>
  }else if(props.nav === 1 ){
    return <div>1</div>

  }else if(props.nav === 4){
    return <Board_Mine></Board_Mine>
  }
}

export default Mypage_Main;
