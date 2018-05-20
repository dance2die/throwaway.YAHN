import React, { Component } from "react";
import Spinner from "react-spinkit";
import StoryView from "./StoryView";

class StoriesView extends Component {
  render() {
    const { stories } = this.props;
    if (!stories || stories.length === 0) {
      return (
        <SpinnerLayoutView>
          <Spinner name="ball-clip-rotate-multiple" color="coral" />
        </SpinnerLayoutView>
      );
    }

    const storyViews = stories.map(story => (
      <li key={story.id}>
        <StoryView story={story} />
      </li>
    ));
    return <StoryLayoutView>{storyViews}</StoryLayoutView>;
  }
}

const storyStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "50px",
  textAlign: "left",
  listStyle: "none"
};
const StoryLayoutView = ({ children }) => (
  <ul style={storyStyle}>{children}</ul>
);

const centerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "50px"
};
const SpinnerLayoutView = ({ children }) => (
  <div style={centerStyle}>{children}</div>
);

export default StoriesView;
