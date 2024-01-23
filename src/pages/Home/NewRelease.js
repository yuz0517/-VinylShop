import React, { useState } from "react";
import {
  Flex1Container,
  RealseContainer,
  HoverContainer,
  Child,
  Title,
  AlbumWrapper,
  VinylWrapper,
  VinylImg,
} from "../../styled-component/homeStyle";
import {
  ColumnCenter,
  Cylinder_Gray,
  Div_flex,
  Font12px_darkgray,
  Font13px_darkgray,
  Font15px_bold,
  Font15px_darkgray,
  Font_bold,
  Transparent_btn,
} from "../../styled-component/style";
import VinylImage from "./../../assets/Vinyl.png";
import TestImage from "./../../assets/Capsule.png";
import "./NewRelease.css";

function NewRelease() {
  const backgroundColor = "#C5C3FF";
  const border = "1.5px solid white";
  const none = "none";

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  return (
    <>
      <Flex1Container>
        <RealseContainer background={backgroundColor}>
          <HoverContainer>
            <Child>
              <ColumnCenter>
                <Div_flex>
                  <AlbumWrapper src={TestImage} alt="testimg" />
                  <VinylWrapper>
                    <VinylImg
                      className="vinylimage"
                      src={VinylImage}
                      alt="VinylRecord"
                    />
                  </VinylWrapper>
                </Div_flex>
                <Font15px_bold>Jayuro</Font15px_bold>
                <Font13px_darkgray>Minecraftworld</Font13px_darkgray>
                <Font12px_darkgray>$10000</Font12px_darkgray>
                <Cylinder_Gray>View all</Cylinder_Gray>
              </ColumnCenter>
            </Child>
          </HoverContainer>
        </RealseContainer>
        <RealseContainer background={backgroundColor}>
          <HoverContainer>
          <Child>
              <ColumnCenter>
                <Div_flex>
                  <AlbumWrapper src={TestImage} alt="testimg" />
                  <VinylWrapper>
                    <VinylImg
                      className="vinylimage"
                      src={VinylImage}
                      alt="VinylRecord"
                    />
                  </VinylWrapper>
                </Div_flex>
                <Font15px_bold>Jayuro</Font15px_bold>
                <Font13px_darkgray>Minecraftworld</Font13px_darkgray>
                <Font12px_darkgray>$10000</Font12px_darkgray>
                <Cylinder_Gray>View all</Cylinder_Gray>
              </ColumnCenter>
            </Child>
          </HoverContainer>
        </RealseContainer>
        <RealseContainer background={backgroundColor}>
          <HoverContainer>
          <Child>
              <ColumnCenter>
                <Div_flex>
                  <AlbumWrapper src={TestImage} alt="testimg" />
                  <VinylWrapper>
                    <VinylImg
                      className="vinylimage"
                      src={VinylImage}
                      alt="VinylRecord"
                    />
                  </VinylWrapper>
                </Div_flex>
                <Font15px_bold>Jayuro</Font15px_bold>
                <Font13px_darkgray>Minecraftworld</Font13px_darkgray>
                <Font12px_darkgray>$10000</Font12px_darkgray>
                <Cylinder_Gray>View all</Cylinder_Gray>
              </ColumnCenter>
            </Child>
          </HoverContainer>
        </RealseContainer>
      </Flex1Container>
      {/* <Title>New Release</Title> */}
    </>
  );
}

export default NewRelease;
