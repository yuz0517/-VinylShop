import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Context, UserContextProvider } from "../../components/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; //파베
function Cart() {
  const { sessionUserid, setIsloggedIn } = useContext(Context);
  const [cartdata, setCartdata] = useState([]);
  const logout = async () => {
    await signOut(auth);
    sessionStorage.clear();
    setIsloggedIn(false);
  };
  //let cartdata = "";
  
  useEffect(() => {
    if (sessionUserid === undefined || sessionUserid === null ||sessionUserid==='') {
      //로그인 하면 db에서 불러와 저장되는 sessionuserid 부분에 아무것도 없다면
      //재로그인창으로 이동
      alert("재로그인 해 주세요");
      logout();
    } else {
    console.log(sessionUserid)
      Axios.get("http://localhost:8000/api/cart/getcart", {
        params: { key: sessionUserid },
      })
        .then((res) => {
          console.log(res.data);
          setCartdata([...res.data]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  },[sessionUserid]);
  console.log(cartdata[0])

  return (
    <>
      <div>Shopping cart</div>
      <p></p>
      <div>
        {cartdata.map((item) => {
            
            return (
                <div key={item.itemid}>
                    <p>
                        {item.title}
                    </p>
                </div>
            );
        })}
      </div>
    </>
  );
}

export default Cart;
