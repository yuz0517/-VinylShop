import styled from "styled-components";
/* hr */
/* 정렬,레이아웃 */
export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;
export const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => props.margin_top};
  background: ${(props) => props.bg_color};
  border-radius: ${(props) => props.borderradius};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
export const MarginLR = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
export const Fixed = styled.div`
  position: fixed;
`;
export const Address_Modal = styled.div`
  overflow-y: auto;
  max-height: 70vh;
  @media (min-width: 250px) {
    width: 240px;
  }
  @media (min-width: 300px) {
    width: 270px;
  }
  @media (min-width: 412px) {
    width: 350px;
  }
  @media (min-width: 768px) {
    width: 480px;
  }
`;

export const Inner_Container = styled.div`
  overflow-y: auto;
  background: ${(props) => props.background};;
  margin-bottom: 10px;
  margin-top: 10px;
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderradius};
  padding: ${(props) => props.padding};
  @media (min-width: 250px) {
    width: 200px;
    border: none;
    padding: 0px;
  }
  @media (min-width: 300px) {
    width: 280px;
    border: none;
    padding: 0px;
  }
  @media (min-width: 350px) {
    border: 1px solid #d8d8d8
    padding: 10px;
  }
  @media (min-width: 412px) {
    width: 350px;
    border: 1px solid #d8d8d8;
    padding: 13px;
  }
  @media (min-width: 768px) {
    width: 480px;
    padding: 15px;

  }
`;

export const Section = styled.div`
  background-color: white;
  width: auto;
  margin-bottom: 10px;
`;
export const Div_all_table = styled.div`
  background: ${(props) => props.background};
 
  place-content: center;
  flex-direction: column;
  margin: auto;
  padding: ${(props) => props.padding};


  @media (min-width: 250px) {
    width: 240px;
  }
  @media (min-width: 300px) {
    width: 290px;
  }
  @media (min-width: 412px) {
    width: 400x;
  }
  @media (min-width: 500px) {
    width: 490px;
  }
  @media (min-width: 768px) {
    width: 700px;
  }
  `
export const Div_all = styled.div`
  background: ${(props) => props.background};
  width: auto;
  place-content: center;
  flex-direction: column;
  margin: auto;
  padding: ${(props) => props.padding};
  display: grid;

  @media (min-width: 250px) {
    width: 240px;
  }
  @media (min-width: 300px) {
    width: 300px;
  }
  @media (min-width: 412px) {
    width: 370px;
  }
  @media (min-width: 768px) {
    width: 500px;
  }
`;
export const DivWidth = styled.div`
  @media (min-width: 250px) {
    width: 270px;
  }
  @media (min-width: 300px) {
    width: 300px;
  }
  @media (min-width: 412px) {
    width: 370px;
  }
  @media (min-width: 768px) {
    width: 500px;
  }
`;
export const Div_all_flex = styled.div`
  background-color: #ffffff;

  display: flex;

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
  }
`;
export const Div_flex_column = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: ${(props) => props.margin_right};
  margin-left: ${(props) => props.margin_left};
  margin-bottom: ${(props) => props.margin_bottom};
`;
export const Div_flex_dropdown = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifycontent};
  margin-bottom: ${(props) => props.marginbottom};
  width: 300px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;

  @media (min-width: 250px) {
    width: 230px;
  }

  @media (min-width: 300px) {
    width: 270px;
  }
  @media (min-width: 412px) {
    width: 370px;
  }
  @media (min-width: 768px) {
    width: 500px;
  }
`;
export const Div_flex = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifycontent};
  margin-bottom: ${(props) => props.marginbottom};
  width: ${(props) => props.width};
`;
export const Image = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  margin-right: ${(props) => props.margin_right};
`;
export const Font15px_bold = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 5px;
`;
export const Font_plain = styled.div`
  margin-bottom: 5px;
  margin-top: 5px;
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontsize};
  text-align: ${(props) => props.textalign};
`;

export const Font14px_pinkred = styled.div`
  font-size: 14px;
  color: #ff009b;
  margin-right: 5px;
  font-weight: ${(props) => props.font_weight};
`;
export const Font14px_gray = styled.div`
  font-size: 14px;
  color: #979797;
  margin-right: 5px;
  font-weight: ${(props) => props.font_weight};
`;
export const Font14px_red = styled.div`
  font-size: 14px;
  color: #ff0000;
  margin-right: 5px;
  font-weight: ${(props) => props.font_weight};
`;
export const Font14px_lightRed = styled.div`
  font-size: 14px;
  color: #ff6969;
  margin-right: 5px;
  font-weight: ${(props) => props.font_weight};
`;
export const Font12px_darkgray = styled.div`
  font-size: 12px;
  color: #545454;
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 400;
  margin-bottom: ${(props) => props.marginbottom};
`;
export const Font13px_darkgray = styled.div`
  font-size: 13px;
  color: #545454;
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 400;
`;
export const Font14px_darkgray = styled.div`
  font-size: 15px;
  color: #545454;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 5px;
  font-weight: 400;
`;
export const Font14px_darkgray_600 = styled.div`
  font-size: 14px;
  color: #545454;
  margin-bottom: 5px;

  margin-right: 5px;
  margin-left: 5px;
  font-weight: 600;
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
  font-size: ${(props) => props.fontsize};
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 5px;
  color: ${(props) => props.color};
`;
export const Font_bold_center = styled.div`
  font-size: ${(props) => props.font_size};
  font-weight: ${(props) => props.font_weight};
  margin-bottom: 5px;
  margin-top: 5px;
  color: ${(props) => props.color};
  text-align: center;
  cursor: ${(props) => props.cursor};
`;
export const B = styled.div`
  padding-left: 1.2em;
`;
/* box */
export const Rect_transparent = styled.p`
  height: 43px;
  margin-bottom: ${(props) => props.marginbottom};
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  padding: 7px;
  padding-left: 10px;
  padding-right: 10px;
  font-siz: 15px;
  &:focus {
    border-color: #00efff; /* 포커스를 받았을 때의 색상으로 변경 */
    border: 2px solid #00efff;
    outline: none; /* 포커스 효과 제거 */
  }

  @media (min-width: 300px) {
    width: 270px;
  }
  @media (min-width: 412px) {
    width: 370px;
  }
  @media (min-width: 768px) {
    width: 500px;
  }
`;

/* input */
export const Input_Rect_transparent = styled.input`
  height: 43px;
  margin-bottom: ${(props) => props.marginbottom};
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  padding: 7px;
  padding-left: 10px;
  padding-right: 10px;
  font-siz: 15px;
  &:focus {
    border-color: #00efff; /* 포커스를 받았을 때의 색상으로 변경 */
    border: 2px solid #00efff;
    outline: none; /* 포커스 효과 제거 */
  }

  @media (min-width: 300px) {
    width: 270px;
  }
  @media (min-width: 412px) {
    width: 370px;
  }
  @media (min-width: 768px) {
    width: 500px;
  }
`;

export const InputRectAddress = styled.input`
  height: 43px;
  margin-bottom: ${(props) => props.marginbottom};
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  padding: 7px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  &:focus {
    border-color: #00efff; /* 포커스를 받았을 때의 색상으로 변경 */
    border: 2px solid #00efff;
    outline: none; /* 포커스 효과 제거 */
  }

  @media (min-width: 300px) {
    width: 200px;
  }
  @media (min-width: 412px) {
    width: 300px;
  }
  @media (min-width: 768px) {
    width: 430px;
  }
`;

export const InputMini = styled.input`
  height: 33px;
  margin-bottom: ${(props) => props.marginbottom};
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  padding: 7px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 5px;
  font-size: 14px;
  &:focus {
    border-color: #00efff; /* 포커스를 받았을 때의 색상으로 변경 */
    border: 2px solid #00efff;
    outline: none; /* 포커스 효과 제거 */
  }

  @media (min-width: 300px) {
    width: 70px;
  }
  @media (min-width: 412px) {
    width: 90px;
  }
  @media (min-width: 768px) {
    width: 100px;
  }
`;

export const ModalInput_tpr = styled.input`
  height: 33px;
  margin-bottom: ${(props) => props.marginbottom};
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  padding: 7px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
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
`;
/* select*/
export const Select_Rect_transparent = styled.select`
  font-size: 14px;
  height: 33px;
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
`;
/* btn */

export const Cylinder_Gray = styled.div`
  cursor: pointer;
  border: 1px solid #dcdcdc;

  height: 43px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 20px;
  margin-bottom: 5px;
  margin-top: ${(props) => props.margin_top};

  @media (min-width: 300px) {
    width: 80px;
  }
  @media (min-width: 412px) {
    width: 110px;
  }
  @media (min-width: 768px) {
    width: 139px;
  }
`;
export const Radius_btn_ = styled.div`
  cursor: pointer;
  border: 0px solid #dcdcdc;
  height: 43px;
  font-size: 13px;
  font-color: white;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 20px;
  margin-bottom: 5px;
  margin-top: ${(props) => props.margin_top};

  @media (min-width: 300px) {
    width: 80px;
  }
  @media (min-width: 412px) {
    width: 110px;
  }
  @media (min-width: 768px) {
    width: 139px;
  }
`;

export const Radius_btn = styled.div`
  cursor: pointer;
  border: ${(props) => props.border};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  font-size: ${(props) => props.font_size};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  margin-bottom: 1px;
  background: ${(props) => props.background};
  color: #ffffff;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 1px;
  font-weight: 600;
`;
export const Transparent_btn = styled.div`
  cursor: pointer;
  border: ${(props) => props.border};
  height: ${(props) => props.height};
  width: auto;
  font-size: ${(props) => props.font_size};
  color: ${(props) => props.font_color};
  display: flex;
  float: right;
  margin-top: ${(props) => props.margin_top};
  margin-left: 5px;
  margin-right: 5px;
  background: none;
  padding-top: 1px;
  font-weight: 500;
`;
export const BlackSquareBtn = styled.div`
  cursor: pointer;
  background-color: black;
  color: white;
  font-weight: bold;
  height: 43px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 10px;

  @media (min-width: 200px) {
    width: 170px;
  }
  @media (min-width: 300px) {
    width: 270px;
  }
  @media (min-width: 412px) {
    width: 370px;
  }
  @media (min-width: 768px) {
    width: 500px;
  }
`;
export const Background_Gray = styled.div`
  background-color: #e8e8e8;
  border-radius: 10px;
  font-size: 12px;
  overflow-y: auto;
  max-height: 20vh;
  color: #8e8e8e;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 14px;
  padding-bottom: 14px;
  margin-right: 10px;
  margin-left: 13px;

  @media (min-width: 250px) {
    width: 250px;
  }
  @media (min-width: 300px) {
    width: 280px;
  }
  @media (min-width: 412px) {
    width: 340px;
  }
  @media (min-width: 768px) {
    width: 660px;
  }
`;
export const CustomMini = styled.div`
  cursor: pointer;
  border: ${(props) => props.border};
  height: ${(props) => props.height};
  width: ${(props) => props.width};;
  font-size: ${(props) => props.fontsize};
  color: ${(props) => props.fontcolor};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: ${(props) => props.background};
  border-radius:10px;
  display: flex;
  align-items:center;
  text-align:center;
  justify-content:center;
`;
/* hr 태그 */
export const HrGray = styled.hr`
  background: #bfbfbf;
  height: 1px;
  border: 0;
  margin-top: 15px;
  margin-bottom: 15px;
`;
export const HrGray2px = styled.hr`
  background: #bfbfbf;
  height: 2px;
  border: 0;
  margin-top: 15px;
  margin-bottom: 15px;
`;
/* input 태그 */
export const InputPink = styled.input`
  accent-color: #ff009b;
  width: 16px;
  height: 16px;
`;
/*  아이콘 icon  */
