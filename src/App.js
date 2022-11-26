import React, { useState } from 'react';
//import { Route } from 'react-router-dom';
import './App.css';
import Mypage from './pages/Mypage/Mypage.js';
import Home from './pages/Home';
import Bookmark from './pages/Bookmark';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Board_write from './pages/Board/Board_write';
import Board_Main from './pages/Board/Board_Main';
import Board_View from './pages/Board/Board_View';
import Signin from './pages/Signin';
import { Context } from './components/ContextProvider';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App(){
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [sessionUsername, setSessionUsername] = useState("");//작성자 등록
  return(
  <>

  
    <Router>
    <Context.Provider value={{ isLoggedIn, setIsloggedIn, sessionUsername, setSessionUsername}}>
      <Navbar />
     
      <Switch>
      <Route path='/' exact={true} component={Home}/>
        <Route path='/Mypage' component={Mypage}/>
        <Route path='/Bookmark' component={Bookmark}/>
        <Route path='/Signup' component={Signup}/>
        <Route path='/Board' exact={true} component={Board_Main}/>
        <Route path='/Board-write' component={Board_write}/>
        <Route path='/Board-view/:no' exact={true} component={Board_View}/>
        <Route path='/Signin' component={Signin}/>
      </Switch>
      </Context.Provider>  
    </Router>
  </>
  );
}


export default App;