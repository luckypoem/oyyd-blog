import React from 'react';
import SimpleApp from './components/SimpleApp';
import SimplePost from './components/SimplePost';
import SimpleList from './components/SimpleList';
import About from './pages/About/index.js';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router, Route, Link, IndexRoute} from 'react-router';

function generateRoutes(env){
  return (
    <Router history={env === 'server'?null:createBrowserHistory()}>
      <Route path="/" component={SimpleApp}>
        <IndexRoute component={SimpleList}/>
        <Route path="post/:id" component={SimplePost}></Route>
      </Route>
      <Route path="/about" component={About}></Route>
    </Router>
  )
}

export default generateRoutes;
