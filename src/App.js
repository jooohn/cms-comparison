import React, { Component } from 'react';
import { Contentful } from "./cms";
import CmsDemo from './CmsDemo';
import './App.css';

const contentful = new Contentful({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <CmsDemo cms={contentful} />
      </div>
    );
  }
}

export default App;
