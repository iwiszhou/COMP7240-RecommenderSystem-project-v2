import { APIs } from "./constants";

export const fetchTag = async () => {
  const response = await fetch(APIs.fetchAllTags);
  const data = await response.json();
  return data;
};

export const fetchGameByTags = async (requestData) => {
  if (requestData) {
    requestData = requestData.join(",");
  }
  const response = await fetch(APIs.fetchGamesByTags, {
    method: "POST",
    body: JSON.stringify({ tags: requestData }),
  });
  const data = await response.json();
  return data;
};

export const fetchRecommendGames = async (requestData) => {
  let mode = "A";

  const modeParameter = window.location.search;

  if (modeParameter === "?mode=A") {
    mode = "A";
  } else if (modeParameter === "?mode=B") {
    mode = "B";
  } else {
    mode = "AB";
  }

  const response = await fetch(APIs.fetchRecommendGames, {
    method: "POST",
    body: JSON.stringify({
      "user-profiles": requestData,
      "ab-test-mode": mode,
    }),
  });
  const data = await response.json();
  Object.keys(data).forEach((x) => {
    data[x] = JSON.parse(data[x]);
  });
  return data;
};
