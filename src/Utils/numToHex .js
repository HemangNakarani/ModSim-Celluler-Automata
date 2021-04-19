function numToHex(num) {
  if (num === 0) {
    return "#f1f1f1";
  } else if (num === 1) {
    return "#00ff00";
  } else {
    return "#ff0000";
  }
}

export default numToHex;
