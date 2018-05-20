import React, { Component } from "react";
import Spinner from "react-spinkit";
import StoryView from "./StoryView";

class StoriesView extends Component {
  render() {
    const { stories } = this.props;
    if (!stories || stories.length === 0) {
      return (
        <CenterView>
          <Spinner name="ball-clip-rotate-multiple" color="coral" />
        </CenterView>
      );
    }

    const storyViews = stories.map(story => (
      <StoryView key={story.id} story={story} />
    ));
    return <div>{storyViews}</div>;
  }
}

const centerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "50px"
};
const CenterView = ({ children }) => <div style={centerStyle}>{children}</div>;

export default StoriesView;
