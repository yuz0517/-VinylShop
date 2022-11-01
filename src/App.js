import React from 'react';
//import { Route } from 'react-router-dom';
import './App.css';
import About from './pages/About/About.js';
import Home from './pages/Home';
import Bookmark from './pages/Bookmark';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Board_write from './pages/Board/Board_write';
import Board_Main from './pages/Board/Board_Main';
import Board_View from './pages/Board/Board_View';
import Signin from './pages/Signin';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App(){
  return(
  <>

  
    <Router>
      <Navbar />
      <Switch>
      <Route path='/' exact={true} component={Home}/>
        <Route path='/About' component={About}/>
        <Route path='/Bookmark' component={Bookmark}/>
        <Route path='/Signup' component={Signup}/>
        <Route path='/Board' exact={true} component={Board_Main}/>
        <Route path='/Board-write' component={Board_write}/>
        <Route path='/Board-view/:no' exact={true} component={Board_View}/>
        <Route path='/Signin' component={Signin}/>
      </Switch>
    </Router>
  </>
  );
}


export default App;