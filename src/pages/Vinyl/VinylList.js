import React from "react";
import { useNavigate } from "react-router-dom";
import './VinylList.css'
function VinylList(props) {
  console.log("데이터터터", props.result_num);
  let navigate = useNavigate();
  if (props.result_num === undefined) {
    return (
      <div>
        <div>등록된 상품이 없습니다.</div>
      </div>
    );
  } else if (props.result_num !== undefined) {
    return (
      <div>
        <div className="vinyl-item">
          <img
            className="vinyl-img"
            src={props.item.img0}
            
            onClick={() => {
              navigate("/vinyl/:id", { state: props.item });
            }}
          />
          <p
            className="vinyl-title"
            onClick={() => {
              navigate("/vinyl/:id", { state: props.item });
            }}
          >
            {props.item.artist + "-" +props.item.title}
          </p>
          <p className="vinyl-price">
            {props.item.price}
          </p>
          
        </div>
      </div>
    );
  }
}

export default VinylList;
