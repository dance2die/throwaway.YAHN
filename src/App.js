import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Api from "./Api";

const cl = console.log;
const ce = console.error;
const MAX_STORY_COUNT = 20;

/**
 * This will be the "container" component, which will fetch HN data
 * and pass it on to "view" components.
 */
class App extends Component {
  static state = {
    topStories: []
  };

  async componentDidMount() {
    // Fetch Top story IDs
    // Fetch story details for top 20
    // Upon fetch completion, set the state for topStories

    try {
      const storyIds = await Api.fetch(`/topstories`, { context: this });
      const topStories = await this.getStories(
        storyIds.slice(0, MAX_STORY_COUNT)
      );

      this.setState({ topStories }, () =>
        cl(`Stories are retrieved successfully!`)
      );
    } catch (error) {
      ce(`Failed to retrieve stroies!!!`, error);
    }
  }

  async getStories(storyIds) {
    const stories = storyIds.map((storyId, index) =>
      this.getStory(storyId, index + 1)
    );
    return Promise.all(stories);
  }

  /**
   * Get the story and set the rank
   * @param {integer} storyId Id to get story for
   * @param {integer} rank HN Ranking to set to
   */
  async getStory(storyId, rank) {
    const story = await Api.fetch(`/item/${storyId}`, { context: this });
    story.rank = rank;
    return story;
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
