import React from 'react';
import './App.css';

import Login from './views/Login';
import Layout from './views/Layout';
import CityList from './views/Citylist';
import NotFound from './views/NotFound';
import Map from './views/Map';
// 导入路由相关的核心概念
import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/layout" component={Layout}/>
      <Route path="/citylist" component={CityList}/>
      <Route path="/map" component={Map}/>
      <Redirect exact from="/" to="/login" />
      <Route component={NotFound}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
