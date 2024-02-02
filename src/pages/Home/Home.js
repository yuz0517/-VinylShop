import React from "react";

import { LeftContainer, RightContainer, Div_flex } from "../../styled-component/homeStyle";
import NewRelease from "./NewRelease";
import Intro from "./Intro";
import ShopInfo from "./ShopInfo";

function Home() {
  return (
    <Div_flex>
      <NewRelease/>
      
      <Intro/>
      
      <ShopInfo/>
    </Div_flex>
  );
}

export default Home;
