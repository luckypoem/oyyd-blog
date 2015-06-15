const React = require('react');
const App = require('./components/App/App.js');
const PostViewer = require('./components/PostViewer/PostViewer.js');
const PostsList = require('./components/PostsList/PostsList.js');
const ErrorPage = require('./components/ErrorPage/ErrorPage.js');
const Router = require('react-router');
const {Route, DefaultRoute, NotFoundRoute} = Router;

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={PostsList}/>
    <NotFoundRoute handler={ErrorPage}/>
    <Route path="post_viewer" handler={PostViewer}></Route>
  </Route>
);

module.exports = routes;