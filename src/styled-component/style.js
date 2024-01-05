import styled from "styled-components";
/* hr */
/* 정렬,레이아웃 */
export const Center = styled.div`

  display: flex;
  justify-content-center;
`;
export const Fixed = styled.div`
  position: fixed;
`;
export const Address_Modal = styled.div`
  overflow-y: auto;
  max-height: 70vh;
  @media (min-width: 250px) {
    width: 250px;

  }
  @media (min-width: 300px) {
    width: 280px;

  }
  @media (min-width: 412px) {
    width: 350px;

  }
  @media (min-width: 768px) {
    width: 480px;

  }
`;
export const Scroll = styled.div`
  overflow-y: auto;

  @media (min-width: 250px) {
    width: 250px;
  }
  @media (min-width: 300px) {
    width: 280px;
  }
  @media (min-width: 412px) {
    width: 350px;
  }
  @media (min-width: 768px) {
    width: 480px;
  }
`;
export const Section = styled.div`
  background-color: white;
  width: auto;
  margin-bottom: 10px;
`;
export const Div_all = styled.div`
  background-color: #ffffff;
  width: auto;
  place-content: center;
  flex-direction: column;
  margin: auto;
  display: grid;

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
  margin-bottom: 10px;
  margin-top: 10px;
`;
export const Font_plain = styled.div`
  margin-bottom: 5px;
  margin-top: 5px;
  color: ${(props) => props.color};
`;
export const Font14px_gray = styled.div`
  font-size: 14px;
  color: #979797;
  margin-right: 5px;
  font-weight: ${(props) => props.font_weight};
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
`;
export const B = styled.div`
  padding-left: 1.2em;
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
/* select*/
export const Select_Rect_transparent = styled.select`
  width: 80%;
  height: 43px;
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

export const Radius_btn = styled.div`
  cursor: pointer;
  border: ${(props) => props.border};
  height: ${(props) => props.height};
  width: auto;
  font-size: ${(props) => props.font_size};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  margin-bottom: 1px;
  background: ${(props) => props.background};

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
  width: 30vh;
`;