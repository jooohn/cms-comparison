import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
import { Contentful } from "./cms";
import CmsDemo from './CmsDemo';
import './App.css';

const contentful = new Contentful({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  host: process.env.REACT_APP_CONTENTFUL_HOST || "cdn.contentful.com", // Specify "preview.contentful.com" for preview
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN, // Specify CDA or Preview API Access token
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <CmsDemo cms={contentful} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
