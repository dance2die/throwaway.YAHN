import React from "react";
import PropTypes from "prop-types";

const StoryView = ({ story }) => {
  return (
    <div>
      <span>#{story.rank}</span>
      <a href={story.url}>{story.title}</a> by {story.by}
    </div>
  );
};

StoryView.propTypes = {
  story: PropTypes.object.isRequired
};

export default StoryView;
