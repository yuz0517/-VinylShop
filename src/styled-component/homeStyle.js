import styled from "styled-components";
export const Div_flex = styled.div`
  display:flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`
export const Flex1Container = styled.div`
  background: ${(props) => props.background};; 
  flex: 1;
  display:flex;
  

`;
export const RealseContainer = styled.div`
  background: ${(props) => props.background};; 
  flex: 1;
  display:flex;
  transition: background 0.3s ease, transform 0.3s ease;
  transform-origin: top;

  
  &:hover {
    transform: scaleY(1.2);
    background: #FFDADA;
  }

`;
