import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import StoryRepository from "./data/StoryRepository";
import StoriesView from "./components/StoriesView";

const cl = console.log;
const ce = console.error;

/**
 * This will be the "container" component, which will fetch HN data
 * and pass it on to "view" components.
 */
class App extends Component {
  state = {
    topStories: [],
    hasError: false
  };

  repository = new StoryRepository();

  async componentDidMount() {
    try {
      const topStories = await this.repository.getTopStories();
      this.setState({ topStories, hasError: false }, () => cl(`Yes!`));
    } catch (error) {
      ce(`Failed to retrieve stroies!!!`, error);
      this.setState({ hasError: true });
    }
  }

  render() {
    const { hasError } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hacker News: Top Stories</h1>
        </header>
        <div className="App-intro">
          {hasError ? (
            <div>Error retrieving stories!</div>
          ) : (
            <StoriesView stories={this.state.topStories} title="Top Stories" />
          )}
        </div>
      </div>
    );
  }
}

export default App;
