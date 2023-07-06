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
            if(res){
                resolve(res);
                console.log(res);
            }
            reject(new Error("Request is failed"));
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err);
        });
        
    })
      
      .then(function () {
        //new Promise(function (resolve, reject) {
        //cartdata.map((item, index) => {
        //let key = item.itemid;
        //console.log("delete 실행", index);

        Axios.get("http://localhost:8000/api/cart/getcart", {
          params: { key: sessionUserid },
        })

          .then((res) => {
            console.log("axios.get getcart", res.data);
            console.log("1.get: ", mycartArr);
            setCartdata([...res.data]);
            //testFunc();
          })
          .catch((err) => {
            console.log(err.message);
          });
        //});
        return cartdata
      }).then(function (cartdata) {
        console.log("3.", cartdata);
        setCartdata(cartdata);
        return cartdata;
      });;
      

    //   .then(function (cartdata) {
    //     console.log("3.", cartdata);
    //     setCartdata(cartdata);
    //     return cartdata;
    //   });
  }, []);

  //   const testFunc = async() => {
  //     await Promise.all(
  //       cartdata.map((item,index) => {
  //         let key = item.itemid;
  //         console.log("delete 실행");
  //         Axios.delete("http://localhost:8000/api/cart/initdelete", {
  //           data: { id: key },
  //         })
  //           .then((res) => {
  //             console.log(res);
  //             console.log("삭제완료");
  //           })
  //           .catch((err) => {
  //             console.log(err.message);
  //             console.log(err);
  //           });

  //       })
  //     ).then(() => {

  //     });

  //   const fetchData = async() => {
  //     cartarray = await Promise.all(
  //         cartdata.map((item, index) => {
  //             let key = item.itemid;
  //             console.log("delete 실행", index);
  //             Axios.delete("http://localhost:8000/api/cart/initdelete", {
  //               data: { id: key },
  //             })
  //               .then((res) => {
  //                 console.log(res);
  //                 console.log("삭제완료");
  //               })
  //               .catch((err) => {
  //                 console.log(err.message);
  //                 console.log(err);
  //               });

  //             return <div key={index}></div>;
  //           })
  //     )

  //   }

  return (
    <>
      <>
        <div>Shopping cart</div>
        <p></p>
        <div>
          {cartdata&&cartdata.map((item) => {
            console.log("화면에띄움");
            return (
              <div key={item.itemid}>
                <p key={item.itemid}>{item.title}</p>
              </div>
            );
          })}
        </div>
      </>
    </>
  );
}

export default Cart;
