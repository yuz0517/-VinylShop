import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Menubar() {
    const navigate = useNavigate();
  return (
    <>
    <div>
        <div >정보 수정</div>
        <div onClick={(e) => { navigate('/admin/search/user')}}>사용자 조회</div>
        <div>Journal 작성</div>
        <div>제품 등록</div>
        <div>답변</div>
    </div>
    </>
  )
}

export default Menubar