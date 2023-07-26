import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Context, UserContextProvider } from "../../components/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; //파베
function Cart() {
  const { sessionUserid, setIsloggedIn } = useContext(Context);
  const [cartdata, setCartdata] = useState([]);
  const [tempcartdata, setTempcartdata] = useState([]);
  let mycartArr = [];
  const logout = async () => {
    await signOut(auth);
    sessionStorage.clear();
    setIsloggedIn(false);
  };
  //let cartdata = "";

  useEffect(() => {
    if (
      sessionUserid === undefined ||
      sessionUserid === null ||
      sessionUserid === ""
    ) {
      //로그인 하면 db에서 불러와 저장되는 sessionuserid 부분에 아무것도 없다면
      //재로그인창으로 이동
      alert("재로그인 해 주세요");
      logout();
    } else {
      console.log("삭제", sessionUserid);
    }
    new Promise(function (resolve, reject) {
      Axios.delete("http://localhost:8000/api/cart/initdelete", {
        data: { id: 1 },
      })

        .then((res) => {
          if (res) {
            resolve(res);
            console.log("1. 장바구니 불러오기 전 sold 상태 체크 후 삭제", res);
          }
          reject(new Error("Request is failed"));
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err);
        });
    }).then(function () {
      Axios.get("http://localhost:8000/api/cart/getcart", {
        params: { key: sessionUserid },
      })

        .then((res) => {
          console.log("2. 장바구니 불러오기");
          setCartdata([...res.data]);
          //testFunc();
        })
        .catch((err) => {
          console.log(err.message);
        });
      //});
      return cartdata;
    });
  }, []);

  return (
    <>
      <>
        <div>Shopping cart</div>
        <p></p>
        <div>
          <List cartdata={cartdata} />
          {/* {cartdata &&
            cartdata.map((item) => {
              console.log("화면에띄움");
              return (
                <div key={item.itemid}>
                  <p key={item.itemid}>{item.title}</p>
                </div>
              );
            })} */}
        </div>
      </>
    </>
  );
}
function List(props) {
  console.log("func: list");
  return (
    <>
      <div>
        {props.cartdata &&
          props.cartdata.map((item) => {
            console.log("화면에띄움");
            return (
              <div key={item.itemid}>
                <p key={item.itemid}>{item.title}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Cart;
