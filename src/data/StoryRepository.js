import FirebaseApi from "./FirebaseApi";

class StoryRepostiry {
  endPoints = {
    topStories: "/topstories",
    newStories: "/newstories",
    bestStories: "/beststories"
  };

  constructor(maxStoryCount) {
    this.maxStoryCount = maxStoryCount;
  }

  getTopStoryIds = async () =>
    await FirebaseApi.fetch(this.endPoints.topStories, { context: this });
  getNewStoryIds = async () =>
    await FirebaseApi.fetch(this.endPoints.newStories, { context: this });
  getBestStoryIds = async () =>
    await FirebaseApi.fetch(this.endPoints.newStories, { context: this });

  // getTopStories = async () => this._getStories(this.endPoints.topStories);
  // getNewStories = async () => this._getStories(this.endPoints.newStories);
  // getBestStories = async () => this._getStories(this.endPoints.bestStories);

  async getStoriesByIds(storyIds, page) {
    const rankOffset = (page - 1) * this.maxStoryCount;

    const stories = storyIds.map((storyId, index) => {
      const rank = index + 1 + rankOffset;
      return this._getStory(storyId, rank);
    });
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
