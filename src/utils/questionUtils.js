//questionUtils

export const getAlphabetLetter = (index) => {
  return String.fromCharCode(65 + index);
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${
    remainingSeconds < 10 ? '0' : ''
  }${remainingSeconds}`;
  return formattedTime;
};
