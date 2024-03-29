import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Context } from "../../components/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; //파베
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";
import {
  FlexCenter,
  BlackSquareBtn,
  Font12px_darkgray,
  InputPink,
  Font14px_darkgray,
  Font14px_darkgray_600,
  Font_bold,
  Div_flex,
  InputMini,
  HrGray,
  Div_all,
  Font13px_darkgray,
} from "../../styled-component/style";
import "./Cart.css";
const CartFrame = styled.div``;
const Frame = styled.div`
  width: auto;
  height: auto;
  display: felx;
  justify-content: space-around;
`;
const DivTable = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const VinylImg = styled.img`
  width: 90px;
`;
const Table = styled.table`
  border-left: none;
  border-bottom: 1.5px solid #bfbfbf;
  border-right: none;
  border-top: 1.5px solid #bfbfbf;

  cellpadding: 2px;
`;
const DivTotal = styled.div`
  border: 2px solid #d4d4d4;

  height: auto;
  margin-left: 10px;
  margin-right: 40px;

  padding: 10px;
`;
const DivPtag = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Td = styled.td`
  

  .deleteIcon {
    size
  }
  `;

function Cart() {
  const { sessionUserid, setIsloggedIn } = useContext(Context);
  const [cartdata, setCartdata] = useState([]);
  console.log("sessionuserid", sessionUserid);
  const [User, setUser] = useState({
    email: sessionStorage.key(0),
  });

  const logout = async () => {
    await signOut(auth);
    sessionStorage.clear();
    setIsloggedIn(false);
  };

  let [userData, setUserdata] = useState([]);
  let [rewardPoints, setRewardPoints] = useState(0);
  let temp_reward_points = null;
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
    Axios.get("http://localhost:8000/api/userinfo", {
      params: { user: User.email },
    })

      .then((res) => {
        setUserdata([...userData, ...res.data]);
        temp_reward_points = res.data[0].reward_points;
        setRewardPoints(temp_reward_points);
        console.log("db로 가져온 reward points: ", temp_reward_points);
      })
      .catch((err) => {
        console.log(err.message);
      });
    //});
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
          console.log(err);
        });
    }).then(function () {
      Axios.get("http://localhost:8000/api/cart/getcart", {
        params: { key: sessionUserid },
      })

        .then((res) => {
          //console.log("2. 장바구니 불러오기");
          setCartdata([...res.data]);
        })
        .catch((err) => {
          console.log(err.message);
        });

      return cartdata;
    });
  }, []);

  return (
    <CartFrame>
      <Frame>
        <DivTable>
          <List cartdata={cartdata} reward_points={rewardPoints} />
        </DivTable>
      </Frame>
    </CartFrame>
  );
}
function List(props) {
  const [cartdata, setCartdata] = useState([]);
  const [checkedEach, setCheckedEach] = useState([]); //개별체크
  const [checkedAll, setCheckedAll] = useState([]); //전체체크
  const [isAllChecked, setIsAllChecked] = useState(false);
  //const initEachChecked = new Array(props.cartdata.length).fill(false);
  const [isEachChecked, setIsEachChecked] = useState([]);

  const [checkList, setCheckList] = useState([]); //상품에 대한 모든 정보가 들어있음
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [usedPoints, setUsedPoints] = useState(0);
  let navigate = useNavigate();
  useEffect(() => {
    // 페이지가 처음 로드될 때만 실행되는 코드
    setCartdata(props.cartdata);
  }, [props]);
  useEffect(() => {
    //setIsEachChecked(initEachChecked);

    const tempTotalPrice = checkList.reduce(
      (total, item) => total + item.price,
      0
    );
    setTotalPrice(tempTotalPrice);
    if (tempTotalPrice - usedPoints < 0) {
      setFinalPrice(0);
    } else {
      setFinalPrice(tempTotalPrice - usedPoints);
    }

    //const fianlTotalPrice = tempTotalPrice
  }, [checkList]); //checkList값이 변할 때 마다 price값의 합을 업데이트
  useEffect(() => {
    if (totalPrice - usedPoints < 0) {
      setFinalPrice(0);
    } else {
      setFinalPrice(totalPrice - usedPoints);
    }
  }, [usedPoints]);
  const checkboxRef = useRef([]);
  const onAllChecked = (e) => {
    //setCheckedAll(e.target.checked ? checkedAll : []);
    const tempEachCheck = new Array(cartdata.length).fill(e.target.checked);
    const tempCheckList = new Array(cartdata.length);
    if (e.target.checked) {
      setCheckList(cartdata);
    } else if (!e.target.checked) {
      setCheckList([]);
    }
    setIsEachChecked(tempEachCheck);
  };

  const onPointChange = (e) => {
    if (props.reward_points < e.target.value) {
      console.log("value가 더 커요... 포인트");
      alert("보유하고 계신 포인트보다 더 큰 값을 입력하셨습니다.");
      e.target.value = 0;
      setUsedPoints(0);
    } else if (e.target.value < 0) {
      alert("0 이상의 값을 입력하세요.");
      e.target.value = 0;
      setUsedPoints(0);
    } else if (e.target.value >= 0 || props.reward_points >= e.target.value) {
      setUsedPoints(e.target.value);
      setFinalPrice(totalPrice - usedPoints);
    }

    console.log(usedPoints);
  };
  const onDeleteClick = (productId, personId) => {
    //1. cartdata에서 item을 삭제한다.(화면에 우선 보이지 않게 하기 위해)
    setCartdata(cartdata.filter((item) => item.product_id !== productId));
    //2. db에서 삭제가 될 수 있도록 한다.
    Axios.delete("http://localhost:8000/api/cart/delete", {
      data: { productId: productId, personId: personId },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const onSubmitBtnClick = () => {
    if (checkList.length == 0) {
      alert("선택된 상품이 없습니다.");
    } else {
      const data = {
        totalPrice,
        finalPrice,
        usedPoints,
        checkList,
      };
      navigate("/orderdetail", { state: data });
    }
  };

  const onCheckedEach = (e, index, item) => {
    setCheckedEach(e.target.checked);
    const tempisCheck = [...isEachChecked];
    tempisCheck[index] = e.target.checked ? true : false;
    setIsEachChecked(tempisCheck);

    const tempCheckList = [...checkList];
    if (!checkList.includes(item) & e.target.checked) {
      setCheckList(tempCheckList);
      tempCheckList.push(item);
    } else if (tempCheckList.includes(item) & !e.target.checked) {
      setCheckList(tempCheckList.filter((element) => element !== item));
    }
  };

  return (
    <Div_all>
      <Div_flex>
        <InputPink type="checkbox" onChange={onAllChecked}></InputPink>
        <Font13px_darkgray>
          전체선택 [{checkList.length}/{cartdata.length}]
        </Font13px_darkgray>
      </Div_flex>
      <Table>
        {cartdata &&
          cartdata.map((item, index) => {
            return (
              <tbody key={item.product_id}>
                <tr>
                  <Td>
                    <InputPink
                      onChange={(e) => onCheckedEach(e, index, item)}
                      checked={isEachChecked[index]}
                      type="checkbox"
                    />
                  </Td>
                  <Td>
                    <VinylImg className="vinylItemimg" src={item.img0} />
                  </Td>
                  <Td>
                    <Font12px_darkgray>
                      {item.artist + " - " + item.title}
                    </Font12px_darkgray>
                  </Td>
                  <Td>
                    <Font_bold fontsize="13px" color="#262626">
                      {item.price}원
                    </Font_bold>
                  </Td>
                  <Td>
                    <TiDelete
                      color="#BFBFBF"
                      className="deleteIcon"
                      onClick={() =>
                        onDeleteClick(item.product_id, item.person_id)
                      }
                    />
                  </Td>
                </tr>
              </tbody>
            );
          })}
      </Table>
      <div>
        <HrGray />
        <Font_bold fontsize="17px" color="#000000">
          결제 예상 금액
        </Font_bold>
        <HrGray />
        <Font14px_darkgray>총 {checkList.length}개의 상품</Font14px_darkgray>
        <DivPtag>
          <Font14px_darkgray>상품 가격</Font14px_darkgray>
          <Font14px_darkgray>{totalPrice}원</Font14px_darkgray>
        </DivPtag>

        <DivPtag>
          <Font14px_darkgray>보유 적립금</Font14px_darkgray>
          <Font14px_darkgray>{props.reward_points}원</Font14px_darkgray>
        </DivPtag>
        <DivPtag>
          <Font14px_darkgray>사용 적립금</Font14px_darkgray>
          <Div_flex>
            <InputMini onChange={(e) => onPointChange(e)} />
            <Font14px_darkgray>원</Font14px_darkgray>
          </Div_flex>
        </DivPtag>
        <HrGray />
        <DivPtag>
          <Font_bold fontsize="16px" color="#000000">
            총 결제 금액
          </Font_bold>
          <Font_bold fontsize="17px" color="#ff009B">
            {finalPrice}원
          </Font_bold>
        </DivPtag>
      </div>
      <HrGray />
      <FlexCenter>
        <BlackSquareBtn onClick={onSubmitBtnClick}>주문하기</BlackSquareBtn>
      </FlexCenter>
    </Div_all>
  );
}

export default Cart;
