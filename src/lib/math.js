function ConvertMinutesToSeconds(time) {
  if (typeof time === "number") {
    return time;
  } else if (typeof time === "undefined") {
    return 0;
  } else if (typeof time !== "string") {
    throw new Error("Invalid time format " + typeof time);
  }
  // Split the input by colon
  const parts = time.split(":");

  // Ensure we have two parts
  if (parts.length < 2) {
    return time; // Return the input if is seconds only
  } else if (parts.length > 2) {
    throw new Error("Invalid time format");
  }

  // Extract minutes and seconds from the parts
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);

  // Convert minutes to seconds and add to the seconds part
  return minutes * 60 + seconds;
}

export { ConvertMinutesToSeconds };
