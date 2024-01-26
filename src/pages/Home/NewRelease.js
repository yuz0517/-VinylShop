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
  VerticalRightCenter,
  ColumnCenter,
} from "../../styled-component/homeStyle";
import {
  Div_flex,
} from "../../styled-component/style";
import VinylImage from "./../../assets/Vinyl.png";
import TestImage from "./../../assets/Capsule.png";
import "./NewRelease.css";

function NewRelease() {
  const backgroundColor = "#6BE7FF";
  const border = "1.5px solid white";
  const none = "none";
  const [newVinylData, setNewVinylData] = useState([]);
  const [vinylId, setVinylId] = useState(0);
  const [vinylStartId, setVinylStartId] = useState(0);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/vinyl/new", {}).then((res) => {
      setNewVinylData([...res.data]);
      console.log(res.data);
    });
  }, []);

  const onLeftClick = (()=>{
    if(vinylStartId-3>=0){
      setVinylStartId(vinylStartId-3)
  }else setVinylStartId(6)
  console.log("left",vinylStartId)
  });

  const onRightClick = (()=>{
 
    //right click이 될 때마다 3씩 더함 근데 더한 값이 __ 값 이상이 되는지 검사해서 범위 넘으면 다시 0으로 초기홯마
    if(vinylStartId+3<7){
        setVinylStartId(vinylStartId+3)
    }else setVinylStartId(0)
    console.log("right",vinylStartId)
  })
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
        newVinylData.map((item, idx) => {
          if (idx / 3 === 0) {
            const sliceData = newVinylData.slice(vinylStartId, vinylStartId + 3);
          console.log(sliceData)
            return (
              <Flex1Container key={item.id}>
                {sliceData.map((item, idx) => {
                  return (
                    <RealseContainer background={backgroundColor} key={item.id}>
                      <HoverContainer>
                        {idx == 0 ? (
                          <VerticalCenter>
                            <NextBtn onClick={onLeftClick}>{`<`}</NextBtn>
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
                            <NextRightBtn onClick={onRightClick}>{`>`}</NextRightBtn></VerticalRightCenter> ) : (<></>)
                    
                          }
                        </Child>
                        <NextRightWrapper></NextRightWrapper>
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
