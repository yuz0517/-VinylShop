import React from 'react'
import { Link } from 'react-router-dom'
function List(dbdata) { //Board_Main.js에서 넘겨준 값을 props로 받아옴. 

    return (
        <>
            <h4>총 {dbdata.dbdata.length} 개의 데이터가 있습니다. </h4>
            <table align='center'>
                <thead>
                    <tr>
                        <td>
                            {dbdata.dbdata.map((data) => {
                                return (
                                    <Link to={{
                                        pathname: `/Board-view/${data.id}`,
                                        state:{ select_data: data }}}    //성공!!!!!!!!! 
                                        key={data.id} >{data.title} </Link>
                                   // <Link to={`/Board-view/${data.id}`} state={{ datad: dbdata.dbdata.length }}
                                     //   key={data.id}>{data.title}</Link>
                                        
                                        );
                            })}
                        </td>
                    </tr>
                </thead>
            </table>

        </>
    )
}

export default List