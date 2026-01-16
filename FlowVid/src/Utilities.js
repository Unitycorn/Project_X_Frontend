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
  const hours = Math.floor(ms / 3600000);
  ms %= 3600000;
  const minutes = Math.floor(ms / 60000);
  ms %= 60000;
  const seconds = Math.floor(ms / 1000);
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
  const res = await fetch(`/api/video/${id}`);
  if (!res.ok) {
    throw {
      message: "Failed to fetch video",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.video;
}

export async function LoadChannel(id) {
  const res = await fetch(`/api/channel/${id}`);
  if (!res.ok) {
    throw {
      message: "Failed to fetch channel data",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.channel;
}
