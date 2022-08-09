import React from 'react';
//import { Route } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import Bookmark from './pages/Bookmark';
import Navbar from './components/Navbar';
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
        <Route path='/Signin' component={Signin}/>
      </Switch>
    </Router>
  </>
  );
}

export default App;