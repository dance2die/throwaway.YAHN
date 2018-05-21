import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import StoryRepository from "./data/StoryRepository";
import StoriesView from "./components/StoriesView";

const cl = console.log;
const ce = console.error;

const MAX_STORY_COUNT = 30;

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
      // We need to fetch stories only once.
      const { topStories: stories } = this.state;
      if (stories.length > 0) return;

      const topStories = await this.repository.getTopStories();
      this.setState({ topStories, hasError: false }, () => cl(`Yes!`));
    } catch (error) {
      ce(`Failed to retrieve stroies!!!`, error);
      this.setState({ hasError: true });
    }
  }

  getStoriesByPage = (stories, page) => {
    const start = (page - 1) * MAX_STORY_COUNT;
    const end = start + MAX_STORY_COUNT;
    return stories.slice(start, end);
  };

  render() {
    const { hasError, topStories } = this.state;
    const page = this.props.match.params.page || 1;
    const stories = this.getStoriesByPage(topStories, page);

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
            <StoriesView stories={stories} title="Top Stories" />
          )}
        </div>
      </div>
    );
  }
}

export default App;
