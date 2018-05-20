import FirebaseApi from "./FirebaseApi";

const MAX_STORY_COUNT = 20;

class StoryRepostiry {
  endPoints = {
    topStories: "/topstories",
    newStories: "/newstories",
    bestStories: "/beststories"
  };

  constructor(maxStoryCount = MAX_STORY_COUNT) {
    this.maxStoryCount = maxStoryCount;
  }

  getTopStories = async () => this._getStories(this.endPoints.topStories);
  getNewStories = async () => this._getStories(this.endPoints.newStories);
  getBestStories = async () => this._getStories(this.endPoints.bestStories);

  /**
   * Get stories for the specified IDs
   * @param {array} storyIds A list of story IDs to get
   */
  async _getStories(endPoint) {
    const storyIds = await FirebaseApi.fetch(endPoint, { context: this });
    const stories = storyIds
      .slice(0, this.maxStoryCount)
      .map((storyId, index) => this._getStory(storyId, index + 1));
    return Promise.all(stories);
  }

  /**
   * Get the story and set the rank
   * @param {integer} storyId Id to get story for
   * @param {integer} rank HN Ranking to set to
   */
  async _getStory(storyId, rank) {
    const story = await FirebaseApi.fetch(`/item/${storyId}`, {
      context: this
    });
    story.rank = rank;
    return story;
  }
}

export default StoryRepostiry;
