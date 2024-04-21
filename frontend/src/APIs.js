import { APIs } from "./constants";

export const getGameImage = (gameId) => {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameId}/header_alt_assets_0.jpg?t=1709724676`;
};

export const fetchTag = async () => {
  const response = await fetch(APIs.fetchAllTags);
  const data = await response.json();
  return data;
};

export const fetchGameByTags = async (requestData) => {
  const response = await fetch(APIs.fetchGamesByTags, {
    method: "POST",
    body: JSON.stringify({ tags: requestData.join(",") }),
  });
  const data = await response.json();
  return data;
};
