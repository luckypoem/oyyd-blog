import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js/lib/highlight.js';
import $ from 'jquery';
import {curry, flowRight} from 'lodash';
import {connect} from 'react-redux';

import CONSTANTS from '../../CONSTANTS';
import Disqus from '../Disqus';
import translate from './translate';
import getPostUrl from '../../utils/getPostUrl';

// TODO: init hljs somewhere else
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

const {string} = React.PropTypes;

function highlightCode(codeBlockArr) {
  for (var i = 0; i < codeBlockArr.length; i++) {
    hljs.highlightBlock(codeBlockArr[i]);
  }
}

class SimplePost extends React.Component {
  render() {
    const id = `${CONSTANTS.DISQUS.ARTICLE_ID_PREFIX}${this.props.title}`;
    const url = getPostUrl(this.props.fileName);
    return (
      <div className='blog-simple-post'>
        <MarkedContent>{this.props.htmlContent}</MarkedContent>
        <Disqus initialIdentifier={id}
          initialTitle={this.props.title} initialUrl={url}/>
      </div>
    );
  }
}

SimplePost.propTypes = {
  title: string,
  fileName: string,
  htmlContent: string,
};

const MarkedContent = React.createClass({
  componentDidMount() {
    this.highlightCodes();
  },

  componentDidUpdate() {
    this.highlightCodes();
  },

  highlightCodes() {
    let codes = ReactDOM.findDOMNode(this).querySelectorAll('code');
    highlightCode(codes);
  },

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: translate(this.props.children.toString())}} />
    );
  },
});

function select(state) {
  const {title, htmlContent, fileName} = state.post;
  return {
    title,
    fileName,
    htmlContent,
  };
}

const ConnectedSimplePost = connect(select)(SimplePost);

export default ConnectedSimplePost;
