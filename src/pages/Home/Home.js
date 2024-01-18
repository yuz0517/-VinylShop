import React from "react";

import { LeftContainer, RightContainer, Div_flex } from "../../styled-component/homeStyle";
import NewRelease from "./NewRelease";
import Intro from "./Intro";

function Home() {
  return (
    <Div_flex>
      <NewRelease/>
      <Intro/>
    </Div_flex>
  );
}

export default Home;
