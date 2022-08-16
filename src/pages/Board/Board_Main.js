import React from 'react'
import { Link } from 'react-router-dom';
import Board_write from './Board_write'
function Board_Main() {
  return (
    <Link to='/Board-write'>
        <button className='write-button'>글쓰기</button>
    </Link>
  );
}

export default Board_Main