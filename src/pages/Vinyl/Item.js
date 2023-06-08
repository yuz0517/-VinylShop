import React from "react";
import './Item.css'
import { useLocation } from "react-router-dom";
function Item() {
  const { state } = useLocation();
  console.log(state.description);
  return (
    <div className="vinylItem0">
      <div className="vinylItem0-0">
        <img className="vinylItem0-0-0" src={state.img0} />
        <div className="vinylItem0-0-1">
          <p>{state.title}</p>
          <p>{state.artist}</p>
          <p>{state.label}</p>
          <p>{state.format}</p>
          <p>{state.country}</p>
          <p>{state.year}</p>
          <p>{state.genre}</p>
          <p>{state.price}</p>
          <div className="vinylItem0-0-1-0">
            <button>장바구니</button>
            <button>찜</button>
          </div>
        </div>
      </div>

      <div className="vinylItem0-1">
        <p className="vinyl">detail</p>
        <div className="vinylItemImgs">
            <img className="vinylItemimg"src={state.img0}/>
            <img className="vinylItemimg"src={state.img1}/>
            <img className="vinylItemimg"src={state.img2}/>
        </div>
        <div className="vinylItemDscrp"></div>
        <p className="p-vinyldescription">{state.description}</p>
        <p className="p-vinyldescription">{state.tracklist}</p>
      </div>
    </div>
  );
}

export default Item;
