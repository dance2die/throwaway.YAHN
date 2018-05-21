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
    page: this.props.match.params.page || 1,
    topStoryIds: [],
    topStories: [],
    hasError: false
  };

  repository = new StoryRepository(MAX_STORY_COUNT);

  async componentDidMount() {
    try {
      const { topStoryIds: storyIds, page } = this.state;
      const repo = this.repository;

      if (storyIds.length <= 0) {
        const topStoryIds = await this.repository.getTopStoryIds();
        this.setState({ topStoryIds, hasError: false }, async () => {
          const ids = this._getStoryIdsByPage(topStoryIds, page);
          const topStories = await repo.getStoriesByIds(ids, page);

          this.setState({ topStories });
        });
      } else {
        const ids = this._getStoryIdsByPage(storyIds, page);
        const topStories = await repo.getStoriesByIds(ids, page);

        this.setState({ topStories });
      }
    } catch (error) {
      ce(`Failed to retrieve stroies!!!`, error);

      this.setState({ hasError: true });
    }
  }

  _getStoryIdsByPage = (storyIds, page) => {
    const start = (page - 1) * MAX_STORY_COUNT;
    const end = start + MAX_STORY_COUNT;
    return storyIds.slice(start, end);
  };

  render() {
    const { hasError, topStories: stories } = this.state;

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
