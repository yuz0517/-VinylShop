import styled, { createGlobalStyle } from "styled-components";

const scaleY = 1.2;
const calcScaleY = 1 / 1.2;
export const Div_flex = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
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
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
`;
export const RealseContainer = styled.div`
  background: ${(props) => props.background};

  place-content: center;
  background-image: radial-gradient(#a39fff 0.5px, transparent 0);
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
    width: 33.33%;
    float: left;
  }
`;
export const HoverContainer = styled.div`
  width: 100%;
  height: 100%;
  background: none;
  transition: background 0.3s ease, transform 0.3s ease;

  transform-origin: top;

  &:hover {
    transform: scaleY(${scaleY});
    transition: transform 0.8s ease;
    transform-origin: top;
    background: #ffdada;
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
    margin-top: 39px;
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
  width: 100px;
  height: 100px;
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-80%, -50%);
  transition: transform 0.8s ease;
  z-index: 0;

  ${RealseContainer}:hover & {
    transform: translate(-50%, -50%);
    transition: transform 0.8s ease;
  }
`;

export const AlbumWrapper = styled.img`
  width: 100px;
  height: 100px;

  position: relative;
  z-index: 1;

  ${RealseContainer}:hover & {
    transform: translate(-10%, 0%);
    transition: transform 0.8s ease;
  }
`;

