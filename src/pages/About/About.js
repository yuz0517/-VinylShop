import React from 'react'
//import { auth } from ".././firebase";//파베
/*이름, 등등은 디비에만잇는거니까 디비에잇는 내용 수정 필요. 
  정보 불러올떄는 파이어베이스에서 아이디와 불러오고 디비 에서 그 아이디를 찾아서 띄우면 될듯?
*/
function About() {

  //불러와서 띄우고 (textbox로)

  /*firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });*/

  return (
    <div>About</div>
  )
}

export default About