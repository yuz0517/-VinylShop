import styled from "styled-components";
/* 정렬,레이아웃 */
export const Fixed = styled.div`
  position: fixed;
 
`
export const Scroll = styled.div`
  overflow-y:auto;
  max-height: 40vh;
`
export const Section = styled.div`
  background-color: white;
  width: auto
  margin-bottom: 10px;
`;
export const Div_all=styled.div`
background-color: #ffffff;
width:quto;
place-content:center;
flex-direction: column;
margin: auto;
display: grid;

`
export const Div_all_flex=styled.div`
background-color: #ffffff;
width:100%;
place-content:center;


display: flex;

`
export const Div_flex_column = styled.div`
  display: flex;
  flex-direction: column;
  
  width: ${(props)=>props.width};
  margin-right: ${(props)=>props.margin_right};
  margin-left: ${(props)=>props.margin_left};
`;
export const Div_flex = styled.div`
  display: flex;
  justify-content: ${(props)=>props.justifycontent};
  margin-bottom: ${(props)=>props.marginbottom};
`;
export const Image = styled.img`
  width: ${(props)=>props.width};
  height: ${(props)=>props.width};
  margin-right: ${(props)=>props.margin_right};
`;
export const Font15px_bold = styled.div`
  font-size: 15px;
  font-weight: 600;
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
  margin-right: 5px;
`;
export const Font14px_darkgray = styled.div`
  font-size: 15px;
  color: #545454; 
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 5px;
  font-weight: 400;
`;
export const Font14px_black = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 5px;
  font-weight: 400;
`;
export const Font15px_darkgray = styled.div`
  font-size: 15px;
  color: #545454; 
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 5px;
`;

export const Font_bold = styled.div`
    font-size: ${(props)=>props.fontsize};
    font-weight:600;
    margin-bottom: 5px;
    margin-top: 5px;
    color: ${(props)=>props.color};
`;
export const B = styled.div`
  padding-left: 1.2em;
`;
/* input */
export const Input_Rect_transparent = styled.input`
  width: ${(props)=>props.width};
  height: 43px;
  margin-bottom: ${(props)=>props.marginbottom};
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  padding: 7px;
  padding-left: 10px;
  padding-right: 10px;
  font-size:15px;
`;
/* select*/
export const Select_Rect_transparent = styled.select`
  width: 80%;
  height: 43px;
`;
/* btn */

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

export const Radius_btn = styled.div`
  cursor: pointer;
  border: ${(props)=>props.border};
  height: ${(props)=>props.height};
  width: auto;
  font-size: ${(props)=>props.font_size};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  margin-bottom: 1px;
  background: ${(props)=>props.background};
  
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 1px;
  font-weight: 600;
  
`;
export const Transparent_btn = styled.div`
  cursor: pointer;
  border: ${(props)=>props.border};
  height: ${(props)=>props.height};
  width: auto;
  font-size: ${(props)=>props.font_size};
  color:${(props)=>props.font_color};
  display: flex;
  float:right;
  margin-left: 5px;
  margin-right: 5px;
  background: none;
  padding-top: 1px;
  font-weight: 500;
  
`;


