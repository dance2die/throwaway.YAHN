import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import StoryRepository from "./data/StoryRepository";

const cl = console.log;
const ce = console.error;

/**
 * This will be the "container" component, which will fetch HN data
 * and pass it on to "view" components.
 */
class App extends Component {
  static state = {
    topStories: []
    // ,newStories: [],
    // bestStories: []
  };

  repository = new StoryRepository();

  async componentDidMount() {
    try {
      // const topStories = await this.repository.getTopStories();
      // const newStories = await this.repository.getNewStories();
      // const bestStories = await this.repository.getBestStories();
      // this.setState({ topStories, newStories, bestStories }, () => cl(`Yes!`));
      const topStories = await this.repository.getTopStories();
      this.setState({ topStories }, () => cl(`Yes!`));
    } catch (error) {
      ce(`Failed to retrieve stroies!!!`, error);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
