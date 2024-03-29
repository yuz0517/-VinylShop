import styled, { createGlobalStyle } from "styled-components";
import { GiMailbox } from "react-icons/gi";
const scaleY = 1.2;
const calcScaleY = 1 / 1.2;
const albumSize1 = "100px";
const albumSize2 = "170px";
const albumSize3 = "140px";
const albumSize4 = "100px";

export const Div_flex = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 300px) {
    flex-direction: none;
  }
  @media (max-width: 768px) {
    flex-direction: none;
  }
`;
export const Flex1Container = styled.div`
  background: ${(props) => props.background};
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  width: 100%;
  padding: 20px;
`;
export const Flex2Container = styled.div`
  background: ${(props) => props.background};
  flex: 1;
  
  flex-wrap: wrap;
  gap: 1px;
  width: 100%;

 
  @media (min-width: 500px) {
    display: flex;
  }
`;
export const RealseContainer = styled.div`
  background: ${(props) => props.background};

  place-content: center;
  background-image: radial-gradient(#b3e9ff 0.5px, transparent 0);
  background-size: 4px 4px;

  flex: 1;
  display: flex;
  transition: background 0.3s ease, transform 0.3s ease;
  transform-origin: top;
  border-left: ${(props) => props.borderleft};
  border-right: ${(props) => props.borderright};

  width: 100%;
  float: none;

  flex-basis: 200px;
  flex-grow: 1;

  @media screen and (min-width: 700px) {
    float: left;
  }
`;
export const HoverContainer = styled.div`
  width: 100%;
  height: 100%;
  background: none;
  transition: background 0.3s ease, transform 0.3s ease;
  position: relative;

  transform-origin: top;

  &:hover {
    transform: scaleY(${scaleY});
    transition: transform 0.8s ease;
    transform-origin: top;
    background: #ff94ad;
    background-image: radial-gradient(#ffb6b6 0.5px, transparent 0);
    background-size: 4px 4px;
    background-position: 0px 0px;
    border-left: ${(props) => props.hoverBorderleft};
    border-right: ${(props) => props.hoverBorderright};
  }
`;

// &:hover {
//     transform: scaleY(${scaleY});
//     background: #ffdada;
//     background-image: radial-gradient(#ffb6b6 0.5px, transparent 0);
//     background-size: 4px 4px;
//     background-position: -19px -19px;
//     border-left: ${(props) => props.hoverBorderleft};
//     border-right: ${(props) => props.hoverBorderright};
//   }

export const Child = styled.div`
  margin-top: 60px;
  ${RealseContainer}:hover & {
    transform: scaleY(${calcScaleY});
    transition: transform 0.8s ease;
    margin-top: 31px;
  }
`;

export const Title = styled.div`
  position: fixed;
  top: 15%; /* 페이지 상단에서 50% 위치로 조정 */
  left: 50%; /* 페이지 좌측에서 50% 위치로 조정 */
  transform: translate(-50%, -50%); /* 요소의 중앙 정렬을 위해 사용 */
  padding: 10px; /* 필요한 경우 패딩 설정 */
  font-size: 30px;

  @media (min-width: 300px) {
    font-size: 10px;
  }
  @media (min-width: 412px) {
    font-size: 20px;
  }
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;
export const VinylWrapper = styled.div`
  position: relative;
  z-index: 0;
`;
export const VinylImg = styled.img`
  width: ${albumSize1};
  height:  ${albumSize1};
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-80%, -50%);
  transition: transform 0.8s ease;

  ${RealseContainer}:hover & {
    transform: translate(-70%, -50%);
    transition: transform 0.8s ease;
  }
  @media (min-width: 300px) {
    width: 140px;
    height: 140px;
  }
  @media (min-width: 412px) {
    width:100px;
    height:100px;
  }
  @media (min-width: 768px  ) {
    width:180px;
    height: 180px;

  @media (min-width:1350px){
    width: 250px;
    height: 250px;
  }
`;

export const AlbumWrapper = styled.img`
  width:  ${albumSize1};
  height:  ${albumSize1};

  position: relative;
  z-index: 1;

  ${RealseContainer}:hover & {
    transform: translate(-25%, 0%);
    transition: transform 0.8s ease;
  }
  @media (min-width: 300px) {
    width: 140px;
    height: 140px;
  }
  @media (min-width: 412px) {
    width:100px;
    height:100px;
  }
  @media (min-width: 768px  ) {
    width:180px;
    height: 180px;

  @media (min-width:1350px){
    width: 250px;
    height: 250px;
  }
`;

export const Absolute = styled.div`
  position: absolute;
`;
export const NextRightWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  border: 3px border black;
  width: 100%;
  height: 100%;
`;
export const VerticalCenter = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
`;
export const VerticalRightCenter = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  right: 0%;
`;
export const ViewBtnWrapper = styled.div`
  display: none;
  ${RealseContainer}:hover & {
    position: absolute;
    display: flex;
    top: 80%;
    left: 45%;
    width: 50px;
    transform: scaleY(${calcScaleY});
    transition: transform 0.9s ease;
    cursor: pointer;
  }
`;
export const Font20px_white = styled.div`
  color: white;
  font-size: 20px;
`;
export const Font12px_white = styled.div`
  color: white;
  font-size: 12px;
`;
export const NextBtn = styled.div`
  border: 1.5px solid white;
  color: white;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  ${RealseContainer}:hover & {
    transform: scaleY(${calcScaleY});
    transition: transform 0.8s ease;
    cursor: pointer;
  }
  
`;
export const NextRightBtn = styled.div`
  border: 1.5px solid white;
  color: white;
  padding: 10px;
  cursor: pointer;

  z-index: 1;
  ${RealseContainer}:hover & {
    transition: transform 0.8s ease;
    transform: scaleY(${calcScaleY});
    cursor: pointer;
  }
`;
export const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  margin-top: ${(props) => props.margin_top};
  background: ${(props) => props.bg_color};
  border-radius: ${(props) => props.borderradius};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  z-index: 0;
  min-width:0px;
`;
/* ---스타일--- */
export const LeftArticleContainer = styled.div`
  flex: 0.6;
  position: relative;
  min-width: 0px;

`;
export const RightArticleContainer = styled.div`
  flex: 0.4;
  min-width: 0px;
  position: relative;
  min-width: 0px;
`;

export const ShopinfoWrapper = styled.div`
  margin-top: 20px;
  margin-left: 5px;
`;
//부모 컨테이너 안에 사진을 넣고 부모 크기를 벗어나면 안 보이도록 처리
export const ArticleImage = styled.img`
  width: 40vmin;
  height: 15vmin;
  object-fit: cover;
  position: relative;
`;
export const ArticleBigContainer = styled.div`

  width:100%





`;
export const NewsLetterContainer = styled.div`

  width:100%





`;

export const ArticleTitle = styled.div`
  word-break: break-all;
  width: 100%;
  position: absolute;
  font-size: 4vmin;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const NewsLetterBtn = styled.div`
  height: 43px;
  cursor: pointer;
  margin-top:20px;
  margin-bottom: ${(props) => props.marginbottom};
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  text-align: center;
  align-items:center;
  justify-content:center;
  padding-top:4px;
  display:flex;
  color:white;

  flex-direction: column;
  font-size: 2.5vmin;

  &:focus {
    border-color: #00efff; /* 포커스를 받았을 때의 색상으로 변경 */
    border: 2px solid #00efff;
    outline: none; /* 포커스 효과 제거 */
  }

  @media (min-width: 200px) {
    width: 130x;
  }
  @media (min-width: 300px) {
    width: 160x;
  }
  @media (min-width: 412px) {
    width: 250px;
  }
  @media (min-width: 768px) {
    width: 400px;
  }

  &:hover {
    transition: background 0.3s ease;
    color: #000000;
    background: #ff94ad;
  }
`;

export const FontBig = styled.p`
  font-size: 4vmin;
  color: #ffffff;
  margin-top: 57px;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

export const FontMiddle = styled.p`
  font-size: 2.5vmin;
  color: #ffffff;
  background-color: ${(props) => props.background};
  text-align:center;
  height: ${(props) => props.height}

  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
export const FontMiddle_left = styled.div`
  font-size: 2.5vmin;
  color: #ffffff;
  background-color: ${(props) => props.background};
  height: ${(props) => props.height}
  margin-right: 10px;
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
export const FontSmall = styled.p`
  font-size: 1.4vmin;
  color: #ffffff;
  background-color: ${(props) => props.background};
  
  height: ${(props) => props.height}

  @media (max-width: 500px) {
    font-size: 15px;
  }
  `
export const FontMiddleWrapper = styled.div`
  height: 15vmin;
  width:65vmin;
  background-color: #6C6D77;
  padding:10px;
`
 export const MailBoxIcon = styled(GiMailbox)`
  font-size:20vmin;
  color:#ffffff;

  ${NewsLetterBtn}:hover & {
    color: #ff94ad;
    font-size:100px;
  }

 `
