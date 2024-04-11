import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Div_flex,
  InputMini,
  ModalInput_tpr,
  Cylinder_Gray,
} from "../../styled-component/style";
import {
  Flex2Container,
  ColumnCenter,
  LeftArticleContainer,
  RightArticleContainer,
  ArticleBigContainer,
  ArticleImage,
  Title,
  ArticleTitle,
  Font20px_white,
  FontMiddleWrapper,
  NewsLetterBtn,
  FontBig,
  FontMiddle,
  MailBoxIcon,
  FontMiddle_left,
  FontSmall,
} from "../../styled-component/homeStyle";
import NewRelease from "./NewRelease";
import a1 from "../../assets/article1.png";
import a2 from "../../assets/article2.png";
import a3 from "../../assets/article3.png";

function Intro() {
  const [subscribeName, setSubscribeName] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");

  const onSubsNameChange = (e) => {
    console.log(e.target.value);
    setSubscribeName(e.target.value);
  };
  const onSubsEmailChange = (e) => {
    console.log(e.target.value);
    setSubscribeEmail(e.target.value);
  };

  const onSubsClick = (e) => {
    Axios.post("http://localhost:8000/api/intro/subscribe", {
       email: subscribeEmail, name: subscribeName 
    })
      .then((res) => {
        if(res.data.errno===1062){
          alert("이미 구독 등록되어있는 메일입니다.");
          console.log(res)
        }else {
          alert("구독 완료되었습니다.")
          console.log(res)
        }
      })
      .catch((err) => {
        console.error(err)
      });
  };
  const background = "#B5B7CD";
  return (
    <div
      style={{
        background: "black",
        padding: "30px 20px 20px 20px",
        minWidth: "0px",
      }}
    >
      <Flex2Container background="#000000">
        <LeftArticleContainer>
          <FontBig>매거진</FontBig>
          <ArticleBigContainer>
            <Div_flex style={{ marginBottom: "10px" }}>
              <ArticleImage src={a1}></ArticleImage>
              <FontMiddleWrapper>
                <FontMiddle_left>
                  도쿄 중고 바이닐샵 추천 - 디깅 최적의 장소 TOP 5
                </FontMiddle_left>
                <FontSmall>
                  일본 도쿄에는 중고 바이닐 레코드샵이 많다. 재즈, 힙합, 락 등
                  다양한 음반들을 취급하고 있는 레코드샵을 소개한다.
                </FontSmall>
              </FontMiddleWrapper>
            </Div_flex>
            <Div_flex style={{ marginBottom: "10px" }}>
              <ArticleImage src={a3}></ArticleImage>
              <FontMiddleWrapper>
                <FontMiddle>죽기 전에 꼭 들어야 할 시티팝 음반들</FontMiddle>
                <FontSmall>
                  시티팝에 입문하고 싶은데, 어떤 음반부터 들을지 막막하다면 이
                  글을 참고해주세요.
                </FontSmall>
              </FontMiddleWrapper>
            </Div_flex>
            <Div_flex style={{ marginBottom: "10px" }}>
              <ArticleImage src={a2}></ArticleImage>
              <FontMiddleWrapper>
                <FontMiddle_left>
                  중고 레코드 관련 용어 모음집.zip
                </FontMiddle_left>
                <FontSmall>
                  NM, VG 등 그냥 봐서는 모르는 레코드 용어를 소개합니다.
                </FontSmall>
              </FontMiddleWrapper>
            </Div_flex>
          </ArticleBigContainer>
        </LeftArticleContainer>
        <RightArticleContainer>
          <ColumnCenter>
            <FontBig>뉴스레터 구독하기</FontBig>
            <MailBoxIcon />
            <FontMiddle>
              YUZ Vinyl의 새로 업데이트된 바이닐 소식과 음악 관련 소식들을
              메일함으로 보내드려요
            </FontMiddle>
            <ModalInput_tpr
              style={{ marginBottom: "10px" }}
              placeholder="이름"
              onChange={(e) => onSubsNameChange(e)}
            />
            <ModalInput_tpr
              placeholder="Email"
              onChange={(e) => onSubsEmailChange(e)}
            />
            <NewsLetterBtn onClick={onSubsClick}>구독하기</NewsLetterBtn>
          </ColumnCenter>
        </RightArticleContainer>
      </Flex2Container>
    </div>
  );
}

export default Intro;
