import React, { useEffect, useState, useContext} from 'react'
import { Context } from '../../components/ContextProvider';
export default function DeliveryADD() {
    const [ADDcnt,setADDcnt] = useState(0)
    const { sessionUserid, setsessionUserid } = useContext(Context);
    console.log(sessionUserid)

    const onAddrClick =()=>{
        
    }
  return (
    <div>
        <div>배송지를 추가해주세요.</div>
        <div>  배송지를 등록하시면 더욱 더 편리하게 선택하실 수 있습니다. </div>
        <div>
            <button onclick={onAddrClick}>배송지 추가하기</button>
        </div>
        <div>
        
        </div>
    </div>
  )
}
