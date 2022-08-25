import React from 'react'

function List(dbdata) { //Board_Main.js에서 넘겨준 값을 props로 받아옴. 
    
    return (
    <>
    <h4>총 {dbdata.dbdata.length} 개의 데이터가 있습니다. </h4>
    <table>
                <thead>
                    <tr>
                        <td>
                        {dbdata.dbdata.map(data=>{
                            return (
                            <li>{data.title}</li>);
                        })}
                        </td>
                    </tr>
                </thead>
            </table>

    </>
  )
}

export default List