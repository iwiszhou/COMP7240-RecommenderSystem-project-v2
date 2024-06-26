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

  if (sessionStorage.getItem("mode") == null) {
    mode = "A";
  } else {
    mode = sessionStorage.getItem("mode");
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
