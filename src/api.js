export const createGame = async (url) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: Date.name,
    }),
    headers: {
      'content-type': 'application/json;  charset = UTF-8',
    },
  });
  return response.json();
};

export const createScores = async (url, data) => {
  const response = await fetch(url, {
    method: 'Post',
    body: JSON.stringify({
      user: data.user,
      score: data.score,
    }),
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
};

export const fetchScore = async (url) => {
  const response = await fetch(url);
  return response.json();
};
