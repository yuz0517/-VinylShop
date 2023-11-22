import styled from "styled-components";
/* 정렬,레이아웃 */
export const Div_all=styled.div`
    background-color: #ffffff;
    width:80%;
    place-content:center;
    flex-direction: column;
    margin: auto;
    display: grid;
`
export const Div_flex_column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;
export const Div_flex = styled.div`
  display: flex;
  justify-content: ${(props)=>props.justifycontent};
`;
export const Image = styled.img`
  width: ${(props)=>props.width};
  height: ${(props)=>props.width};
  margin-right: ${(props)=>props.margin_right};
`;
export const Font15px_bold = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
`;
export const Font_plain = styled.div`
  margin-bottom: 5px;
  margin-top: 5px;
  color: ${(props)=>props.color};
`;
export const Font14px_gray = styled.div`
  font-size: 14px;
  color: #979797; 
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const Font_bold = styled.div`
    font-size: ${(props)=>props.fontsize};
    font-weight:bold;
    margin-bottom: 5px;
    margin-top: 5px;
    color: ${(props)=>props.color};
`;
export const B = styled.div`
  padding-left: 1.2em;
`;
/* input */
export const Input_Rect_transparent = styled.input`
  width: 80%;
  height: 43px;
`;
/* select*/
export const Select_Rect_transparent = styled.select`
  width: 80%;
  height: 43px;
`;
/* 도형 */

export const Cylinder_Gray = styled.div`
  cursor: pointer;
  border: 1px solid #dcdcdc;
  width: 30vh;
  height: 43px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 20px;
  margin-bottom: 5px;
`;
