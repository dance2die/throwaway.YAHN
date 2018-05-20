import React, { Component } from "react";
import Spinner from "react-spinkit";

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

    return <div>StoriesView!</div>;
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
