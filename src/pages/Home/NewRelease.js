import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";
import {
  Flex1Container,
  RealseContainer,
  HoverContainer,
  Child,
  NextBtn,
  AlbumWrapper,
  VinylWrapper,
  VinylImg,
  Font12px_white,
  VerticalCenter,
  NextRightBtn,
  NextRightWrapper,
  VerticalRightCenter
} from "../../styled-component/homeStyle";
import {
  ColumnCenter,
  Cylinder_Gray,
  Div_flex,
  Font12px_darkgray,
  FlexCenter,
  Font15px_bold,
  Font15px_darkgray,
  Font_bold,
  Transparent_btn,
} from "../../styled-component/style";
import VinylImage from "./../../assets/Vinyl.png";
import TestImage from "./../../assets/Capsule.png";
import "./NewRelease.css";

function NewRelease() {
  const backgroundColor = "#6BE7FF";
  const border = "1.5px solid white";
  const none = "none";
  const [newVinylData, setNewVinylData] = useState([]);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/vinyl/new", {}).then((res) => {
      setNewVinylData([...res.data]);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400&display=swap"
          rel="stylesheet"
        />
        <style>{`
                    .VinylTitle { font-family: 'Oswald', sans-serif; font-size: 20px; color: white;}
                    .VinylPrice { font-family: 'Oswald', sans-serif; font-size: 12px; color: white;}
                    .viewAll { font-family: 'Oswald', sans-serif; font-size: 12px; color: white; padding: 5px; border: 1px solid white; cursor: pointer;}
                    .viewAll:hover {
                      background-color: #white; /* hover 시 배경 색상 변경 */
                      color: 6BE7FF; /* hover 시 글자 색상 변경 */
                    }
                  `}</style>
      </Helmet>

      {newVinylData &&
        newVinylData.reverse().map((item, idx) => {
          if (idx / 3 == 0) {
            const sliceData = newVinylData.slice(idx, idx + 3);

            return (
              <Flex1Container>
                {sliceData.map((item, idx) => {
                  return (
                    <RealseContainer background={backgroundColor}>
                      <HoverContainer>
                        {idx == 0 ? (
                          <VerticalCenter>
                            <NextBtn>{`<`}</NextBtn>
                          </VerticalCenter>
                        ) : (
                          <></>
                        )}

                        <Child>
                          <ColumnCenter>
                            <Div_flex>
                              <AlbumWrapper src={item.img0} alt="testimg" />
                              <VinylWrapper>
                                <VinylImg
                                  className="vinylimage"
                                  src={VinylImage}
                                  alt="VinylRecord"
                                />
                              </VinylWrapper>
                            </Div_flex>
                            <p className="VinylTitle">{item.artist}</p>
                            <Font12px_white>{item.title}</Font12px_white>
                            <p className="VinylPrice">{"₩" + item.price}</p>
                            <p className="viewAll">View all</p>
                          </ColumnCenter>
                          {idx == 2 ? (
                            <VerticalRightCenter>
                            <NextRightBtn>{`>`}</NextRightBtn></VerticalRightCenter> ) : (<></>)
                    
                          }
                        </Child>
                        
                      </HoverContainer>
                    </RealseContainer>
                  );
                })}
              </Flex1Container>
            );
          }
        })}

      {/* <Title>New Release</Title> */}
    </>
  );
}

export default NewRelease;
