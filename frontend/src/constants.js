const BACKEND_URL = "http://localhost:8000";

export const APIs = {
  fetchAllTags: `${BACKEND_URL}/getAllTags`,
  fetchGamesByTags: `${BACKEND_URL}/getGamesByTags`,
  fetchRecommendGames: `${BACKEND_URL}/getRecommendGames`,
};
