const BACKEND_URL = "http://localhost:8000";
// const BACKEND_URL = "https://db04-175-159-253-250.ngrok-free.app";

export const APIs = {
  fetchAllTags: `${BACKEND_URL}/getAllTags`,
  fetchGamesByTags: `${BACKEND_URL}/getGamesByTags`,
  fetchRecommendGames: `${BACKEND_URL}/getRecommendGames`,
};
