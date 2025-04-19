function getTimeSince(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);

  return {
    daysAgo: days,
    hoursAgo: hours % 24,
    minutesAgo: minutes % 60,
    secondsAgo: seconds % 60
  };
}

function getTimeAgoString(dateString) {
  const { daysAgo, hoursAgo, minutesAgo, secondsAgo } = getTimeSince(dateString);

  if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo > 1 ? 's' : ' '} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hr${hoursAgo > 1 ? 's' : ' '} ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} min${minutesAgo > 1 ? 's' : ' '} ago`;
  } else if (secondsAgo > 10) {
    return `${secondsAgo} secs ago`;
  } else {
    return 'Just now';
  }
}
export default getTimeAgoString;