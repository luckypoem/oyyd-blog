import React from 'react';
import ReactDOM from 'react-dom';

import Disqus from '../Disqus';

let SimpleApp = React.createClass({
  render(){
    return (
      <div className="oyyd-blog">
        {this.renderHeader()}
        <div className="content">
          {this.props.children}
        </div>
        {this.renderFooter()}
      </div>
    )
  },
  renderHeader(){
    return (
      <div className="header">
        <h1>
          <a href="/" className="site-name" title="返回列表">oyyd blog</a>
          <a className="github-link" href="https://github.com/oyyd" title="查看github账户">
            <img src="/static/img/icon/social-github-outline.png"/>
          </a>
        </h1>
      </div>
    )
  },
  renderFooter(){
    return(
      <div className="footer">
        <p>
          <span>Built by </span>
          <a href="https://github.com/oyyd/oyyd-blog">oyyd-blog</a>
          <span> and styled by modified </span>
          <a href="https://github.com/daveliepmann/tufte-css">tufte-css</a>
          <span>.</span>
        </p>
        <p className="cert">京ICP备14040206号-1</p>
      </div>
    )
  }
});

export default SimpleApp;
