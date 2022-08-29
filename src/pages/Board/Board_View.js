import React , {useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
const Board_View = ({ history, location, match}) => {
  const [ data, set_data ] = useState({});
  
  
  const { no } = match.params; //match.parms-> 글 번호 
  console.log(location.state.select_data); // List.js에서 Props 보낸 값 확인 가능. select_data 로 표시됨.  
  const title = location.state.select_data.title; // List.js에서 Link to 로 보낸 값 받아오는 코드. 
  const content = location.state.select_data.content; 
  const date = location.state.select_data.date;
  useEffect(() => {
  // set_datadbd(no));
  }, [ ]);
  return (
    <>
    <h4>총  개의 데이터가 있습니다. </h4>
    <table align='center'>
                <thead>
                    <tr>
                        <td>
                          {title} <br /> {content} <br />
                        </td>
                    </tr>
                </thead>
            </table>

    </>
  )
}

export default Board_View