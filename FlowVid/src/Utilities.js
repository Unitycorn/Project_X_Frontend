const backend = import.meta.env.VITE_BACKEND_URL;

async function readJsonSafely(response) {
  return response.json().catch(() => ({}));
}

function createRequestError(response, data, fallbackMessage) {
  return {
    message: data.error || data.message || fallbackMessage,
    statusText: response.statusText,
    status: response.status,
  };
}

export async function requestJson(url, options = {}, fallbackMessage) {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw {
      message: fallbackMessage || "Network request failed",
      statusText: "Network Error",
      status: 0,
    };
  }

  const data = await readJsonSafely(response);

  if (!response.ok) {
    throw createRequestError(response, data, fallbackMessage);
  }

  return data;
}

export function getTimeDifference(source) {
  const uploadDate = new Date(source);
  const currentDate = Date.now();
  return currentDate - uploadDate;
}

export function convertMilliseconds(ms) {
  const months = Math.floor(ms / 2592000000);
  ms %= 2592000000;
  const days = Math.floor(ms / 86400000);
  ms %= 86400000;
  const minutes = Math.floor(ms / 60000);
  if (months > 0) {
    return months + (months === 1 ? " month ago" : " months ago");
  } else if (days > 0) {
    return days + (days === 1 ? " day ago" : " days ago");
  } else {
    if (minutes === 0) {
      return "just now";
    }
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  }
}

export async function LoadVideo(id) {
  return requestJson(`${backend}/video/${id}`, {}, "Failed to fetch video");
}

export async function LoadChannel(id) {
  return requestJson(
    `${backend}/channel/${id}`,
    {},
    "Failed to fetch channel data"
  );
}

export function randomizer(data) {
  let originList = data;
  const randomizedList = [];
  const originLength = data.length;
  for (let i = 0; i <= originLength - 1; i++) {
    const chosenItem =
      originList[Math.floor(Math.random() * originList.length)];
    const index = originList.indexOf(chosenItem);
    randomizedList.push(chosenItem);
    originList.splice(index, 1);
  }
  return randomizedList;
}
