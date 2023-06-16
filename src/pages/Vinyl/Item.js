import React ,{ useState, useContext }from "react";
import "./Item.css";
import { useLocation } from "react-router-dom";
import { Axios } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context, UserContextProvider  } from "../../components/ContextProvider";
function Item() {
  const { state } = useLocation();
  console.log(state.description);
  const {sessionUserid} = useContext(Context)
  let countryEmoji = "";
  if(state.country==='Japan'){
    countryEmoji="🇯🇵 ";
  }else if(state.country==='South Korea'){
    countryEmoji="🇰🇷 "
  }else if(state.country==='China'){
    countryEmoji="🇨🇳 "
  }else{ countryEmoji="🌏"}

  const onCartClick = () => {
    
    Axios.post("http://localhost:8000/api/cart/insert",{
      product_id: state.id,
      person_id:sessionUserid,
      artist:state.artist,
      title: state.title,
      price: state.price,
      sold: state.sold,
      img0: state.img0,
    }).then(() => {
      //글이 등록 되면
      //history({ pathname: "/Board", submit: "done" });
      toast.success("상품이 장바구니에 추가되었습니다.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
    });
  };
  return (
    <div className="vinylItem0">
        <p className="vinylItem0-0-p">
          {state.artist} ✯ {state.title}
        </p>
      <div className="vinylItem0-0">
        
        <img className="vinylItem0-0-0" src={state.img0} />

        <div className="vinylItem0-0-1">
          <p className="p-vinylItem-detail">✧title✧ {state.title}</p>
          <p className="p-vinylItem-detail">✧artist✧ {state.artist}</p>
          <p className="p-vinylItem-detail">✧label✧ {state.label}</p>
          <p className="p-vinylItem-detail">✧format✧ {state.format}</p>
          <p className="p-vinylItem-detail">✧country✧ {countryEmoji}{state.country}</p>
          <p className="p-vinylItem-detail">✧year✧ {state.year}</p>
          <p className="p-vinylItem-detail">
            ✧genre✧ {state.genre1} {state.genre2}
          </p>
          <p className="p-vinylItem-detail">✧condition✧ {state.condition}</p>
          <p className="p-vinylItem-detail">✧sleeve✧ {state.sleeve}</p>

          <p>✧price✧ {state.price}</p>
          <div className="vinylItem0-0-1-0">
            <button onClick={onCartClick}>장바구니</button>
            <button>찜</button>
          </div>
        </div>
      </div>

      <div className="vinylItem0-1">
        <p className="vinyl">detail</p>
        <div className="vinylItemImgs">
          <img className="vinylItemimg" src={state.img0} />
          <img className="vinylItemimg" src={state.img1} />
          <img className="vinylItemimg" src={state.img2} />
        </div>
        <div className="vinylItemDscrp"></div>
        <p className="p-vinyldescription">{state.description}</p>
        <p className="p-vinyldescription">{state.tracklist}</p>
      </div>
    </div>
  );
}

export default Item;
